import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10037
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Label: {
      isOverflowLabel: {
        newName: 'variant="overflow"',
        replace: true,
      },
    },
  }),
};
