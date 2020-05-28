const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/pagination-removed-variant');

ruleTester.run("pagination-removed-variant", rule, {
  valid: [
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination variant="top" />`,
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination variant={PaginationVariant.top} />`,
    }
  ],
  invalid: [
    {
      code:   `import { Pagination } from '@patternfly/react-core'; <Pagination variant="left" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination  />`,
      errors: [{
        message: `variant "left" has been removed from Pagination`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Pagination } from '@patternfly/react-core'; <Pagination variant="right" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination  />`,
      errors: [{
        message: `variant "right" has been removed from Pagination`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Pagination, PaginationVariant } from '@patternfly/react-core'; <Pagination variant={PaginationVariant.right} />`,
      output: `import { Pagination, PaginationVariant } from '@patternfly/react-core'; <Pagination  />`,
      errors: [{
        message: `variant {PaginationVariant.right} has been removed from Pagination`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
