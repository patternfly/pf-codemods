import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10044
module.exports = {
  meta: { fixable: "code" },
  create: function (context: {
    report: (arg0: {
      node: any;
      message: string;
      fix?(fixer: any): any;
    }) => void;
  }) {
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
          ImportDeclaration(node: {
            specifiers: { imported: { name: string } }[];
          }) {
            if (
              node.specifiers.find(
                (specifier: { imported: { name: string } }) =>
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
