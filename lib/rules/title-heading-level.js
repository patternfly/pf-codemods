const { getPackageImports } = require('../helpers');

module.exports = {
  meta: {
      docs: {
          description: "desc",
          category: "Fill me in",
          recommended: false
      },
      fixable: 'code',  // or "code" or "whitespace"
      schema: [
          // fill in your schema
      ]
  },
  create: function(context) {
    const titleImport = getPackageImports(context, '@patternfly/react-core')
      .find(specifier => specifier.imported.name === 'Title');

    return !titleImport ? {} : {
      JSXOpeningElement(node) {
        if (node.name.name === titleImport.local.name) {
          if (!node.attributes.map(node => node.name.name).includes('headingLevel')) {
            context.report({
              node,
              message: 'Must include headingLevel attribute',
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