import {
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarUpdateAlignValuesInput = () => (
  <>
    <ToolbarGroup
      align={{
        default: "alignStart",
        md: "alignEnd",
        lg: "alignStart",
        xl: "alignEnd",
        "2xl": "alignStart",
      }}
    />
    <ToolbarItem
      align={{
        default: "alignStart",
        md: "alignEnd",
        lg: "alignStart",
        xl: "alignEnd",
        "2xl": "alignStart",
      }}
    />
    <ToolbarToggleGroup
      alignment={{
        default: "alignStart",
        md: "alignEnd",
        lg: "alignStart",
        xl: "alignEnd",
        "2xl": "alignStart",
      }}
    />
  </>
);
