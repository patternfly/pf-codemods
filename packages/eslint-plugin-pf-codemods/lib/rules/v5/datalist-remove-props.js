const { renameProps } = require("../../helpers");

const propRemovals = {
  itemOrder: {
    newName: "",
  },
};

["onDragFinish", "onDragStart", "onDragMove", "onDragCancel"].forEach(
  (prop) => {
    propRemovals[prop] = {
      newName: "",
      message: (node) =>
        `${prop} prop for ${node.name.name} has been removed. Implement drag and drop using the DragDrop component instead.`,
    };
  }
);

// https://github.com/patternfly/patternfly-react/pull/8388
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    DataList: propRemovals,
  }),
};
