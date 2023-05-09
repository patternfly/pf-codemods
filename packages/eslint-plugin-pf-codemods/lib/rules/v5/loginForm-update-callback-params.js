const { addCallbackParam } = require("../../helpers");
const updateObject = {
  defaultParamName: "_event",
  previousParamIndex: 1,
  otherMatchers: /^_?(ev\w*|e$)/,
};

// https://github.com/patternfly/patternfly-react/pull/8996
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["LoginForm"], {
    onChangeUsername: updateObject,
    onChangePassword: updateObject,
    onChangeRememberMe: updateObject,
  }),
};
