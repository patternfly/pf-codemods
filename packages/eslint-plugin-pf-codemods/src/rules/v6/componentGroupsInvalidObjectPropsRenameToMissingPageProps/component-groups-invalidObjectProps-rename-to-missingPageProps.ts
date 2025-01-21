import { renameInterface } from "../../helpers";

// https://github.com/patternfly/react-component-groups/pull/313
module.exports = {
  meta: { fixable: "code" },
  create: renameInterface(
    {
      InvalidObjectProps: "MissingPageProps",
    },
    {
      InvalidObject: "MissingPage",
    },
    "@patternfly/react-component-groups"
  ),
};
