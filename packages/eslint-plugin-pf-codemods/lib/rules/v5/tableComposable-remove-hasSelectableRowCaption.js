const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8352
const renames = {
  TableComposable: {
    hasSelectableRowCaption: "",
  },
  // Remove if TableComposable has been renamed to Table already
  Table: {
    hasSelectableRowCaption: "",
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-table"),
};
