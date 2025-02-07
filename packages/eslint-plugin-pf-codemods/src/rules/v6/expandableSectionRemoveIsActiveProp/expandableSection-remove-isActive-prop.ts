import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9881
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    ExpandableSection: {
      isActive: {
        newName: "",
        message: "The `isActive` prop has been removed from ExpandableSection.",
      },
    },
  }),
};
