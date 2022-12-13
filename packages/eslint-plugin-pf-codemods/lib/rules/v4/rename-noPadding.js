const { renameProps } = require('../../helpers');

const renames = {
  'DataListContent': {
    noPadding: 'hasNoPadding'
  },
  'DrawerHead': {
    noPadding: 'hasNoPadding'
  },
  'DrawerPanelBody': {
    noPadding: 'hasNoPadding'
  },
  'PageSection': {
    noPadding: 'hasNoPadding'
  },
};

// https://github.com/patternfly/patternfly-react/pull/4133
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames)
};
