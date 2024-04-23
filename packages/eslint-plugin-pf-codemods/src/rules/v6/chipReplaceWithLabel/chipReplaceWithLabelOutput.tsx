import { Label } from '@patternfly/react-core';

export const ChipReplaceWithLabelInput = () => (
  <Label variant="outline" onClose={handleClick}>
    This is a chip
    {badge}
  </Label>
);
