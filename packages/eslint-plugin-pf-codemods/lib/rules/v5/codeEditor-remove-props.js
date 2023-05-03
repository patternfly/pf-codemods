const { renameProps } = require("../../helpers");

let propRenames = {};

["entryDelay", "exitDelay", "maxWidth", "position", "toolTipText"].forEach(
  (prop) => {
    propRenames[prop] = {
      newName: "",
      message: (node) =>
        `${prop} has been removed for ${node.name.name}. This can instead be passed via the tooltipProps prop`,
    };
  }
);

// https://github.com/patternfly/patternfly-react/pull/8624
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    CodeEditor: propRenames,
  }),
};
