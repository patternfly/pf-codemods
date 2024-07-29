import { Rule } from "eslint";
import { ImportSpecifier } from "estree-jsx";
import { getAllImportsFromPackage } from "./getFromPackage";
import {
  ImportDefaultSpecifierWithParent,
  JSXOpeningElementWithParent,
} from "./interfaces";
import {
  getDeclarationString,
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
  nodeImport: ImportSpecifier | ImportDefaultSpecifierWithParent,
  node: JSXOpeningElementWithParent,
  oldName: string,
  newName: string
) {
  const fixes = [];

  const isNamedImport = nodeImport.type === "ImportSpecifier";
  if (isNamedImport) {
    fixes.push(fixer.replaceText(nodeImport.imported, newName));
  } else {
    const importDeclaration = nodeImport.parent;
    const newImportDeclaration = importDeclaration?.source.raw?.replace(
      oldName,
      newName
    );
    if (importDeclaration && newImportDeclaration) {
      fixes.push(
        fixer.replaceText(importDeclaration.source, newImportDeclaration)
      );
    }
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
            getDeclarationString(imp)?.includes(name)
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
