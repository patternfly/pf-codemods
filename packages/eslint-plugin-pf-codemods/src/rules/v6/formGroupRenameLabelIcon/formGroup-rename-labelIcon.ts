import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10016
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    FormGroup: {
      labelIcon: {
        newName: "labelHelp",
        message: `The \`labelIcon\` prop for FormGroup has been renamed to \`labelHelp\`. We recommend using FormGroupLabelHelp element for the labelHelp prop. The markup has also changed, we now wrap the labelHelp element in \`<span className="pf-v6-c-form__group-label-help">\`, so there is no need to add \`className="pf-v6-c-form__group-label-help"\` to the labelHelp element.`,
      },
    },
  }),
};
