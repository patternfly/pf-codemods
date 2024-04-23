import { Chip } from '@patternfly/react-core/deprecated';

export const ChipReplaceWithLabelInput = () => (
  <Chip onClick={handleClick} badge={badge}>
    This is a chip
  </Chip>
);
