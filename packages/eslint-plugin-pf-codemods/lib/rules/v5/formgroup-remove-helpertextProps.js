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
          const helperProps = node.attributes.filter(a => {
            const attr = a.name?.name;
            return attr === 'helperText' || attr === 'helperTextInvalid' || attr === 'validated' || attr === 'helperTextIcon' || attr === 'helperTextInvalidIcon' || attr === 'isHelperTextBeforeField'
          });
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
