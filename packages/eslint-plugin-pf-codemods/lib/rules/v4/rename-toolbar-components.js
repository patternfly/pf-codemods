const { renameComponents, getPackageImports } = require('../../helpers');

function hasPageHeaderImport(context, package) {
  const imports = getPackageImports(context, package).map(imp => imp.imported.name);
  return imports.find(imp => imp === 'PageHeader') // ToolbarLayout is being used as PageHeader
    && !imports.find(imp => imp === 'PageHeaderTools'); // Codemod hasn't already been run
}

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  meta: { fixable: 'code' },
  create: renameComponents(
    { 
      'Toolbar': 'PageHeaderTools',
      'ToolbarGroup': 'PageHeaderToolsGroup',
      'ToolbarItem': 'PageHeaderToolsItem'
    },
    hasPageHeaderImport
  )
};
