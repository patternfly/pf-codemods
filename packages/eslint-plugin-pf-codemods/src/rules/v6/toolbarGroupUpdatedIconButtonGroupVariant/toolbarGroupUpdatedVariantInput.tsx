import {
  ToolbarGroup,
  ToolbarToggleGroup,
  ToolbarGroupVariant,
} from "@patternfly/react-core";

export const ToolbarGroupUpdatedVariantInput = () => (
  <>
    <ToolbarGroup variant='button-group' />
    <ToolbarGroup variant={ToolbarGroupVariant["icon-button-group"]} />
    <ToolbarToggleGroup variant='icon-button-group' />
    <ToolbarToggleGroup variant={ToolbarGroupVariant["button-group"]} />
  </>
);
