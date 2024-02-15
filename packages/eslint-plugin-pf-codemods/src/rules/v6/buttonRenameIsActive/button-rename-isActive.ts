import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9934
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Button: {
      isActive: "isClicked",
    },
  }),
};
