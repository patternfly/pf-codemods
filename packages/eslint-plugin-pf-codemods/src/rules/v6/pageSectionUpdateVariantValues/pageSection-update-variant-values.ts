import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9774
// https://github.com/patternfly/patternfly-react/pull/9848
module.exports = {
  meta: { fixable: "code" },
  create: function (context: {
    report: (arg0: {
      node: any;
      message: string;
      fix(fixer: any): any;
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

              if (
                attribute &&
                !["default", "secondary"].includes(attribute.value.value)
              ) {
                context.report({
                  node,
                  message:
                    'The `variant` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".',
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                  }) {
                    return fixer.replaceText(attribute, "");
                  },
                });
              }
            }
          },
        };
  },
};
