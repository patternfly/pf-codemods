const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/pagination-rename-toggleTemplateProps');

ruleTester.run("pagination-rename-toggleTemplateProps", rule, {
  valid: [
    {
      code: `import { Pagination, PaginationToggleTemplateProps } from '@patternfly/react-core'; <Pagination />`,
    },
    {
      code: `import { Pagination, PaginationToggleTemplateProps } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Pagination ToggleTemplateProps />`,
    }
  ],
  invalid: [
    {
      code:   `import { Pagination, ToggleTemplateProps } from '@patternfly/react-core'; <Pagination toggleTemplate="string-test" />`,
      output: `import { Pagination, PaginationToggleTemplateProps } from '@patternfly/react-core'; <Pagination toggleTemplate="string-test" />`,
      errors: [
        {
          message: "ToggleTemplateProps has been renamed to PaginationToggleTemplateProps.",
          type: "ImportDeclaration",
        }
      ]
    },
    {
      code:   `import { Pagination, ToggleTemplateProps } from '@patternfly/react-core'; <Pagination toggleTemplate={({firstIndex, lastIndex}: ToggleTemplateProps) => <div>function test</div>} />`,
      output: `import { Pagination, PaginationToggleTemplateProps } from '@patternfly/react-core'; <Pagination toggleTemplate={({firstIndex, lastIndex}: PaginationToggleTemplateProps) => <div>function test</div>} />`,
      errors: [
        {
          message: "ToggleTemplateProps has been renamed to PaginationToggleTemplateProps.",
          type: "ImportDeclaration",
        },
        {
          message: "ToggleTemplateProps has been renamed to PaginationToggleTemplateProps.",
          type: "JSXOpeningElement",
        }
      ]
    },
    {
      code:   `import { Pagination, ToggleTemplateProps } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination toggleTemplate={({firstIndex, lastIndex}: ToggleTemplateProps) => <div>function test</div>} />`,
      output: `import { Pagination, PaginationToggleTemplateProps } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination toggleTemplate={({firstIndex, lastIndex}: PaginationToggleTemplateProps) => <div>function test</div>} />`,
      errors: [
        {
          message: "ToggleTemplateProps has been renamed to PaginationToggleTemplateProps.",
          type: "ImportDeclaration",
        },
        {
          message: "ToggleTemplateProps has been renamed to PaginationToggleTemplateProps.",
          type: "JSXOpeningElement",
        }
      ]
    }
  ]
});
