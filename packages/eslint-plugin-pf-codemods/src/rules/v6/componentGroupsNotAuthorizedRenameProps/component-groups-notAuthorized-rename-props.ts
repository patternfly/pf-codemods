import { renameProps } from "../../helpers";
import { Renames } from "../../helpers/renameSinglePropOnNode";

// https://github.com/patternfly/react-component-groups/pull/145

const formatMessage = (
  component: string,
  oldPropName: string,
  newPropName: string
) =>
  `The ${oldPropName} prop for ${component} has been renamed to ${newPropName}.`;

const getPropsRenames = (component: string) => ({
  description: {
    newName: "bodyText",
    message: formatMessage(component, "description", "bodyText"),
  },
  title: {
    newName: "titleText",
    message: formatMessage(component, "title", "titleText"),
  },
});

const renames: Renames = {
  NotAuthorized: getPropsRenames("NotAuthorized"),
  UnauthorizedAccess: getPropsRenames("UnauthorizedAccess"),
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
