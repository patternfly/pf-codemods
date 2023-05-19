const { getFromPackage } = require("../../helpers");

  // https://github.com/patternfly/patternfly-react/pull/8833
  module.exports = {
    meta: {},
    create: function (context) {
      const { imports } = getFromPackage(context, "@patternfly/react-core");
      const dateImport = imports.find((specifier) => specifier.imported.name === "DatePicker");
      const timeImport = imports.find((specifier) => specifier.imported.name === "TimePicker");
      return imports.length === 0 || !(dateImport || timeImport)
        ? {}
        : {
            ImportDeclaration(node) {
              if(timeImport && node.specifiers.find( s => s.imported?.name === "TimePicker")) {
                context.report({
                  node,
                  message: 'TimePicker now uses a <HelperText> component for its helper text.'
                })
              }
            },
            JSXOpeningElement(node) {
              if (
                dateImport &&
                dateImport.imported.name === node.name.name && 
                node.attributes.find(a => a.name?.name === 'helperText')
              ) {
                context.report({
                  node,
                  message: 'The helperText property now expects a <HelperText> component.',
                });
              }
            },
          };
    },
  };
