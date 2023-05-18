const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9147
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    InputGroupText: {
      variant: "",
    },
  }),
};
