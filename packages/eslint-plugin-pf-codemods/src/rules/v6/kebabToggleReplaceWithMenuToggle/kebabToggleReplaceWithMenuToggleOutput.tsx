import { MenuToggle } from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const KebabToggleRemovedInput = () => (
  <>
    <MenuToggle icon={<EllipsisVIcon aria-hidden="true" />} onClick={() => {}} />
    <Dropdown toggle={<MenuToggle icon={<EllipsisVIcon aria-hidden="true" />} onClick={() => {}} />} />
  </>
);
