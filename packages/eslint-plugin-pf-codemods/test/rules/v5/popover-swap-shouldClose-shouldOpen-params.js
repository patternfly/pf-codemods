const { swapCallbackParamTester } = require("../../testHelpers");

swapCallbackParamTester(
  "popover-swap-shouldClose-shouldOpen-params",
  "Popover",
  ["shouldClose"],
  2
);

swapCallbackParamTester(
  "popover-swap-shouldClose-shouldOpen-params",
  "Popover",
  ["shouldOpen"],
  1
);
