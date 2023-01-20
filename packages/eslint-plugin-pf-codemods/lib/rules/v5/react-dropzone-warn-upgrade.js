// https://github.com/patternfly/patternfly-react/pull/7926
module.exports = {
  meta: {},
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const importsWithDropzone = node.specifiers.find(
          (specifier) =>
            (["FileUpload", "MultipleFileUpload"].includes(
              specifier.imported.name
            ) &&
              node.source.value === "@patternfly/react-core") ||
            (specifier.imported.name === "CodeEditor" &&
              node.source.value === "@patternfly/react-code-editor")
        );

        if (importsWithDropzone) {
          context.report({
            node,
            message: `The react-dropzone dependency used within ${importsWithDropzone.imported.name} has been updated from version 9 to version 14.`,
          });
        }
      },
    };
  },
};
