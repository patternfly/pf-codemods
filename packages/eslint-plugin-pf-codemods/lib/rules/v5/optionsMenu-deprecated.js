// https://github.com/patternfly/patternfly-react/pull/8798
const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  "OptionsMenu",
  "OptionsMenuProps",
  "OptionsMenuToggle",
  "OptionsMenuToggleProps",
  "OptionsMenuItemGroup",
  "OptionsMenuItemGroupProps",
  "OptionsMenuItem",
  "OptionsMenuItemProps",
  "OptionsMenuSeparator",
  "OptionsMenuToggleWithText",
  "OptionsMenuPosition",
  "OptionsMenuDirection",
  "OptionsMenuToggleWithTextProps"
];
const fromPackage = "@patternfly/react-core";
const toPackage = "@patternfly/react-core/deprecated";

const messageAfterSpecifierPathChange =
  "been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown or Select implementation.";

module.exports = {
  meta: { fixable: "code" },
  create: moveSpecifiers(
    specifiersToMove,
    fromPackage,
    toPackage,
    messageAfterSpecifierPathChange
  ),
};
