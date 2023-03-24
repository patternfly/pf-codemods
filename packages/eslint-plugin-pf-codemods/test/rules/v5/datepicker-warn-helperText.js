const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datepicker-warn-helperText');

ruleTester.run("datepicker-warn-helperText", rule, {
  valid: [
    {
      code: `import { DatePicker } from '@patternfly/react-core'; <DatePicker />`
    },
    {
      // No @patternfly/react-core import
      code: `<DatePicker />`,
    }
  ],
  invalid: [
    {
      code:   `import { DatePicker } from '@patternfly/react-core'; <DatePicker helperText="test" />`,
      output: `import { DatePicker } from '@patternfly/react-core'; <DatePicker helperText="test" />`,
      errors: [{
        message: 'The helperText property now accepts the <HelperText> component.',
        type: "JSXOpeningElement",
      }]
    }
  ]
});
