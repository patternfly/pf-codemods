const { getPackageImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8655
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const mastheadBrandImport = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name == 'MastheadBrand');
      
    return mastheadBrandImport.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (mastheadBrandImport.map(imp => imp.local.name).includes(node.name.name)) {
          const componentAttr = node.attributes.find(n => n.name && n.name.name === 'component');
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
