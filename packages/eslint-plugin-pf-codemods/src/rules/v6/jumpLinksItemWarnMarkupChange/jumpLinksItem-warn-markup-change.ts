import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { ImportDeclaration, ImportSpecifier } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10027
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const jumpLinksItemImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "JumpLinksItem"
    );

    return !jumpLinksItemImport
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.specifiers.find(
                (specifier) =>
                  (specifier as ImportSpecifier)?.imported.name ===
                  jumpLinksItemImport.imported.name
              )
            ) {
              context.report({
                node,
                message:
                  "The markup for JumpLinksItem has changed, as it now uses our Button component internally. Additionally, the `onClick` prop type has been updated to just `React.MouseEvent` (previously `React.MouseEvent<HTMLAnchorElement>`).",
              });
            }
          },
        };
  },
};
