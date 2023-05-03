const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8179
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    DropdownItem: { isHovered: "" },
  }),
};
