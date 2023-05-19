// https://github.com/patternfly/patternfly-react/pull/8798
const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  { name: "OptionsMenu", type: "component" },
  { name: "OptionsMenuToggle", type: "component" },
  { name: "OptionsMenuItemGroup", type: "component" },
  { name: "OptionsMenuItem", type: "component" },
  { name: "OptionsMenuSeparator", type: "component" },
  { name: "OptionsMenuToggleWithText", type: "component" },
];
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";
const aliasSuffix = "Deprecated";
const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown or Select implementation.";
const messageAfterElementNameChange =
  "has been deprecated. Running the fix flag will update names, but we suggest using our new Dropdown or Select implementation.";

module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange,
    messageAfterElementNameChange,
    aliasSuffix
  ),
};
