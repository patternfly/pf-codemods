import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10036
module.exports = {
  meta: {},
  create: function (context: {
    report: (arg0: {
      node: any;
      message: string;
      fix?(fixer: any): any;
    }) => void;
  }) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "DrawerHead"
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: { name: { name: any }; attributes: any[] }) {
            if (
              componentImports
                .map((imp: { local: { name: any } }) => imp.local.name)
                .includes(node.name.name)
            ) {
              context.report({
                node,
                message:
                  "DrawerPanelBody is no longer rendered internally to DrawerHead. We recommend using these components independent of one another and to not pass DrawerPanelBody to DrawerHead.",
              });
            }
          },
        };
  },
};
