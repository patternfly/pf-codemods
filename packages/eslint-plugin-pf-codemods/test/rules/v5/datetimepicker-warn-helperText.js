const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datetimepicker-warn-helperText');

ruleTester.run("datetimepicker-warn-helperText", rule, {
  valid: [
    {
      code: `import { DatePicker } from '@patternfly/react-core'; <DatePicker />`
    },
    {
      // No @patternfly/react-core import
      code: `<DatePicker />`,
    },
    {
      // No @patternfly/react-core import
      code: `<TimePicker />`,
    }
  ],
  invalid: [
    {
      code:   `import { DatePicker } from '@patternfly/react-core'; <DatePicker helperText="test" />`,
      output: `import { DatePicker } from '@patternfly/react-core'; <DatePicker helperText="test" />`,
      errors: [{
        message: 'The helperText property now expects a <HelperText> component.',
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { TimePicker } from '@patternfly/react-core'; <TimePicker />`,
      output: `import { TimePicker } from '@patternfly/react-core'; <TimePicker />`,
      errors: [{
        message: 'TimePicker now uses a <HelperText> component for its helper text.',
        type: "ImportDeclaration",
      }]
    }
  ]
});
