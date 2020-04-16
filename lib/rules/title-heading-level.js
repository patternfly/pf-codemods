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
    return {
      JSXOpeningElement(node) {
        if (node.name.name === 'Title') {
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