import { renameComponent } from "../../helpers/renameComponent";

// https://github.com/patternfly/react-component-groups/pull/313
module.exports = {
  meta: { fixable: "code" },
  create: renameComponent(
    {
      InvalidObject: "MissingPage",
    },
    "@patternfly/react-component-groups"
  ),
};
