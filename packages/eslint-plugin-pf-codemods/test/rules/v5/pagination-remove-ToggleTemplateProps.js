const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/pagination-remove-ToggleTemplateProps');

ruleTester.run("pagination-remove-ToggleTemplateProps", rule, {
  valid: [
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination PaginationToggleTemplateProps />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Pagination ToggleTemplateProps />`,
    }
  ],
  invalid: [
    {
      code:   `import { Pagination } from '@patternfly/react-core'; <Pagination ToggleTemplateProps />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination PaginationToggleTemplateProps />`,
      errors: [{
        message: `ToggleTemplateProps prop for Pagination has been renamed to PaginationToggleTemplateProps`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
