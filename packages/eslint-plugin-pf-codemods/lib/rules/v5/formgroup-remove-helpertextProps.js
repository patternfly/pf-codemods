const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8810
module.exports = {
  meta: {},
  create: function (context) {
    const formGroupImport =  getPackageImports(context, '@patternfly/react-core')
    .filter(specifier => specifier.imported.name == 'FormGroup');

    return formGroupImport.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (formGroupImport.map(imp => imp.local.name).includes(node.name.name)) {
          const helperPropNames = ['helperText', 'helperTextInvalid', 'validated', 'helperTextIcon', 'helperTextInvalidIcon', 'isHelperTextBeforeField'];
          const helperProps = node.attributes.filter(a => helperPropNames.includes(a.name?.name));
          if (helperProps.length > 0) {
            helperProps.forEach((attribute) => {
              context.report({
                node,
                message: `${attribute.name?.name} prop for FormGroup has been removed. Use FormHelperText, HelperText, and HelperTextItem directly inside children.`,
              });
            });
          }
        }
      }
    };
  },
};
