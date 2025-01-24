import { Rule } from "eslint";
import { TSESTree } from "@typescript-eslint/utils";
import { Identifier, ImportDeclaration, ImportSpecifier } from "estree-jsx";
import {
  checkMatchingImportSpecifier,
  getFromPackage,
  pfPackageMatches,
} from ".";

interface Renames {
  [currentName: string]: string;
}

function formatDefaultMessage(oldName: string, newName: string) {
  return `${oldName} has been renamed to ${newName}.`;
}

export function renameInterface(
  interfaceRenames: Renames,
  componentRenames: Renames,
  packageName = "@patternfly/react-core"
) {
  return function (context: Rule.RuleContext) {
    const oldNames = Object.keys(interfaceRenames);
    const { imports } = getFromPackage(context, packageName, oldNames);

    if (imports.length === 0) {
      return {};
    }

    const shouldRenameIdentifier = (identifier: Identifier) => {
      const matchingImport = imports.find(
        (specifier) => specifier.local.name === identifier.name
      );

      if (!matchingImport) {
        return false;
      }

      return matchingImport.local.name === matchingImport.imported.name;
    };

    const replaceIdentifier = (identifier: Identifier) => {
      const oldName = identifier.name;
      const newName = interfaceRenames[oldName];

      context.report({
        node: identifier,
        message: formatDefaultMessage(oldName, newName),
        fix(fixer) {
          return fixer.replaceText(identifier, newName);
        },
      });
    };

    return {
      ImportDeclaration(node: ImportDeclaration) {
        if (!pfPackageMatches(packageName, node.source.value)) {
          return;
        }
        for (const oldName of Object.keys(componentRenames)) {
          const newName = componentRenames[oldName];
          const importSource = node.source.raw;
          const importSourceHasComponentName = importSource?.includes(oldName);
          const newImportDeclaration = importSource?.replace(oldName, newName);

          if (newImportDeclaration && importSourceHasComponentName) {
            context.report({
              node,
              message: formatDefaultMessage(oldName, newName),
              fix: (fixer) =>
                fixer.replaceText(node.source, newImportDeclaration),
            });
          }
        }
      },
      ImportSpecifier(node: ImportSpecifier) {
        if (!checkMatchingImportSpecifier(node, imports)) {
          return;
        }

        const oldName = node.imported.name;
        const newName = interfaceRenames[oldName];

        context.report({
          node,
          message: formatDefaultMessage(oldName, newName),
          fix(fixer) {
            return fixer.replaceText(node.imported, newName);
          },
        });
      },
      TSTypeReference(node: TSESTree.TSTypeReference) {
        if (node.typeName.type === "Identifier") {
          shouldRenameIdentifier(node.typeName) &&
            replaceIdentifier(node.typeName);
        }
      },
      TSInterfaceHeritage(node: TSESTree.TSInterfaceHeritage) {
        if (node.expression.type === "Identifier") {
          shouldRenameIdentifier(node.expression) &&
            replaceIdentifier(node.expression);
        }
      },
    };
  };
}
