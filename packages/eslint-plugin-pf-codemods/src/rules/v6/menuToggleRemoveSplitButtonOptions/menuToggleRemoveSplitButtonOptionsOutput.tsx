import { MenuToggle,  } from "@patternfly/react-core";

const sbOptions = {
  items: ["Item 1", "Item 2"],
  variant: "action",
};

export const MenuToggleRemoveSplitButtonOptionsInput = () => (
  <>
    <MenuToggle
      splitButtonItems={["Item 1", "Item 2"]}
    ></MenuToggle>
    <MenuToggle splitButtonItems={sbOptions.items}></MenuToggle>
  </>
);
