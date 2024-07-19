import { MenuToggle } from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const KebabToggleRemovedInput = () => (
  <>
    <MenuToggle variant="plain" icon={<EllipsisVIcon aria-hidden="true" />} onClick={() => {}} />
    <Dropdown toggle={<MenuToggle variant="plain" icon={<EllipsisVIcon aria-hidden="true" />} onClick={() => {}} />} />
  </>
);
