const { renameProps } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8352
const renames = {
  'TableComposable': {
    hasSelectableRowCaption: ''
  }
};

module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames, '@patternfly/react-table')
};