const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/pagination-rename-props");

const updatedPropNames = {
  perPageComponent: "",
  defaultToFullPage: "isLastPageShown",
};
const updatedTitlesPropNames = {
  currPage: "currPageAriaLabel",
  paginationTitle: "paginationAriaLabel",
  toFirstPage: "toFirstPageAriaLabel",
  toLastPage: "toLastPageAriaLabel",
  toNextPage: "toNextPageAriaLabel",
  toPreviousPage: "toPreviousPageAriaLabel",
  optionsToggle: "optionsToggleAriaLabel",
};

ruleTester.run("pagination-rename-props", rule, {
  valid: [
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination titles={{items: "test"}} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Pagination defaultToFullPage />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Pagination perPageComponent="div" />`,
    },
    // No @patternfly/react-core import
    ...Object.keys(updatedTitlesPropNames).map((titlesPropName) => ({
      code: `<Pagination titles={{${titlesPropName}: "test"}} />`,
    })),
    ,
  ],
  invalid: [
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination defaultToFullPage />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination isLastFullPageShown />`,
      errors: [
        {
          message: `The "defaultToFullPage" prop for Pagination has been renamed to "isLastFullPageShown".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination perPageComponent="div" />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination  />`,
      errors: [
        {
          message: `The "perPageComponent" prop for Pagination has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    ...Object.keys(updatedTitlesPropNames).map((titlesPropName) => ({
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination titles={{${titlesPropName}: "test"}} />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination titles={{${updatedTitlesPropNames[titlesPropName]}: "test"}} />`,
      errors: [
        {
          message: `The "${titlesPropName}" sub-prop for Pagination's "titles" prop has been renamed to "${updatedTitlesPropNames[titlesPropName]}".`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...Object.keys(updatedTitlesPropNames).map((titlesPropName) => ({
      code: `import { Pagination } from '@patternfly/react-core'; <Pagination defaultToFullPage perPageComponent="div" titles={{${titlesPropName}: "test"}} />`,
      output: `import { Pagination } from '@patternfly/react-core'; <Pagination isLastFullPageShown  titles={{${updatedTitlesPropNames[titlesPropName]}: "test"}} />`,
      errors: [
        {
          message: `The "defaultToFullPage" prop for Pagination has been renamed to "isLastFullPageShown".`,
          type: "JSXOpeningElement",
        },
        {
          message: `The "perPageComponent" prop for Pagination has been removed.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The "${titlesPropName}" sub-prop for Pagination's "titles" prop has been renamed to "${updatedTitlesPropNames[titlesPropName]}".`,
          type: "JSXOpeningElement",
        },
      ],
    })),
  ],
});
