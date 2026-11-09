const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datetimepicker-warn-helperText');

ruleTester.run("datetimepicker-warn-helperText", rule, {
  valid: [
    {
      code: `import { DatePicker } from '@patternfly/react-core'; <DatePicker />`
    },
    {
      code: `import { DatePicker } from '@patternfly/react-core/dist/esm/components/DatePicker/index.js'; <DatePicker />`
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
      output: null,
      errors: [{
        message: 'The helperText property now expects a <HelperText> component.',
      }]
    },
    {
      code:   `import { TimePicker } from '@patternfly/react-core'; <TimePicker />`,
      output: null,
      errors: [{
        message: 'TimePicker now uses a <HelperText> component for its helper text.',
      }]
    },
    {
      code:   `import { TimePicker } from '@patternfly/react-core/dist/esm/components/TimePicker/index.js'; import { DatePicker } from '@patternfly/react-core/dist/esm/components/DatePicker/index.js'; <><DatePicker helperText="test" /><TimePicker /></>`,
      output: null,
      errors: [{
        message: 'TimePicker now uses a <HelperText> component for its helper text.',
      },
      {
        message: 'The helperText property now expects a <HelperText> component.',
      }]
    }
  ]
});
