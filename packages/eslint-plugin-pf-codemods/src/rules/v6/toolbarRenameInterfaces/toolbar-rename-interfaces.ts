import { AST, Rule } from "eslint";
import { ImportSpecifier, ExportSpecifier, Identifier, Node } from "estree-jsx";
import { getFromPackage } from "../../helpers";

const replacementMap: { [key: string]: string } = {
  ToolbarChipGroup: "ToolbarLabelGroup",
  ToolbarChip: "ToolbarLabel",
  ToolbarChipGroupContentProps: "ToolbarLabelGroupContentProps",
};
const previousNames = Object.keys(replacementMap);

// https://github.com/patternfly/patternfly-react/pull/10649
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const interfaceImports = imports.filter((specifier) =>
      previousNames.includes(specifier.imported.name)
    );

    const interfaceExports = exports.filter((specifier) =>
      previousNames.includes(specifier.local.name)
    );

    if (!interfaceImports.length && !interfaceExports.length) {
      return {};
    }

    const hasAlias = (specifier: ImportSpecifier) =>
      specifier.local.name !== specifier.imported.name;

    const callContextReport = (
      node: Node,
      nodeToReplace: Node | AST.Token,
      message: string,
      replacement: string
    ) => {
      context.report({
        node,
        message,
        fix(fixer) {
          return fixer.replaceText(nodeToReplace, replacement);
        },
      });
    };

    return {
      ImportSpecifier(node: ImportSpecifier) {
        const nodeImportName = node.imported.name;
        if (
          interfaceImports.length &&
          interfaceImports
            .map((imp) => imp.imported.name)
            .includes(nodeImportName)
        ) {
          const newName = replacementMap[nodeImportName];
          callContextReport(
            node,
            node.imported,
            `${nodeImportName} has been renamed to ${newName}.`,
            newName
          );
        }
      },
      ExportSpecifier(node: ExportSpecifier) {
        const nodeExportName = node.local.name;
        const hasExportFromPatternFlyPackage =
          interfaceExports.length &&
          interfaceExports
            .map((exp) => exp.local.name)
            .includes(nodeExportName);
        const hasExportFromPatternFlyImport =
          interfaceImports.length &&
          interfaceImports
            .map((imp) => imp.imported.name)
            .includes(nodeExportName);
        if (hasExportFromPatternFlyImport || hasExportFromPatternFlyPackage) {
          const newName = replacementMap[nodeExportName];
          callContextReport(
            node,
            node.local,
            `${nodeExportName} has been renamed to ${newName}.`,
            newName
          );
        }
      },
      TSTypeReference(node: { typeName: Identifier }) {
        const typeName = node.typeName.name;
        if (
          interfaceImports.length &&
          interfaceImports.map((imp) => imp.imported.name).includes(typeName)
        ) {
          const newName = replacementMap[typeName];
          callContextReport(
            node as unknown as Node,
            node.typeName,
            `${typeName} has been renamed to ${newName}.`,
            newName
          );
        }
      },
      TSInterfaceHeritage(node: { expression: Identifier }) {
        const expressionName = node.expression.name;
        if (
          interfaceImports.length &&
          interfaceImports
            .map((imp) => imp.imported.name)
            .includes(expressionName)
        ) {
          const newName = replacementMap[expressionName];
          callContextReport(
            node as unknown as Node,
            node.expression,
            `${expressionName} has been renamed to ${newName}.`,
            newName
          );
        }
      },
    };
  },
};
