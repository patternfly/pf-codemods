const { renameComponent } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  create: renameComponent(
    { 
      'Toolbar': 'PageHeaderTools',
      'ToolbarGroup': 'PageHeaderToolsGroup',
      'ToolbarItem': 'PageHeaderToolsItem'
    }
  )
};
