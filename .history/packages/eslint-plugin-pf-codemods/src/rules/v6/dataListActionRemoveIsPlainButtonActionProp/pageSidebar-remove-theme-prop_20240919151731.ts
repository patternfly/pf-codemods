import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10939
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    DataListaction: {
      theme: {
        newName: "",
        message:
          "The `theme` prop has been removed from PageSidebar as theming is no longer handled React-side.",
      },
    },
  }),
};
