import { MenuToggle, SplitButtonOptions } from "@patternfly/react-core";

const sbOptions: SplitButtonOptions = {
  items: ["Item 1", "Item 2"],
  variant: "action",
};

export const MenuToggleRemoveSplitButtonOptionsInput = () => (
  <>
    <MenuToggle
      splitButtonOptions={{
        items: ["Item 1", "Item 2"],
        variant: "action",
      }}
    ></MenuToggle>
    <MenuToggle splitButtonOptions={sbOptions}></MenuToggle>
  </>
);
