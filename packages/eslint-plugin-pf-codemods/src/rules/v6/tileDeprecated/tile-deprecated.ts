import { moveSpecifiers } from '../../helpers';

// https://github.com/patternfly/patternfly-react/pull/10821

const specifiersToMove = ['Tile'];

const fromPackage = '@patternfly/react-core';
const toPackage = '@patternfly/react-core/deprecated';
const messageAfterImportNameChange =
  'been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Card instead.';

module.exports = {
  meta: { fixable: 'code' },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange
  ),
};