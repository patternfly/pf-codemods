import { moveSpecifiers } from '../../helpers';

// https://github.com/patternfly/patternfly-react/pull/10049

const specifiersToMove = ['Chip', 'ChipGroup'];

const fromPackage = '@patternfly/react-core';
const toPackage = '@patternfly/react-core/deprecated';
const messageAfterImportNameChange =
  'been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Label instead.';

module.exports = {
  meta: { fixable: 'code' },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange
  ),
};
