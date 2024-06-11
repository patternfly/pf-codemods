import { moveSpecifiers } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10358

const specifiersToMove = ["Modal", "ModalBody", "ModalHeader", "ModalFooter"];

const fromPackage = "@patternfly/react-core/next";
const toPackage = "@patternfly/react-core";
const messageAfterImportNameChange =
  "been promoted. This rule will update import paths.";

module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange
  ),
};
