import { Rule } from "eslint";
import { TSESTree } from "@typescript-eslint/utils";
import {
  ExportSpecifier,
  Identifier,
  ImportDeclaration,
  ImportSpecifier,
} from "estree-jsx";
import {
  checkMatchingImportSpecifier,
  getFromPackage,
  pfPackageMatches,
} from ".";

interface InterfaceRenames {
  [currentName: string]:
    | string
    | {
        newName: string;
        message?: string;
      };
}

interface ComponentRenames {
  [currentName: string]: string;
}

function formatDefaultMessage(oldName: string, newName: string) {
  return `${oldName} has been renamed to ${newName}.`;
}

export function renameInterface(
  interfaceRenames: InterfaceRenames,
  componentRenames: ComponentRenames = {},
  packageName = "@patternfly/react-core"
) {
  return function (context: Rule.RuleContext) {
    const oldNames = Object.keys(interfaceRenames);
    const { imports, exports } = getFromPackage(context, packageName, oldNames);

    if (!imports.length && !exports.length) {
      return {};
    }

    const shouldRenameIdentifier = (identifier: Identifier) => {
      const matchingImport = imports.find(
        (specifier) =>
          specifier.imported.name === identifier.name &&
          specifier.imported.name === specifier.local.name
      );

      return !!matchingImport;
    };

    const getRenameInfo = (oldName: string) => {
      const newName = interfaceRenames[oldName];

      if (typeof newName === "string") {
        return { newName };
      }

      return newName;
    };

    const replaceIdentifier = (identifier: Identifier) => {
      const oldName = identifier.name;
      const { newName, message } = getRenameInfo(oldName);

      context.report({
        node: identifier,
        message: message ?? formatDefaultMessage(oldName, newName),
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

        replaceIdentifier(node.imported);
      },
      ExportSpecifier(node: ExportSpecifier) {
        if (
          exports.some(
            (specifier) => specifier.local.name === node.local.name
          ) ||
          shouldRenameIdentifier(node.local)
        ) {
          replaceIdentifier(node.local);
        }
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
