import { Rule } from "eslint";
import { TSESTree } from "@typescript-eslint/utils";
import { Identifier, ImportSpecifier } from "estree-jsx";
import { getFromPackage } from "./getFromPackage";
import { checkMatchingImportSpecifier } from "./nodeMatches/checkMatchingImportSpecifier";

interface InterfaceRenames {
  [currentName: string]: string;
}

function formatDefaultMessage(oldName: string, newName: string) {
  return `${oldName} has been renamed to ${newName}.`;
}

export function renameInterface(
  renames: InterfaceRenames,
  packageName = "@patternfly/react-core"
) {
  return function (context: Rule.RuleContext) {
    const oldNames = Object.keys(renames);
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
      const newName = renames[oldName];

      context.report({
        node: identifier,
        message: formatDefaultMessage(oldName, newName),
        fix(fixer) {
          return fixer.replaceText(identifier, newName);
        },
      });
    };

    return {
      ImportSpecifier(node: ImportSpecifier) {
        if (!checkMatchingImportSpecifier(node, imports)) {
          return;
        }

        const oldName = node.imported.name;
        const newName = renames[oldName];

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
