const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/1234
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const {imports, exports} = getFromPackage(context, '@patternfly/react-core')
      
    componentImports = imports.filter(specifier => specifier.imported.name === 'componentName');
    componentExports = exports.filter(specifier => specifier.imported.name === 'componentName');

    return !componentImports.length && !componentExports.length ? {} : {
      JSXOpeningElement(node) {
        if (componentImports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(attr => attr.name?.name === 'propName');
          if (attribute) {
            context.report({
              node,
              message: 'message',
              fix(fixer) {
                return fixer.replaceText(attribute, '');
              }
            });
          }
        }
      }
    };
  }
};
