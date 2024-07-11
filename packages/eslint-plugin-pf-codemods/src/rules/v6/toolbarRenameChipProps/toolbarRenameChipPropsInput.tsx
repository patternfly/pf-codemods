import {
  Toolbar,
  ToolbarExpandableContent,
  ToolbarFilter,
  ToolbarChipGroupContent,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarReplaceChipInstancesInput = () => (
  <>
    <Toolbar customChipGroupContent />
    <ToolbarExpandableContent chipContainerRef />
    <ToolbarFilter
      chips
      deleteChipGroup
      deleteChip
      chipGroupExpandedText
      chipGroupCollapsedText
      expandableChipContainerRef
    />
    <ToolbarChipGroupContent chipGroupContentRef customChipGroupContent />
    <ToolbarToggleGroup chipContainerRef />
  </>
);
