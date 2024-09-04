import {
  ToolbarGroup,
  ToolbarToggleGroup,
  ToolbarGroupVariant,
} from "@patternfly/react-core";

export const ToolbarGroupUpdatedVariantInput = () => (
  <>
    <ToolbarGroup variant="action-group" />
    <ToolbarGroup variant={ToolbarGroupVariant["action-group-plain"]} />
    <ToolbarToggleGroup variant="action-group-plain" />
    <ToolbarToggleGroup variant={ToolbarGroupVariant["action-group"]} />
  </>
);
