import { renameComponent } from "../../helpers/renameComponent";

// https://github.com/patternfly/patternfly-react/pull/10809

const renames = {
  MastheadBrand: "MastheadLogo",
};

module.exports = {
  meta: { fixable: "code" },
  create: renameComponent(renames),
};
