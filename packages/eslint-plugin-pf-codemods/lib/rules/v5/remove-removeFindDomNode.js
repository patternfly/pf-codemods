const { renameProps } = require('../../helpers');

const renames = {
  ApplicationLauncher: {
    'removeFindDomNode': ''
  },
  ClipboardCopy: {
    'removeFindDomNode': ''
  },
  ContextSelector: {
    'removeFindDomNode': ''
  },
  Dropdown: {
    'removeFindDomNode': ''
  },
  NavItem: {
    'removeFindDomNode': ''
  },
  OptionsMenu: {
    'removeFindDomNode': ''
  },
  Popover: {
    'removeFindDomNode': ''
  },
  SearchInput: {
    'removeFindDomNode': ''
  },
  Select: {
    'removeFindDomNode': ''
  },
  OverflowTab: {
    'removeFindDomNode': ''
  },
  Timepicker: {
    'removeFindDomNode': ''
  },
  Tooltip: {
    'removeFindDomNode': ''
  },
  Truncate: {
    'removeFindDomNode': ''
  }
};

// https://github.com/patternfly/patternfly-react/pull/8371
// https://github.com/patternfly/patternfly-react/pull/8316
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps(renames)
};

