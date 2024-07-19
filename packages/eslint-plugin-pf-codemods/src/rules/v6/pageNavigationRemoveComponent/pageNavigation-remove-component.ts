import { Rule, AST } from "eslint";
import {
  JSXElement,
  ExportNamedDeclaration,
  ExportDefaultDeclaration,
} from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10650
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const pageNavImport = imports.find(
      (specifier) => specifier.imported.name === "PageNavigation"
    );
    const pageNavExport = exports.find(
      (specifier) => specifier.local.name === "PageNavigation"
    );

    return !pageNavImport && !pageNavExport
      ? {}
      : {
          JSXElement(node: JSXElement) {
            if (
              pageNavImport &&
              node.openingElement.name.type === "JSXIdentifier" &&
              pageNavImport.local.name === node.openingElement.name.name
            ) {
              context.report({
                node,
                message:
                  "The PageNavigation component has been removed from PatternFly.",
                fix(fixer) {
                  const fixes = [fixer.remove(node.openingElement)];
                  if (node.closingElement) {
                    fixes.push(fixer.remove(node.closingElement));
                  }
                  return fixes;
                },
              });
            }
          },
          ExportNamedDeclaration(node: ExportNamedDeclaration) {
            const pageNavSpecifier = node.specifiers.find((specifier) => {
              const { name: localName } = specifier.local;
              return pageNavExport
                ? localName === pageNavExport.local.name
                : localName === pageNavImport?.local.name;
            });
            if (pageNavSpecifier) {
              context.report({
                node,
                message:
                  "The PageNavigation component has been removed from PatternFly.",
                fix(fixer) {
                  if (node.specifiers.length === 1) {
                    return fixer.remove(node);
                  }

                  if (!pageNavSpecifier.range) {
                    return [];
                  }
                  const tokenAfter = context
                    .getSourceCode()
                    .getTokenAfter(pageNavSpecifier);
                  const isCommaAfter = tokenAfter && tokenAfter.value === ",";
                  const rangeToRemove: AST.Range = [
                    pageNavSpecifier.range[0],
                    isCommaAfter
                      ? tokenAfter.range[1]
                      : pageNavSpecifier.range[1],
                  ];
                  return fixer.removeRange(rangeToRemove);
                },
              });
            }
          },
          ExportDefaultDeclaration(node: ExportDefaultDeclaration) {
            if (!pageNavImport) {
              return;
            }
            const exportName =
              node.declaration.type === "Identifier" && node.declaration.name;
            const isPageNavExport = pageNavImport.local.name === exportName;

            if (isPageNavExport) {
              context.report({
                node,
                message: `The PageNavigation component has been removed from PatternFly.`,
                fix(fixer) {
                  return fixer.remove(node);
                },
              });
            }
          },
        };
  },
};
