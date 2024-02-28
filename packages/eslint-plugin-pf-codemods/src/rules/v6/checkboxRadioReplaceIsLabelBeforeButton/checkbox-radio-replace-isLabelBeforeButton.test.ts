const ruleTester = require("../../ruletester");
import * as rule from "./checkbox-radio-replace-isLabelBeforeButton";

ruleTester.run("checkbox-radio-replace-isLabelBeforeButton", rule, {
  valid: [
    {
      code: `<Checkbox isLabelBeforeButton />`,
    },
    {
      code: `import { Checkbox } from '@patternfly/react-core'; <Checkbox someOtherProp />`,
    },
    {
      code: `<Radio isLabelBeforeButton />`,
    },
    {
      code: `import { Radio } from '@patternfly/react-core'; <Radio someOtherProp />`,
    },
  ],
  invalid: ["Checkbox", "Radio"].map((component) => ({
    code: `import { ${component} } from '@patternfly/react-core'; <${component} isLabelBeforeButton />`,
    output: `import { ${component} } from '@patternfly/react-core'; <${component} labelPosition="start" />`,
    errors: [
      {
        message: `isLabelBeforeButton prop for ${component} has been replaced with labelPosition="start"`,
        type: "JSXOpeningElement",
      },
    ],
  })),
});
