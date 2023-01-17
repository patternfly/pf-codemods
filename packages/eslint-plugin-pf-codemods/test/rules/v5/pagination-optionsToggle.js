const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/pagination-optionsToggle');

ruleTester.run("pagination-optionsToggle", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<OptionsToggle />`,
    }
  ],
  invalid: [
    {
      code:   `import { OptionsToggle } from '@patternfly/react-core'; <OptionsToggle />`,
      output: `import { OptionsToggle } from '@patternfly/react-core'; <OptionsToggle />`,
      errors: [{
        message: `OptionsToggle has been removed and MenuToggle should be used instead. PaginationOptionsMenu has been refactored to use MenuToggle.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
