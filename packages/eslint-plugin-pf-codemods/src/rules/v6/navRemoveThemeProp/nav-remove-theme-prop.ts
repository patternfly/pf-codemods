import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9948
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Nav: {
      theme: {
        newName: "",
        message:
          "The `theme` prop is no longer supported in Nav. Use light/dark mode theming instead.",
      },
    },
  }),
};
