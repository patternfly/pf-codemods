// https://github.com/patternfly/patternfly-react/pull/8836
const { moveSpecifiers } = require("../../helpers");

const specifiersToMove = [
  { name: "ApplicationLauncherText", type: "component" },
  { name: "ApplicationLauncherTextProps", type: "props" },
  { name: "ApplicationLauncherSeparator", type: "component" },
  { name: "ApplicationLauncherItemContext", type: "context" },
  { name: "ApplicationLauncherItemProps", type: "props" },
  { name: "ApplicationLauncherItem", type: "component" },
  { name: "ApplicationLauncherIconProps", type: "props" },
  { name: "ApplicationLauncherIcon", type: "component" },
  { name: "ApplicationLauncherGroup", type: "component" },
  { name: "ApplicationLauncherContext", type: "context" },
  { name: "ApplicationLauncherContentProps", type: "props" },
  { name: "ApplicationLauncherContent", type: "component" },
  { name: "ApplicationLauncherProps", type: "props" },
  { name: "ApplicationLauncher", type: "component" },
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
