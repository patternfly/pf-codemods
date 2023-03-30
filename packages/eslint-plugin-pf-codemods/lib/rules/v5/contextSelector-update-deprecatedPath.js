const { moveSpecifiers } = require("../../helpers");

const importsToMove = [
  { name: "ContextSelector", type: "component" },
  { name: "ContextSelectorItem", type: "component" },
  { name: "ContextSelectorFooter", type: "component" },
];
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const aliasSuffix = "Deprecated";
const messageAfterImportNameChange =
  "been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our composable Menu implementation.";
const messageAfterElementNameChange =
  "has been deprecated. Running the fix flag will update names, but we suggest using our composable Menu implementation.";

// https://github.com/patternfly/patternfly-react/pull/8840
module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    importsToMove,
    fromPackage,
    toPackage,
    messageAfterImportNameChange,
    messageAfterElementNameChange,
    aliasSuffix
  ),
};
