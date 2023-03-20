const { addCallbackParamTester } = require("../../testHelpers");
const onToggleAPIUpdateList = [
  "ApplicationLauncher",
  "BadgeToggle",
  "DropdownToggle",
  "KebabToggle",
  "Toggle",
  "Select",
  "SelectToggle",
];

addCallbackParamTester("onToggle-updated-paramaters", onToggleAPIUpdateList, 'onToggle');
