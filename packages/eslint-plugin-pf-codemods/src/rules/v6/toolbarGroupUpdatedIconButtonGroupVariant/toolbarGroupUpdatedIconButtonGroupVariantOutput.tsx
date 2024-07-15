import {
  ToolbarGroup,
  ToolbarToggleGroup,
  ToolbarGroupVariant,
} from "@patternfly/react-core";

export const ToolbarGroupUpdatedIconButtonGroupVariantInput = () => (
  <>
    <ToolbarGroup variant="action-group-plain" />
    <ToolbarGroup variant={ToolbarGroupVariant["action-group-plain"]} />
    <ToolbarToggleGroup variant="action-group-plain" />
    <ToolbarToggleGroup variant={ToolbarGroupVariant["action-group-plain"]} />
  </>
);
