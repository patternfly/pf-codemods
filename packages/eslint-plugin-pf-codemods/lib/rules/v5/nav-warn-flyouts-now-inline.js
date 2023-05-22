const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8628
module.exports = {
  meta: {},
  create: function (context) {
    const navImports = getFromPackage(context, "@patternfly/react-core").imports.find(
      (specifier) => specifier.imported.name === "Nav"
    );

    return !navImports
      ? {}
      : {
          JSXOpeningElement(node) {
            const hasNav = navImports.local.name === node.name.name;

            const hasFlyout = node.attributes.find(
              (a) => a.name?.name === "flyout"
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
