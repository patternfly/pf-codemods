const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8621
module.exports = {
  meta: {},
  create: function (context) {
    const popoverImports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) => specifier.imported.name === "Popover");

    return popoverImports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              popoverImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              context.report({
                node,
                message: `The default value of the Popover prop 'appendTo' has been updated to a value of "inline" and may cause markup changes that require updating selectors used in tests.`,
              });
            }
          },
        };
  },
};
