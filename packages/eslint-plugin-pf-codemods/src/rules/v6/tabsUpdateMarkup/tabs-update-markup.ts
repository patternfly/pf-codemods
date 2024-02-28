import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { ImportDeclaration } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10044
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const tabsImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "Tabs"
    );

    return !tabsImport
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.specifiers.find(
                (specifier) =>
                  specifier.type === "ImportSpecifier" &&
                  specifier.imported.name === tabsImport.imported.name
              )
            ) {
              context.report({
                node,
                message:
                  "The markup for the Tabs scroll buttons has been updated. They are now rendered with a div wrapper, use our Button component, and no longer have adjusted styling when the `isSubtab` prop is true.",
              });
            }
          },
        };
  },
};
