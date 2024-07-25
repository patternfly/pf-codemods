import { renameProps } from "../../helpers";
import { Renames } from "../../helpers/renameSinglePropOnNode";

// https://github.com/patternfly/react-component-groups/pull/145

const formatMessage = (oldPropName: string, newPropName: string) =>
  `The \`${oldPropName}\` prop for UnavailableContent has been renamed to \`${newPropName}\`.`;

const renames: Renames = {
  UnavailableContent: {
    unavailableTitleText: {
      newName: "titleText",
      message: formatMessage("unavailableTitleText", "titleText"),
    },
    unavailableBodyPreStatusLinkText: {
      newName: "preLinkBodyText",
      message: formatMessage(
        "unavailableBodyPreStatusLinkText",
        "preLinkBodyText"
      ),
    },
    unavailableBodyPostStatusLinkText: {
      newName: "postLinkBodyText",
      message: formatMessage(
        "unavailableBodyPostStatusLinkText",
        "postLinkBodyText"
      ),
    },
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
