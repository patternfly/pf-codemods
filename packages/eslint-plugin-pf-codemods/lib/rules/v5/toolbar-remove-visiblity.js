const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8212
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    ToolbarContent: { visiblity: "visibility" },
  }),
};
