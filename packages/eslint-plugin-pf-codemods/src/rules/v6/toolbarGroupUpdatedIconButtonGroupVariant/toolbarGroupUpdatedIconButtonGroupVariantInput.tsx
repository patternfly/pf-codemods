import {
  ToolbarGroup,
  ToolbarToggleGroup,
  ToolbarGroupVariant,
} from "@patternfly/react-core";

export const ToolbarGroupUpdatedIconButtonGroupVariantInput = () => (
  <>
    <ToolbarGroup variant='icon-button-group' />
    <ToolbarGroup variant={ToolbarGroupVariant["icon-button-group"]} />
    <ToolbarToggleGroup variant='icon-button-group' />
    <ToolbarToggleGroup variant={ToolbarGroupVariant["icon-button-group"]} />
  </>
);
