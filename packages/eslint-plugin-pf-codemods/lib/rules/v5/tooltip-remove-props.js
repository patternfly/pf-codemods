const { renameProps } = require('../../helpers');

const renames = {
  Tooltip: {
    'boundary': '',
    'isAppLauncher': '',
    'tippyProps': ''
  }
};

// https://github.com/patternfly/patternfly-react/pull/8231
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames)
};
