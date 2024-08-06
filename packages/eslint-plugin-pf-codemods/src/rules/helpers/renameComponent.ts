import { Rule } from "eslint";
import { getAllImportsFromPackage } from "./getFromPackage";
import {
  ImportSpecifierWithParent,
  ImportDefaultSpecifierWithParent,
  JSXOpeningElementWithParent,
} from "./interfaces";
import {
  getDefaultDeclarationString,
  getComponentImportName,
  getNodeName,
  hasCodeModDataTag,
} from "./index";

interface ComponentRenames {
  [currentName: string]: string;
}

function formatDefaultMessage(oldName: string, newName: string) {
  return `${oldName} has been renamed to ${newName}.`;
}

function getFixes(
  fixer: Rule.RuleFixer,
  nodeImport: ImportSpecifierWithParent | ImportDefaultSpecifierWithParent,
  node: JSXOpeningElementWithParent,
  oldName: string,
  newName: string
) {
  const fixes = [];

  const isNamedImport = nodeImport.type === "ImportSpecifier";
  const importDeclaration = nodeImport.parent;
  const importSource = importDeclaration?.source.raw;
  const importSourceHasComponentName = importSource?.includes(oldName);
  const newImportDeclaration = importSource?.replace(oldName, newName);

  if (isNamedImport) {
    fixes.push(fixer.replaceText(nodeImport.imported, newName));
  }

  if (
    importDeclaration &&
    newImportDeclaration &&
    importSourceHasComponentName
  ) {
    fixes.push(
      fixer.replaceText(importDeclaration.source, newImportDeclaration)
    );
  }

  const shouldRenameNode =
    isNamedImport && nodeImport.imported.name === nodeImport.local.name;

  if (shouldRenameNode) {
    fixes.push(fixer.replaceText(node.name, newName));
    fixes.push(fixer.insertTextAfter(node.name, " data-codemods"));
  }

  const closingElement = node?.parent?.closingElement;
  if (shouldRenameNode && closingElement) {
    fixes.push(fixer.replaceText(closingElement.name, newName));
  }

  return fixes;
}

export function renameComponent(
  renames: ComponentRenames,
  packageName = "@patternfly/react-core"
) {
  return function (context: Rule.RuleContext) {
    const oldNames = Object.keys(renames);
    const imports = getAllImportsFromPackage(context, packageName, oldNames);

    if (imports.length === 0) {
      return {};
    }

    return {
      JSXOpeningElement(node: JSXOpeningElementWithParent) {
        if (hasCodeModDataTag(node)) {
          return;
        }

        const nodeName = getNodeName(node);
        const nodeImport = imports.find((imp) => {
          if (imp.type === "ImportSpecifier") {
            return [imp.imported.name, imp.local.name].includes(nodeName);
          }

          return oldNames.some((name) =>
            getDefaultDeclarationString(imp)?.includes(name)
          );
        });

        if (!nodeImport) {
          return;
        }

        const oldName = getComponentImportName(nodeImport, oldNames);

        if (!oldName) {
          return;
        }

        const newName = renames[oldName];

        context.report({
          node,
          message: formatDefaultMessage(oldName, newName),
          fix: (fixer) => getFixes(fixer, nodeImport, node, oldName, newName),
        });
      },
    };
  };
}
