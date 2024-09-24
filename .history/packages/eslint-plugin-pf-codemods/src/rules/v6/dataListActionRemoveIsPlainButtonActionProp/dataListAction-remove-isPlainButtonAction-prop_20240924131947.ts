import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10939
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    DataListAction: {
      isPlainButtonAction: {
        newName: "",
        message:
          "The `isPlainButtonAction` prop has been removed from DataListAction as a wrapper is no longer needed.",
      },
    },
  }),
};
