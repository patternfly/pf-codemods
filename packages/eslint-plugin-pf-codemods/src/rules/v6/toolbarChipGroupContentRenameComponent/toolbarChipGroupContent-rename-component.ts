import { Rule } from "eslint";
import { ExportSpecifier, ImportSpecifier, JSXIdentifier } from "estree-jsx";
import { getFromPackage, IdentifierWithParent } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10649
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const componentImport = imports.find(
      (specifier) => specifier.imported.name === "ToolbarChipGroupContent"
    );
    const componentExport = exports.find(
      (specifier) => specifier.local.name === "ToolbarChipGroupContent"
    );

    return !componentImport && !componentExport
      ? {}
      : {
          ImportSpecifier(node: ImportSpecifier) {
            if (
              componentImport &&
              node.imported.name === componentImport.imported.name
            ) {
              context.report({
                node,
                message:
                  "The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent",
                fix(fixer) {
                  return fixer.replaceText(
                    node.imported,
                    "ToolbarLabelGroupContent"
                  );
                },
              });
            }
          },
          ExportSpecifier(node: ExportSpecifier) {
            const hasExportFromPatternFlyPackage =
              componentExport && node.local.name === componentExport.local.name;
            const hasExportFromPatternFlyImport =
              componentImport &&
              node.local.name === componentImport.imported.name;
            if (
              hasExportFromPatternFlyPackage ||
              hasExportFromPatternFlyImport
            ) {
              context.report({
                node,
                message:
                  "The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent",
                fix(fixer) {
                  return fixer.replaceText(
                    node.local,
                    "ToolbarLabelGroupContent"
                  );
                },
              });
            }
          },
          Identifier(node: IdentifierWithParent) {
            if (
              componentImport &&
              node.name === componentImport.imported.name &&
              node.parent &&
              !["ImportSpecifier", "ExportSpecifier"].includes(node.parent.type)
            ) {
              context.report({
                node,
                message:
                  "The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent",
                fix(fixer) {
                  return fixer.replaceText(node, "ToolbarLabelGroupContent");
                },
              });
            }
          },
          JSXIdentifier(node: JSXIdentifier) {
            if (
              componentImport &&
              node.name === componentImport.imported.name
            ) {
              context.report({
                node,
                message:
                  "The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent",
                fix(fixer) {
                  return fixer.replaceText(node, "ToolbarLabelGroupContent");
                },
              });
            }
          },
        };
  },
};
