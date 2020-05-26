// const { renameProp } = require('../helpers');
const { getPackageImports } = require('../helpers');
const { renameProp } = require('../helpers');

const renames = {
  'Toolbar': 'PageHeaderTools',
  'ToolbarGroup': 'PageHeaderToolsGroup',
  'ToolbarItem': 'PageHeaderToolsItem'
};
module.exports = {
  create: renameProp(
    'PageHeader',
    { 'toolbar': 'headerTools', 'avatar': '' },
    (node, attribute, replacement) => replacement !== '' ?
     `${node.name.name} has replaced ${attribute.name.name} prop with ${replacement}` :
     `${attribute.name.name} prop has been removed for ${node.name.name}`
  ),

  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).includes(specifier.imported.name));
    return !imports ? {} : {
      JSXIdentifier(node) {
        if (imports.map(imp => imp.local.name).includes(node.name)) {
          const alreadyFixed = node.parent.parent.openingElement && node.parent.parent.openingElement.attributes
          .map(attr => attr.name.name)
          if (!alreadyFixed) {
          context.report({
            node,
            message: `${node.name} renamed to ${renames[node.name]}`,
            fix(fixer) {
              return fixer.replaceText(node, `${renames[node.name]}`);
            }
          });
        }
       }
      }
    };
  }
};