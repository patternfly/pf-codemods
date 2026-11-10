const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/datePicker-warn-appendTo-default-value-changed');

ruleTester.run("datePicker-warn-appendTo-default-value-changed", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<DatePicker />`,
    }
  ],
  invalid: [
    {
      code:   `import { DatePicker } from '@patternfly/react-core'; <DatePicker />`,
      output: null,
      errors: [{
        message: 'The default value of the DatePicker prop "appendTo" has been updated to a value of "inline" and may cause markup changes that require updating selectors used in tests.',
      }]
    },
    {
      code:   `import { DatePicker } from '@patternfly/react-core/dist/esm/components/DatePicker/index.js'; <DatePicker />`,
      output: null,
      errors: [{
        message: 'The default value of the DatePicker prop "appendTo" has been updated to a value of "inline" and may cause markup changes that require updating selectors used in tests.',
      }]
    }
  ]
});
