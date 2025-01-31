import { renameInterface } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10016
module.exports = {
  meta: { fixable: "code" },
  create: renameInterface({
    FormFiledGroupHeaderTitleTextObject: {
      newName: "FormFieldGroupHeaderTitleTextObject",
      message:
        "There was a typo in FormFiledGroupHeaderTitleTextObject interface. It was renamed to the intended FormFieldGroupHeaderTitleTextObject.",
    },
  }),
};
