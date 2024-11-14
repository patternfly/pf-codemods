import { renameInterface } from "../../helpers";

// https://github.com/patternfly/react-component-groups/pull/313
module.exports = {
  meta: { fixable: "code" },
  create: renameInterface(
    {
      InvalidObjectProps: "MissingPageProps",
    },
    "@patternfly/react-component-groups"
  ),
};
