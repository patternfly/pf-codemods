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
  // We can't assume that the rename rule will run after this one, so just add the renamed
  // component to this list
  ToolbarLabelGroupContent: {
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
