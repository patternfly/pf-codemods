import { renameProps } from "../../helpers";
import { Renames } from "../../helpers/renameSinglePropOnNode";

// https://github.com/patternfly/react-component-groups/pull/145

const renames: Renames = {
  UnavailableContent: {
    unavailableTitleText: {
      newName: "titleText",
      message:
        "The unavailableTitleText prop for UnavailableContent has been renamed to titleText.",
    },
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
