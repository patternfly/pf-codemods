import {
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarReplacedSpacerSpaceItemsInput = () => (
  <>
    <ToolbarGroup
      spacer={{ default: "spacerNone", md: "spacerSm", lg: "spacerMd" }}
      spaceItems={{
        default: "spaceItemsNone",
        md: "spaceItemsSm",
        lg: "spaceItemsMd",
      }}
    />
    <ToolbarItem
      spacer={{ default: "spacerNone", md: "spacerSm", lg: "spacerMd" }}
    />
    <ToolbarToggleGroup
      spacer={{ default: "spacerNone", md: "spacerSm", lg: "spacerMd" }}
      spaceItems={{
        default: "spaceItemsNone",
        md: "spaceItemsSm",
        lg: "spaceItemsMd",
      }}
    />
  </>
);
