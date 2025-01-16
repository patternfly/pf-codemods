import { moveSpecifiers } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10358

const specifiersToMove = [
  "Modal",
  "ModalVariant",
  "ModalBox",
  "ModalBoxBody",
  "ModalBoxCloseButton",
  "ModalBoxHeader",
  "ModalBoxFooter",
  "ModalContent",
  "ModalProps",
];

const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const messageAfterImportNameChange =
  "been deprecated. This rule will update import paths to our deprecated directory, but we recommend using our newly promoted Modal implementation.";

module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange
  ),
};
