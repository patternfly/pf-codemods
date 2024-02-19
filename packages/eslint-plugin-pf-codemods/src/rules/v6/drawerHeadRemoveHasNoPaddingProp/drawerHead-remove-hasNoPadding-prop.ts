import { renameProps } from "../../helpers";

const propsToRemove = {
  DrawerHead: {
    hasNoPadding: {
      newName: "",
      message: "The `hasNoPadding` prop has been removed from DrawerHead.",
    },
  },
};

// https://github.com/patternfly/patternfly-react/pull/10036
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    DrawerHead: {
      hasNoPadding: {
        newName: "",
        message: "The `hasNoPadding` prop has been removed from DrawerHead.",
      },
    },
  }),
};
