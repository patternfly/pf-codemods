const { renameProps } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8134
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(
    {
      'Pagination': {
        'ToggleTemplateProps': 'PaginationToggleTemplateProps'
      }
    }
  )
};