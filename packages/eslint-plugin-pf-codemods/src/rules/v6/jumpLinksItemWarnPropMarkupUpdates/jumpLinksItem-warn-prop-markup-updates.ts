import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10027
module.exports = {
  meta: { fixable: "code" },
  create: function (context: {
    report: (arg0: {
      node: any;
      message: string;
      fix?(fixer: any): any;
    }) => void;
  }) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const jumpLinksItemImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "JumpLinksItem"
    );

    return !jumpLinksItemImport
      ? {}
      : {
          ImportDeclaration(node: {
            specifiers: { imported: { name: string } }[];
          }) {
            if (
              node.specifiers.find(
                (specifier: { imported: { name: string } }) =>
                  specifier.imported.name === jumpLinksItemImport.imported.name
              )
            ) {
              context.report({
                node,
                message:
                  "The `href` prop on JumpLinksItem is now required. Additionally, the markup for JumpLinksItem and the typing of the `onClick` property has been updated as it now uses our Button component internally.",
              });
            }
          },
        };
  },
};
