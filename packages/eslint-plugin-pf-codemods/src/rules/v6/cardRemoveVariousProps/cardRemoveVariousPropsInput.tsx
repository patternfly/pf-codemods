import { Card } from "@patternfly/react-core";

export const CardRemoveVariousPropsInput = () => (
  <Card
    isSelectableRaised
    isDisabledRaised
    hasSelectableInput
    selectableInputAriaLabel="aria label"
    onSelectableInputChange={() => {}}
  />
);
