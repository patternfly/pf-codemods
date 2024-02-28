const ruleTester = require("../../ruletester");
import * as rule from "./formGroup-rename-labelIcon";

ruleTester.run("formGroup-rename-labelIcon", rule, {
  valid: [
    {
      code: `<FormGroup labelIcon />`,
    },
    {
      code: `import { FormGroup } from '@patternfly/react-core'; <FormGroup someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { FormGroup } from '@patternfly/react-core'; <FormGroup labelIcon={<>Help icon</>} />`,
      output: `import { FormGroup } from '@patternfly/react-core'; <FormGroup labelHelp={<>Help icon</>} />`,
      errors: [
        {
          message: `The \`labelIcon\` prop for FormGroup has been renamed to \`labelHelp\`. We recommend using FormGroupLabelHelp element for the labelHelp prop. The markup has also changed, we now wrap the labelHelp element in \`<span className="pf-v6-c-form__group-label-help">\`, so there is no need to add \`className="pf-v6-c-form__group-label-help"\` to the labelHelp element.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
