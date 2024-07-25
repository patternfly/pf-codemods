import { renameProps } from "../../helpers";
import { Renames } from "../../helpers/renameSinglePropOnNode";

// https://github.com/patternfly/react-component-groups/pull/145

const formatMessage = (propName: string) =>
  `The ${propName} prop for MultiContentCard has been removed.`;
const renames: Renames = {
  MultiContentCard: {
    leftBorderVariant: {
      newName: "",
      message: formatMessage("leftBorderVariant"),
    },
    withHeaderBorder: {
      newName: "",
      message: formatMessage("withHeaderBorder"),
    },
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
