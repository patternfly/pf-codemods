const { renameProps } = require('../helpers');

const renames = {
  Wizard: {
    'isCompactNav': '',
    'inPage': '',
    'isFullWidth': '',
    'isFullHeight': '',
    'inPage': ''
  }
};

// https://github.com/patternfly/patternfly-react/pull/4116
// https://github.com/patternfly/patternfly-react/pull/4140
// https://github.com/patternfly/patternfly-react/pull/4142
module.exports = {
  create: renameProps(renames)
};
