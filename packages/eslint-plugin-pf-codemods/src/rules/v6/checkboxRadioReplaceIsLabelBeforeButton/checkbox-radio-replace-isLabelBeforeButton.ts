import { renameProps } from "../../helpers";

const renames = {
  isLabelBeforeButton: {
    newName: 'labelPosition="start"',
    replace: true,
  },
};

// https://github.com/patternfly/patternfly-react/pull/10016
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Checkbox: renames,
    Radio: renames,
  }),
};
