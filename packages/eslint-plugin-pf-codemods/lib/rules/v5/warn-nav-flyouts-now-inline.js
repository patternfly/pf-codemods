const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8628
module.exports = {
  meta: {},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => specifier.imported.name === "Nav"
    );

    return imports === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            const hasNav = imports
              .map((imp) => imp.local.name)
              .includes(node.name.name);

            const hasFlyout = node.attributes.find(
              (n) => n.name && n.name.name === "flyout"
            );

            if (hasNav && hasFlyout) {
              context.report({
                node,
                message:
                  "The placement Nav flyouts in the DOM has been changed, you may need to update some selectors or snapshots in your test suites.",
              });
            }
          },
        };
  },
};
