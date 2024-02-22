import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9774
module.exports = {
  meta: { fixable: "code" },
  create: renameProps(
    {
      PageHeaderToolsItem: {
        isSelected: {
          newName: "",
          message:
            "The `isSelected` prop has been removed from PageHeaderToolsItem.",
        },
      },
    },
    "@patternfly/react-core/deprecated"
  ),
};
