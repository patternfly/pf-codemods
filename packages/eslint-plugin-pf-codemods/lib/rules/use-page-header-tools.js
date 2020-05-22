// const { renameProp } = require('../helpers');
const { getPackageImports } = require('../helpers');

const renames = {
  'Toolbar': 'PageHeaderTools',
  'ToolbarGroup': 'PageHeaderToolsGroup',
  'ToolbarItem': 'PageHeaderToolsItem'
};
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).includes(specifier.imported.name));
    return !imports ? {} : {
      JSXIdentifier(node) {
        if (imports.map(imp => imp.local.name).includes(node.name)) {
          const isOpeningToolbar = node.parent.type === 'JSXOpeningElement' && node.name === 'Toolbar';
          context.report({
            node,
            message: `${node.name} renamed to ${renames[node.name]}`,
            fix(fixer) {
              return fixer.replaceText(node, `${renames[node.name]}${isOpeningToolbar ? ' data-codemods="true"' : ''}`);
            }
          });
        }
      }
    };
  }
};