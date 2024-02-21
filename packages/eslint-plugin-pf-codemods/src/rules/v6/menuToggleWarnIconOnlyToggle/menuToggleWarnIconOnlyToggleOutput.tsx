import { MenuToggle } from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const MenuToggleWarnIconOnlyToggleInput = () => (
  <MenuToggle
    icon={EllipsisVIcon}
    aria-label='A descriptive aria-label'
    variant='plain'
  />
);
