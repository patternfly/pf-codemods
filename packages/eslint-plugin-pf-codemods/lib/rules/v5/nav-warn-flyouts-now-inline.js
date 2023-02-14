const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8628
module.exports = {
  meta: {},
  create: function (context) {
    const navImports = getPackageImports(context, "@patternfly/react-core").find(
      (specifier) => specifier.imported.name === "Nav"
    );

    return !navImports
      ? {}
      : {
          JSXOpeningElement(node) {
            const hasNav = navImports.local.name.includes(node.name.name);

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
