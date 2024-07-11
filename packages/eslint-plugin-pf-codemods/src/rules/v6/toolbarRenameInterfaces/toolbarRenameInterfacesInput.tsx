import {
  ToolbarChipGroup,
  ToolbarChipGroupContentProps as CustomGroupContent,
  ToolbarChip,
} from "@patternfly/react-core";

interface MyInterface extends ToolbarChip {}
let typedThing: ToolbarChipGroup;

export {
  ToolbarChipGroup as CustomGroup,
  CustomGroupContent,
  ToolbarChip as CustomThing,
};
