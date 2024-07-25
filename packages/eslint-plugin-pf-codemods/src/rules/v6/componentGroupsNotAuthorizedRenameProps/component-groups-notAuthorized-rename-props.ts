import { renameProps } from "../../helpers";
import { Renames } from "../../helpers/renameSinglePropOnNode";

// https://github.com/patternfly/react-component-groups/pull/145

const formatMessage = (oldPropName: string, newPropName: string) =>
  `The ${oldPropName} prop for NotAuthorized has been renamed to ${newPropName}.`;

const renames: Renames = {
  NotAuthorized: {
    description: {
      newName: "bodyText",
      message: formatMessage("description", "bodyText"),
    },
    title: {
      newName: "titleText",
      message: formatMessage("title", "titleText"),
    },
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
