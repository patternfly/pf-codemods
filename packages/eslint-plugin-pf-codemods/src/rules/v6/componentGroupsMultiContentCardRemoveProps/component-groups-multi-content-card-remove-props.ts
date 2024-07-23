import { renameProps } from "../../helpers";

// https://github.com/patternfly/react-component-groups/pull/145

const renames = {
  MultiContentCard: { leftBorderVariant: "", withHeaderBorder: "" },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames, "@patternfly/react-component-groups"),
};
