const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8655
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const pageHeaderImport = getFromPackage(context, '@patternfly/react-core')
      .imports.filter(specifier => specifier.imported.name == 'PageHeader');
      
    return pageHeaderImport.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (pageHeaderImport.map(imp => imp.local.name).includes(node.name.name)) {
          const componentAttr = node.attributes.find(a => a.name?.name === 'logoComponent');
          if (!componentAttr) {
            context.report({
              node,
              message: `The default PageHeader logoComponent type has be updated to switch between an anchor, button, and span based on whether a href, onClick or neither are present. It is also recommended to use Masthead in place of PageHeader.`,
              fix(fixer) {
                return fixer.insertTextAfter(node.name, ` logoComponent="a"`);
              }
            });
          }
        }
      }
    };
  }
};
