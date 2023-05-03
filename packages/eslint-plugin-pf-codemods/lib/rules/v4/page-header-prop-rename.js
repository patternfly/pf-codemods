const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    PageHeader: {
      toolbar: { newName: "headerTools" },
    },
  }),
};
