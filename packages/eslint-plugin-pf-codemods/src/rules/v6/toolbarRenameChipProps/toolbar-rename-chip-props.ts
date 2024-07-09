import { renameProps } from "../../helpers";

const renames = {
  Toolbar: {
    customChipGroupContent: "customLabelGroupContent",
  },
  ToolbarExpandableContent: {
    chipContainerRef: "labelContainerRef",
  },
  ToolbarFilter: {
    chips: "labels",
    deleteChipGroup: "deleteLabelGroup",
    deleteChip: "deleteLabel",
    chipGroupExpandedText: "labelGroupExpandedText",
    chipGroupCollapsedText: "labelGroupCollapsedText",
    expandableChipContainerRef: "expandableLabelContainerRef",
  },
  ToolbarChipGroupContent: {
    chipGroupContentRef: "labelGroupContentRef",
    customChipGroupContent: "customLabelGroupContent",
  },
  ToolbarToggleGroup: {
    chipContainerRef: "labelContainerRef",
  },
};

// https://github.com/patternfly/patternfly-react/pull/10649
module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames),
};
