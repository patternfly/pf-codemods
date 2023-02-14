const { renameProps } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8563
const renames = {
  'ToolbarContent': {
    'alignment': '',
  },
  'ToolbarGroup': {
    'alignment': 'align'
  },
  'ToolbarItem': {
    'alignment': 'align'
  },
};

module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames)
};
