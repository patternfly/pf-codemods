import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9848
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
        specifier.imported.name === "PageSection"
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
              const attribute = node.attributes.find(
                (attr: { name: { name: string } }) =>
                  attr.name?.name === "variant"
              );
              if (attribute) {
                context.report({
                  node,
                  message:
                    'Classes from the `variant` prop will now only be applied to PageSection when the `type` prop has a value of "default".',
                });
              }
            }
          },
        };
  },
};
