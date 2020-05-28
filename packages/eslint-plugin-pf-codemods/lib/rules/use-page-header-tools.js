const { getPackageImports } = require('../helpers');

const renames = {
  'Toolbar': 'PageHeaderTools',
  'ToolbarGroup': 'PageHeaderToolsGroup',
  'ToolbarItem': 'PageHeaderToolsItem'
};

const propMap = {
  toolbar: 'headerTools',
  avatar: ''
}

module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).includes(specifier.imported.name));
    const pageHeaderImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'PageHeader');

    return !imports && !pageHeaderImports ? {} : {
      ImportSpecifier(node) {
        if (node.parent.source.value === '@patternfly/react-core'
         //renamed imports would go here ?
        ) {
          context.report({
            node,
            message: `${node.name} has been renamed ${renames[node.name]}`,
            fix(fixer) {
              return fixer.replaceText(node, `${renames[node.name]}`);
            }
          });
        }
      },
      // For Toolbar -> PageHeaderTools, ToolbarGroup -> PageHeaderToolsGroup, and ToolbarItem -> PageHeaderToolsItem
      JSXIdentifier(node) {

        // For PageHeader prop renames
        const imp = pageHeaderImports
          .filter(imp => imp.imported.name === 'PageHeader')
          .find(imp => imp.local.name === node.name.name);
        if (imp) {
          const alreadyFixed = node.attributes
            .map(attr => attr.name.name)
            .includes('data-codemods');
          if (!alreadyFixed) {
          const isOpeningPageHeader = node.parent.type === 'JSXIdentifier' && node.name === 'PageHeader';
          node.attributes
            .filter(node => propMap.hasOwnProperty(node.name.name))
            .forEach(attribute => {
              const newName = propMap[attribute.name.name];
              context.report({
                node,
                message: `${node.name.name} has replaced ${attribute.name.name} prop with ${newName}`,
                fix(fixer) {
                  // Delete entire prop if newName is empty
                  return fixer.replaceText(
                    !newName ? attribute : attribute.name + `${isOpeningPageHeader ? ' data-codemods="true" ' : ''}`,
                    newName
                  );
                }
              })
            });
          }
        }
      },
      // For Toolbar -> PageHeaderTools, ToolbarGroup -> PageHeaderToolsGroup, and ToolbarItem -> PageHeaderToolsItem
      JSXIdentifier(node) {
        if (imports.map(imp => imp.local.name).includes(node.name)) {
          context.report({
            node,
            message: `${node.name} renamed to ${renames[node.name]}`,
            fix(fixer) {
              return fixer.replaceText(node, `${renames[node.name]}`);
            }
          });
       }
      }
    };
  }
};