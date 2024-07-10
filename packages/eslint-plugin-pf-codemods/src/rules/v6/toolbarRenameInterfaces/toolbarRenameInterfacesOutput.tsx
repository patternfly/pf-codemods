import {
  ToolbarLabelGroup,
  ToolbarLabelGroupContentProps as CustomGroupContent,
  ToolbarLabel,
} from "@patternfly/react-core";

interface MyInterface extends ToolbarLabel {}
let typedThing: ToolbarLabelGroup;

export {
  ToolbarLabelGroup as CustomGroup,
  CustomGroupContent,
  ToolbarLabel as CustomThing,
};
