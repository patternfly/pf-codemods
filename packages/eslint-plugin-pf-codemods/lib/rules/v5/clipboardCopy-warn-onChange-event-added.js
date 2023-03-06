const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8747
module.exports = {
  meta: {},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-core").find(
      (specifier) => specifier.imported.name === "ClipboardCopy"
    );

    return !imports
      ? {}
      : {
          JSXOpeningElement(node) {
            const hasClipboardCopy = imports.local.name === "ClipboardCopy";
            const hasOnChange = node.attributes.find(
              (attr) => attr.name.name === "onChange"
            );

            if (hasClipboardCopy && hasOnChange) {
              context.report({
                node,
                message: `The "onChange" prop for ClipboardCopy has been updated to include the event as its first parameter. "onChange" handlers may require an update.`,
              });
            }
          },
        };
  },
};
