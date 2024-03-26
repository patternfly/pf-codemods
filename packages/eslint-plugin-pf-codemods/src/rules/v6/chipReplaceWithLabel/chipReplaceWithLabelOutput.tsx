import { Label } from '@patternfly/react-core';

export const ChipReplaceWithLabelInput = () => (
  <Label variant='outline' onClose={handleClick}>
    {badge}
  </Label>
);
