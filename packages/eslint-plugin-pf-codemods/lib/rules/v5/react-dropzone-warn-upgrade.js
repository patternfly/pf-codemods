// https://github.com/patternfly/patternfly-react/pull/7926
module.exports = {
  meta: {},
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const reactCoreImports = ["FileUpload", "MultipleFileUpload"];
        const importsWithDropzone = node.specifiers.find(
          (specifier) =>
            (node.source.value === "@patternfly/react-core" &&
              reactCoreImports.includes(specifier.imported?.name)) ||
            (node.source.value === "@patternfly/react-code-editor" &&
              specifier.imported?.name === "CodeEditor")
        );

        if (importsWithDropzone) {
          const { name } = importsWithDropzone.imported;
          let message = `The react-dropzone dependency used within ${name} has been updated from version 9 to version 14.`;

          if (reactCoreImports.includes(name)) {
            message += ` Among the changes from this update, the 'dropzoneProps' prop type is now react-dropzone's DropzoneOptions, and react-dropzone's 'accept' prop type is now an array of strings.`;

            if (name === "FileUpload") {
              message +=
                " Additionally, the 'onFileInputChange' prop has had its event parameter typing updated to react-dropzone's DropEvent.";
            }
          }

          context.report({
            node,
            message,
          });
        }
      },
    };
  },
};
