const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8655
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const mastheadBrandImport = getFromPackage(context, '@patternfly/react-core')
      .imports.filter(specifier => specifier.imported.name == 'MastheadBrand');
      
    return mastheadBrandImport.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (mastheadBrandImport.map(imp => imp.local.name).includes(node.name.name)) {
          const componentAttr = node.attributes.find(a => a.name?.name === 'component');
          if (!componentAttr) {
            context.report({
              node,
              message: `The default MastheadBrand component type has be updated to switch between an anchor, button, and span based on whether a href, onClick or neither are present.`,
              fix(fixer) {
                return fixer.insertTextAfter(node.name, ` component="a"`);
              }
            });
          }
        }
      }
    };
  }
};
