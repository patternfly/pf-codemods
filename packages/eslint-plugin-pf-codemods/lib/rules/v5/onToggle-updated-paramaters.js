const { addCallbackParam } = require("../../helpers");
const onToggleAPIUpdateList = [
  "ApplicationLauncher",
  "BadgeToggle",
  "DropdownToggle",
  "KebabToggle",
  "Toggle",
  "Select",
  "SelectToggle",
];
// https://github.com/patternfly/patternfly-react/pull/8667
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(onToggleAPIUpdateList, { onToggle: "_event" }),
};
