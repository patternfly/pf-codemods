import { Rule } from "eslint";
import {
  ImportSpecifier,
  ExportNamedDeclaration,
  ExportDefaultDeclaration,
} from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10364
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );
    const emptyStateComponents = ["EmptyStateHeader", "EmptyStateIcon"];
    const emptyStateImports = imports.filter((specifier) =>
      emptyStateComponents.includes(specifier.imported.name)
    );
    const emptyStateExports = exports.filter((specifier) =>
      emptyStateComponents.includes(specifier.local.name)
    );

    if (!emptyStateImports.length && !emptyStateExports.length) {
      return {};
    }

    return {
      ImportSpecifier(node: ImportSpecifier) {
        if (!emptyStateImports.length) {
          return;
        }

        emptyStateImports.forEach((esImport) => {
          context.report({
            node,
            message: `${esImport.imported.name} is no longer exported by PatternFly. This rule will not fix any imports, as our cleanup rule handles removal of unused imports.`,
          });
        });
      },
      ExportNamedDeclaration(node: ExportNamedDeclaration) {
        const exportsToRemove = node.specifiers.filter(
          (spec) =>
            (emptyStateComponents.includes(spec.local.name) &&
              node.source?.value === "@patternfly/react-core") ||
            emptyStateImports.some((imp) => imp.local.name === spec.local.name)
        );
        if (!exportsToRemove.length) {
          return;
        }

        if (exportsToRemove.length === node.specifiers.length) {
          const validExportNames = exportsToRemove
            .map((exportToRemove) => exportToRemove.local.name)
            .join(" and ");
          context.report({
            node,
            message: `${validExportNames} ${
              exportsToRemove.length > 1 ? "are" : "is"
            } no longer exported by PatternFly.`,
            fix(fixer) {
              return fixer.remove(node);
            },
          });

          return;
        }

        exportsToRemove.forEach((exportToRemove) => {
          const { range } = exportToRemove;
          const tokenBefore = context
            .getSourceCode()
            .getTokenBefore(exportToRemove);
          const isCommaBefore = tokenBefore?.value === ",";
          const tokenAfter = context
            .getSourceCode()
            .getTokenAfter(exportToRemove);
          const isCommaAfter = tokenAfter?.value === ",";
          const rangeStartValue = isCommaBefore
            ? tokenBefore.range[0]
            : range?.[0];
          const rangeEndValue = isCommaAfter ? tokenAfter.range[1] : range?.[1];
          context.report({
            node,
            message: `${exportToRemove.local.name} is no longer exported by PatternFly.`,
            fix(fixer) {
              return rangeStartValue && rangeEndValue
                ? fixer.removeRange([rangeStartValue, rangeEndValue])
                : [];
            },
          });
        });
      },
      ExportDefaultDeclaration(node: ExportDefaultDeclaration) {
        const exportName =
          node.declaration.type === "Identifier" && node.declaration.name;
        const isEmptyStateDefaultExport = emptyStateImports.some(
          (imp) => imp.local.name === exportName
        );

        if (isEmptyStateDefaultExport) {
          context.report({
            node,
            message: `${exportName} is no longer exported by PatternFly.`,
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
};
