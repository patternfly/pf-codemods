const {
  addCallbackParamTester,
  swapCallbackParamTester,
} = require("../../testHelpers");

addCallbackParamTester(
  "calendarMonth-update-onChange-onMonthChange-params",
  "CalendarMonth",
  "onChange"
);

swapCallbackParamTester(
  "calendarMonth-update-onChange-onMonthChange-params",
  "CalendarMonth",
  "onMonthChange",
  1
);
