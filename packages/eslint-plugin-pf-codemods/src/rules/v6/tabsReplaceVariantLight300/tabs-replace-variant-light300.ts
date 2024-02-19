import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9930
// https://github.com/patternfly/patternfly-react/pull/10044
module.exports = {
  meta: { fixable: "code" },
  create: function (context: {
    report: (arg0: {
      node: any;
      message: string;
      fix(fixer: any): any;
    }) => void;
  }) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const tabsImport = imports.find(
      (specifier: { imported: { name: string }; local: { name: string } }) =>
        specifier.imported.name === "Tabs"
    );

    return !tabsImport
      ? {}
      : {
          JSXOpeningElement(node: { name: { name: any }; attributes: any[] }) {
            if (node.name.name === tabsImport.local.name) {
              const attribute = node.attributes.find(
                (attr: { name: { name: string }; value: { value: string } }) =>
                  attr.name?.name === "variant"
              );
              if (attribute && attribute.value.value === "light300") {
                context.report({
                  node,
                  message:
                    'The "light300" value for the `variant` prop on Tabs has been replaced with the "secondary" value.',
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                  }) {
                    return fixer.replaceText(attribute.value, '"secondary"');
                  },
                });
              }
            }
          },
        };
  },
};
