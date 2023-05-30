// https://github.com/patternfly/patternfly-react/pull/8836
const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  "ApplicationLauncherText",
  "ApplicationLauncherTextProps",
  "ApplicationLauncherSeparator",
  "ApplicationLauncherItemContext",
  "ApplicationLauncherItemProps",
  "ApplicationLauncherItem",
  "ApplicationLauncherIconProps",
  "ApplicationLauncherIcon",
  "ApplicationLauncherGroup",
  "ApplicationLauncherContext",
  "ApplicationLauncherContentProps",
  "ApplicationLauncherContent",
  "ApplicationLauncherProps",
  "ApplicationLauncher",
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
