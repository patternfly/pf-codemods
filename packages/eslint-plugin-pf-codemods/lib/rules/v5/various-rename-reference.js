const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8733
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    "Tooltip": { "reference": "triggerRef" },
    "Popover": { "reference": "triggerRef" },
  }),
};
