const { renameComponents } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  meta: { fixable: 'code' },
  create: renameComponents(
    { 'ChipButton': 'Button' }
  )
};
