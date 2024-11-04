import { Rule } from "eslint";
import { TSESTree } from "@typescript-eslint/utils";
import { Identifier, ImportSpecifier, Node } from "estree-jsx";
import { getFromPackage } from "./getFromPackage";

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

    return {
      ImportSpecifier(node: ImportSpecifier) {
        if (
          !imports.some(
            (specifier) => specifier.imported.name === node.imported.name
          )
        ) {
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
        const getMatchingImport = (name: string) =>
          imports.find((specifier) => specifier.local.name === name);

        if (node.typeName.type !== "Identifier") {
          return;
        }

        const matchingImport = getMatchingImport(node.typeName.name);
        const shouldRename =
          matchingImport &&
          matchingImport.local.name === matchingImport.imported.name;

        if (!shouldRename) {
          return;
        }

        const oldName = node.typeName.name;
        const newName = renames[oldName];

        context.report({
          node: node as unknown as Node,
          message: formatDefaultMessage(oldName, newName),
          fix(fixer) {
            return fixer.replaceText(node.typeName as Identifier, newName);
          },
        });
      },
    };
  };
}
