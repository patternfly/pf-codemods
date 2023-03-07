const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/dataListCheck-updated-callback");

ruleTester.run("dataListCheck-updated-callback", rule, {
  valid: [
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck />;`,
    },
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck onChange={() => onChange()} />;`,
    },
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; const onChange = () => {}; <DataListCheck onChange={onChange} />;`,
    },
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; function onChange() {}; <DataListCheck onChange={onChange} />;`,
    },
    {
      // No @patternfly/react-core import
      code: `<DataListCheck onChange />;`,
    },
  ],
  invalid: [
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck onChange={(checked) => onChange()} />;`,
      output: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck onChange={(_event, checked) => onChange()} />;`,
      errors: [
        {
          message: `The "onChange" prop for DataListCheck has been updated so that the "_event" parameter is the first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; const onChange = (checked) => {}; <DataListCheck onChange={onChange} />;`,
      output: `import { DataListCheck } from '@patternfly/react-core'; const onChange = (_event, checked) => {}; <DataListCheck onChange={onChange} />;`,
      errors: [
        {
          message: `The "onChange" prop for DataListCheck has been updated so that the "_event" parameter is the first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; function onChange (checked) {}; <DataListCheck onChange={onChange} />;`,
      output: `import { DataListCheck } from '@patternfly/react-core'; function onChange (_event, checked) {}; <DataListCheck onChange={onChange} />;`,
      errors: [
        {
          message: `The "onChange" prop for DataListCheck has been updated so that the "_event" parameter is the first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck onChange={(checked, event) => onChange()} />;`,
      output: `import { DataListCheck } from '@patternfly/react-core'; <DataListCheck onChange={(checked, event) => onChange()} />;`,
      errors: [
        {
          message: `The "onChange" prop for DataListCheck has been updated so that the "_event" parameter is the first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DataListCheck as PFdlc } from '@patternfly/react-core'; <PFdlc onChange={(checked) => onChange()} />;`,
      output: `import { DataListCheck as PFdlc } from '@patternfly/react-core'; <PFdlc onChange={(_event, checked) => onChange()} />;`,
      errors: [
        {
          message: `The "onChange" prop for PFdlc has been updated so that the "_event" parameter is the first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
