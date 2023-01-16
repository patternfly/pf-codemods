const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8226
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const clipboardImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) =>
      ["ClipboardCopy", "ClipboardCopyButton"].includes(specifier.imported.name)
    );

    return clipboardImports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              clipboardImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const positionAttr = node.attributes.find(
                (nodeAttr) => nodeAttr.name && nodeAttr.name.name === "position"
              );
              if (
                positionAttr?.value?.expression?.object?.name ===
                "PopoverPosition"
              ) {
                context.report({
                  node,
                  message: `PopoverPosition type has been removed for the position prop on ${node.name.name}.`,
                  fix(fixer) {
                    return fixer.replaceText(
                      positionAttr.value,
                      `"${positionAttr.value.expression.property.name}"`
                    );
                  },
                });
              }
            }
          },
        };
  },
};
