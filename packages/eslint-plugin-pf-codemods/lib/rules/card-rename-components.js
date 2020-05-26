const { getPackageImports, ensureImports } = require('../helpers');

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
    
    return imports.length === 0 ? {} : {
      ImportDeclaration(node) {
        ensureImports(context, node, '@patternfly/react-core', Object.values(renames));
      },
      JSXIdentifier(node) {
        if (imports.map(imp => imp.local.name).includes(node.name)) {
          const alreadyFixed = node.parent.parent.openingElement && node.parent.parent.openingElement.attributes
            .map(attr => attr.name.name)
            .includes('data-codemods');
          if (!alreadyFixed) {
            const isOpeningCardHead = node.parent.type === 'JSXOpeningElement' && node.name === 'CardHead';
            const replacement = `${renames[node.name]}${isOpeningCardHead ? ' data-codemods="true"' : ''}`;
            context.report({
              node,
              message: `${node.name} renamed to ${renames[node.name]}`,
              fix(fixer) {
                return fixer.replaceText(node, replacement);
              }
            });
          }
        }
      }
    };
  }
};
