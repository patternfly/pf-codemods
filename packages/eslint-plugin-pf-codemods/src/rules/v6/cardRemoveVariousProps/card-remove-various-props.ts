import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10056
const formatMessage = (propName: string) =>
  `The ${propName} prop has been removed`;
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Card: {
      isSelectableRaised: {
        newName: "",
        message: formatMessage("isSelectableRaised"),
      },
      isDisabledRaised: {
        newName: "",
        message: formatMessage("isDisabledRaised"),
      },
      hasSelectableInput: {
        newName: "",
        message: formatMessage("hasSelectableInput"),
      },
      selectableInputAriaLabel: {
        newName: "",
        message: formatMessage("selectableInputAriaLabel"),
      },
      onSelectableInputChange: {
        newName: "",
        message: formatMessage("onSelectableInputChange"),
      },
      isFlat: {
        newName: "",
        message: formatMessage("isFlat"),
      },
      isRounded: {
        newName: "",
        message: formatMessage("isRounded"),
      },
    },
  }),
};
