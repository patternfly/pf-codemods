import { renameProps } from "../../helpers";

const renames = {
  Toolbar: {
    usePageInsets: "",
  },
  ToolbarContent: {
    alignSelf: "",
  },
  ToolbarToggleGroup: {
    alignment: "",
  },
};

// https://github.com/patternfly/patternfly-react/pull/10674
module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames),
};
