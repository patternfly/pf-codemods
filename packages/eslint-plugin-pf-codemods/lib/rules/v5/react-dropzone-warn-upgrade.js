// https://github.com/patternfly/patternfly-react/pull/7926
module.exports = {
  meta: {},
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const reactCoreImports = ["FileUpload", "MultipleFileUpload"];
        const importsWithDropzone = node.specifiers.find(
          (specifier) =>
            (reactCoreImports.includes(specifier.imported.name) &&
              node.source.value === "@patternfly/react-core") ||
            (specifier.imported.name === "CodeEditor" &&
              node.source.value === "@patternfly/react-code-editor")
        );

        if (importsWithDropzone) {
          const { name } = importsWithDropzone.imported;
          let message;

          if (reactCoreImports.includes(name)) {
            message = `As part of the react-dropzone dependency upgrade from version 9 to 14, the ${name} prop 'dropzoneProps' has had its typing updated to react-dropzone's DropzoneOptions.`;

            if (name === "FileUpload") {
              message +=
                " Additionally, the 'onFileInputChange' prop has had its event parameter typing updated to react-dropzone's DropEvent.";
            }
          } else {
            message = `The react-dropzone dependency used within ${name} has been updated from version 9 to version 14.`;
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
