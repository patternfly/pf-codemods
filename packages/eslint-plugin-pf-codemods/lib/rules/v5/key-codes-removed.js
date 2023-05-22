const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8174
module.exports = {
  create: function (context) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const keycodeImport = imports.find(
      (specifier) => specifier.imported?.name === "KEY_CODES"
    );
    const keycodeExport = exports.find(
      (specifier) => specifier.local?.name === "KEY_CODES"
    );
    const keycodeMessage =
      "The KEY_CODES constant has been removed. We suggest refactoring to use the KeyTypes constant instead.";
    return !keycodeImport && !keycodeExport
      ? {}
      : {
          ImportDeclaration(node) {
            if (!keycodeImport) {
              return;
            }

            const keycodeSpecifier = node.specifiers.find(
              (spec) => spec.local?.name === keycodeImport.local?.name
            );

            if (keycodeSpecifier) {
              context.report({
                node,
                message: keycodeMessage,
              });
            }
          },
          ExportNamedDeclaration(node) {
            if (!keycodeExport) {
              return;
            }

            const keycodeSpecifier = node.specifiers.find(
              (spec) => spec.local?.name === keycodeExport.local?.name
            );

            if (keycodeSpecifier) {
              context.report({
                node,
                message: keycodeMessage,
              });
            }
          },
        };
  },
};
