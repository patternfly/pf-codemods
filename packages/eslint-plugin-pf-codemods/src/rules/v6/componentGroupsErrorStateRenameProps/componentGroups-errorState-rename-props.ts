import { renameProps } from "../../helpers";
import { Renames } from "../../helpers/renameSinglePropOnNode";

// https://github.com/patternfly/react-component-groups/pull/145

const formatMessage = (oldPropName: string, newPropName: string) =>
  `The ${oldPropName} prop for ErrorState has been renamed to ${newPropName}.`;

const renames: Renames = {
  ErrorState: {
    errorTitle: {
      newName: "titleText",
      message: formatMessage("errorTitle", "titleText"),
    },
    errorDescription: {
      newName: "bodyText",
      message: formatMessage("errorDescription", "bodyText"),
    },
    defaultErrorDescription: {
      newName: "defaultBodyText",
      message: formatMessage("defaultErrorDescription", "defaultBodyText"),
    },
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
