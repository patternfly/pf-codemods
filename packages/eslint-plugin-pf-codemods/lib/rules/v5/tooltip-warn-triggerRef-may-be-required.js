const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8733
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const tooltipImport = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.find((specifier) => specifier.imported.name === "Tooltip");

    return !tooltipImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (node.name?.name === "Tooltip") {
              const hasTriggerRef = node.attributes.find(
                (attr) => attr.name?.name === "triggerRef"
              );
              const hasReference = node.attributes.find(
                (attr) => attr.name?.name === "reference"
              );
              if (hasTriggerRef || hasReference) {
                return;
              }
              context.report({
                node,
                message:
                  "Tooltips without a `triggerRef` will now have a wrapping div which may cause issues. Snapshots may need to be updated, or to avoid the wrapping div add a `triggerRef` with a ref which is attached to the trigger element.",
              });
            }
          },
        };
  },
};
