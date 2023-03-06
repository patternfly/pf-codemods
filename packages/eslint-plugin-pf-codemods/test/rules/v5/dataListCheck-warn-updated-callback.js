const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/dataListCheck-warn-updated-callback");

ruleTester.run("dataListCheck-warn-updated-callback", rule, {
  valid: [
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck />;`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataListCheck onChange />;`,
    },
  ],
  invalid: [
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck onChange />;`,
      output: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck onChange />;`,
      errors: [
        {
          message: `The "onChange" prop for DataListCheck has been updated so that the event parameter is the first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataListCheck as PFdlc } from '@patternfly/react-core'; <PFdlc onChange />;`,
      output: `import { DataListCheck as PFdlc } from '@patternfly/react-core'; <PFdlc onChange />;`,
      errors: [
        {
          message: `The "onChange" prop for DataListCheck has been updated so that the event parameter is the first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
