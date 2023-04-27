const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8649
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Alert: {
      "aria-label": {
        newName: "",
        message: (node) =>
          `aria-label prop for ${node.name.name} has been removed and should not be used as it is not well supported on div elements without a role.`,
      },
    },
  }),
};
