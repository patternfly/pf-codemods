import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10029
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

    const componentImports = imports.filter(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "HelperTextItem"
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
                  'The `screenReaderText` prop on HelperTextItem has been updated, and will now render only when the `variant` prop has a value other than "default". Previously the prop was rendered only when the `isDynamic` prop was true.',
              });
            }
          },
        };
  },
};
