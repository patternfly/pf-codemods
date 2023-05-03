const { renameProps } = require("../../helpers");

const propRemovals = {};

["isError", "isHidden", "icon", "component"].forEach((prop) => {
  propRemovals[prop] = {
    newName: "",
    message: (node) =>
      `${prop} prop for ${node.name.name} has been removed. Use HelperText and HelperTextItem directly in children.`,
  };
});

// https://github.com/patternfly/patternfly-react/pull/8810
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    FormHelperText: propRemovals,
  }),
};
