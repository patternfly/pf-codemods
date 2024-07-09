import {
  Toolbar,
  ToolbarExpandableContent,
  ToolbarFilter,
  ToolbarChipGroupContent,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarReplaceChipInstancesInput = () => (
  <>
    <Toolbar customLabelGroupContent />
    <ToolbarExpandableContent labelContainerRef />
    <ToolbarFilter
      labels
      deleteLabelGroup
      deleteLabel
      labelGroupExpandedText
      labelGroupCollapsedText
      expandableLabelContainerRef
    />
    <ToolbarChipGroupContent labelGroupContentRef customLabelGroupContent />
    <ToolbarToggleGroup labelContainerRef />
  </>
);
