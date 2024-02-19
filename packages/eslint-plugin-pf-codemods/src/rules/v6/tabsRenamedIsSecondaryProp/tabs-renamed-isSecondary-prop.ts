import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10044
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Tabs: {
      isSecondary: {
        newName: "isSubtab",
        message:
          "The `isSecondary` prop for Tabs has been renamed to `isSubtab`.",
      },
    },
  }),
};
