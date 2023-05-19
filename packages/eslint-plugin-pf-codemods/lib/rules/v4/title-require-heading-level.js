const { getFromPackage } = require('../../helpers');

// #4 and #5 from https://github.com/patternfly/patternfly-react/pull/3922
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const titleImports = getFromPackage(context, '@patternfly/react-core')
      .imports.filter(specifier => specifier.imported.name === 'Title');

    return titleImports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (titleImports.map(imp => imp.local.name).includes(node.name.name)) {
          if (!node.attributes.filter(node => node.name).map(node => node.name.name).includes('headingLevel')) {
            context.report({
              node,
              message: `headingLevel attribute is required for ${node.name.name}`,
              fix(fixer) {
                return fixer.insertTextAfter(node.name, ' headingLevel="h2"');
              }
            });
          }
        }
      }
    };
  }
};