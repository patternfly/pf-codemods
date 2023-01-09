const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/pagination-rename-props");

ruleTester.run("pagination-rename-props", rule, {
  valid: [
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Pagination currPage paginationTitle optionsToggle paginationTitle toFirstPage toLastPage toNextPage toPreviousPage defaultToFullPage perPageComponenet />`,
    },
  ],
  invalid: [
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination currPage="Text" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination currPageAriaLabel="Text" />`,
      errors: [
        {
          message: `currPage prop for Pagination has been renamed to currPageAriaLabel`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination paginationTitle="Text" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination paginationAriaLabel="Text" />`,
      errors: [
        {
          message: `paginationTitle prop for Pagination has been renamed to paginationAriaLabel`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination toFirstPage="Text" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination toFirstPageAriaLabel="Text" />`,
      errors: [
        {
          message: `toFirstPage prop for Pagination has been renamed to toFirstPageAriaLabel`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination toLastPage="Text" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination toLastPageAriaLabel="Text" />`,
      errors: [
        {
          message: `toLastPage prop for Pagination has been renamed to toLastPageAriaLabel`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination toNextPage="Text" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination toNextPageAriaLabel="Text" />`,
      errors: [
        {
          message: `toNextPage prop for Pagination has been renamed to toNextPageAriaLabel`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination toPreviousPage="Text" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination toPreviousPageAriaLabel="Text" />`,
      errors: [
        {
          message: `toPreviousPage prop for Pagination has been renamed to toPreviousPageAriaLabel`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination optionsToggle="Text" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination optionsToggleAriaLabel="Text" />`,
      errors: [
        {
          message: `optionsToggle prop for Pagination has been renamed to optionsToggleAriaLabel`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination defaultToFullPage />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination isLastFullPageShown />`,
      errors: [
        {
          message: `defaultToFullPage prop for Pagination has been renamed to isLastFullPageShown`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination perPageComponenet="div" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination  />`,
      errors: [
        {
          message: `perPageComponenet prop for Pagination has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
