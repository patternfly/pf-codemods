const { renameProps } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/3924
const renames = {
  'PageSection': {
    'sticky': '',
  },
  'PageNavigation': {
    'sticky': ''
  },
  'PageGroup': {
    'sticky': ''
  },
  'PageBreadcrumb': {
    'sticky': ''
  }
};

module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames)
};
