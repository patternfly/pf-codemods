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
  invalidObjectTitleText: {
    newName: "titleText",
    message: formatMessage(component, "invalidObjectTitleText", "titleText"),
  },
  invalidObjectBodyText: {
    newName: "bodyText",
    message: formatMessage(component, "invalidObjectBodyText", "bodyText"),
  },
});

const renames: Renames = {
  InvalidObject: getPropsRenames("InvalidObject"),
  MissingPage: getPropsRenames("MissingPage"),
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
