const { swapCallbackParamTester } = require("../../testHelpers");

swapCallbackParamTester(
  "loginForm-update-callback-params",
  "LoginForm",
  ["onChangeUsername", "onChangePassword", "onChangeRememberMe"],
  1
);
