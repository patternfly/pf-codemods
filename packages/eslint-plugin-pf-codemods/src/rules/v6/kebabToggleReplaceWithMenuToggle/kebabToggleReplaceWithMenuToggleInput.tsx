import { KebabToggle } from "@patternfly/react-core/deprecated";

export const KebabToggleRemovedInput = () => (
  <>
    <KebabToggle onToggle={() => {}} />
    <Dropdown toggle={<KebabToggle onToggle={() => {}} />} />
  </>
);
