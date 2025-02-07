import { Label } from '@patternfly/react-core';

export const ChipReplaceWithLabelInput = () => (
  <Label variant="outline" onClose={handleClick} numLabels={3}>
    This is a chip
    {badge}
  </Label>
);
