const { renameProps } = require('../../helpers');

const renames = {
  Modal: {
    'hideTitle': '',
    'isFooterLeftAligned': ''
  },
  ModalBoxFooter: {
    'isFooterLeftAligned': ''
  }
};

// https://github.com/patternfly/patternfly-react/pull/4140
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames)
};
