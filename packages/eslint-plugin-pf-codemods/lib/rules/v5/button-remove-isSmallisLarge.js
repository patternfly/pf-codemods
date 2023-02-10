const { renameProps } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8144
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProps({
      'Button': {
        'isSmall': 'size="sm"',
        'isLarge': 'size="lg"'
      }
    }),
  };
