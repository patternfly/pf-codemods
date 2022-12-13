const { getPackageImports, ensureImports } = require('../../helpers');

const renames = {
  'CardHeader': 'CardTitle',
  'CardHead': 'CardHeader',
  'CardHeadMain': 'CardHeaderMain'
};

// https://github.com/patternfly/patternfly-react/pull/4170
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).concat(Object.values(renames)).includes(specifier.imported.name));
    const cardHeadImport = imports.find(imp => imp.imported.name === 'CardHead');
    const cardTitleImport = imports.find(imp => imp.imported.name === 'CardTitle');
    const cardHeaderMainImport = imports.find(imp => imp.imported.name === 'CardHeaderMain');

    // If cardTitleImport || cardHeaderMainImport, assume renames already taken care of
    return imports.length === 0 || cardTitleImport || cardHeaderMainImport ? {} : {
      ImportDeclaration(node) {
        ensureImports(context, node, '@patternfly/react-core', Object.values(renames));
      },
      JSXIdentifier(node) {
        if (imports.map(imp => imp.local.name).includes(node.name)) {
          const alreadyFixed = node.parent // openingElement or closingElement
            && node.parent.parent // JSXElement
            && node.parent.parent.openingElement
            && node.parent.parent.openingElement.attributes
              .map(attr => attr.name.name)
              .includes('data-codemods');

          if (!alreadyFixed) {
            const isOpeningCardHead = node.parent.type === 'JSXOpeningElement' && cardHeadImport && node.name === cardHeadImport.local.name;
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
