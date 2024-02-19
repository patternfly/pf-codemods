import { renameProps } from "../../helpers";

const propsToRemove = {
  HelperTextItem: {
    hasIcon: {
      newName: "",
      message: `The \`hasIcon\` prop has been removed from HelperTextItem. An icon will now render automatically when the \`variant\` prop has a value other than "default" or when the \`icon\` prop is passed in.`,
    },
    isDynamic: {
      newName: "",
      message: `The \`isDynamic\` prop has been removed from HelperTextItem.`,
    },
  },
};

// https://github.com/patternfly/patternfly-react/pull/10029
module.exports = {
  meta: { fixable: "code" },
  create: renameProps(propsToRemove),
};
