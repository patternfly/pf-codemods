import {
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarUpdateAlignValuesInput = () => (
  <>
    <ToolbarGroup
      align={{
        default: "alignLeft",
        md: "alignRight",
        lg: "alignLeft",
        xl: "alignRight",
        "2xl": "alignLeft",
      }}
    />
    <ToolbarItem
      align={{
        default: "alignLeft",
        md: "alignRight",
        lg: "alignLeft",
        xl: "alignRight",
        "2xl": "alignLeft",
      }}
    />
    <ToolbarToggleGroup
      alignment={{
        default: "alignLeft",
        md: "alignRight",
        lg: "alignLeft",
        xl: "alignRight",
        "2xl": "alignLeft",
      }}
    />
  </>
);
