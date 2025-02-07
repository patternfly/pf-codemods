import { Chip } from '@patternfly/react-core/deprecated';

export const ChipReplaceWithLabelInput = () => (
  <Chip onClick={handleClick} badge={badge} numChips={3}>
    This is a chip
  </Chip>
);
