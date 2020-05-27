const { renameProps } = require('../helpers');

const renames = {
  Wizard: {
    'isCompactNav': '',
    'inPage': '',
    'isFullWidth': '',
    'isFullHeight': ''
  }
};

// https://github.com/patternfly/patternfly-react/pull/4142
// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  create: renameProps(renames)
};
