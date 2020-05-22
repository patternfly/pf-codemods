const { getPackageImports } = require('../helpers');

const renames = {
  'CardHeader': 'CardTitle',
  'CardHead': 'CardHeader',
  'CardHeadMain': 'CardHeaderMain'
};

// https://github.com/patternfly/patternfly-react/pull/4170
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).includes(specifier.imported.name));
    
    return !imports ? {} : {
      JSXIdentifier(node) {
        const alreadyFixed = node.parent.parent.openingElement && node.parent.parent.openingElement.attributes.includes(attr => attr.name === 'data-codemods');
        if (!alreadyFixed && imports.map(imp => imp.local.name).includes(node.name)) {
          const isOpeningCardHead = node.parent.type === 'JSXOpeningElement' && node.name === 'CardHead';
          context.report({
            node,
            message: `${node.name} renamed to ${renames[node.name]}`,
            fix(fixer) {
              return fixer.replaceText(node, `${renames[node.name]}${isOpeningCardHead ? ' data-codemods="true"' : ''}`);
            }
          });
        }
      }
    };
  }
};
