import { renameProps } from "../../helpers";
import { Renames } from "../../helpers/renameSinglePropOnNode";

// https://github.com/patternfly/react-component-groups/pull/145

const formatMessage = (oldPropName: string, newPropName: string) =>
  `The ${oldPropName} prop for InvalidObject has been renamed to ${newPropName}.`;

const renames: Renames = {
  InvalidObject: {
    invalidObjectTitleText: {
      newName: "titleText",
      message: formatMessage("invalidObjectTitleText", "titleText"),
    },
    invalidObjectBodyText: {
      newName: "bodyText",
      message: formatMessage("invalidObjectBodyText", "bodyText"),
    },
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
