const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/pagination-rename-props");

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
      code: `import { Pagination } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination titles={{items: "test"}} />`,
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
    {
      code: `import { Pagination } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination perPageComponent="div" />`,
      output: `import { Pagination } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination  />`,
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
    ...Object.keys(updatedTitlesPropNames).map((titlesPropName) => ({
      code: `import { Pagination } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination defaultToFullPage perPageComponent="div" titles={{${titlesPropName}: "test"}} />`,
      output: `import { Pagination } from '@patternfly/react-core/dist/esm/components/Pagination/index.js'; <Pagination isLastFullPageShown  titles={{${updatedTitlesPropNames[titlesPropName]}: "test"}} />`,
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
    ...Object.keys(updatedTitlesPropNames).map((oldName) => ({
      code: `import * as React from "react";
      import { Pagination } from "@patternfly/react-core";
      
      let titlesObject = {
        ${oldName}: "test",
      };
      
      titlesObject.${oldName} = "test";
      titlesObject["${oldName}"] = "test";
      titlesObject = {
        ${oldName}: "test",
      };
      
      <Pagination titles={titlesObject} />;
      `,
      output: `import * as React from "react";
      import { Pagination } from "@patternfly/react-core";
      
      let titlesObject = {
        ${updatedTitlesPropNames[oldName]}: "test",
      };
      
      titlesObject.${updatedTitlesPropNames[oldName]} = "test";
      titlesObject["${updatedTitlesPropNames[oldName]}"] = "test";
      titlesObject = {
        ${updatedTitlesPropNames[oldName]}: "test",
      };
      
      <Pagination titles={titlesObject} />;
      `,
      errors: [
        {
          message: `The "${oldName}" sub-prop for Pagination's "titles" prop has been renamed to "${updatedTitlesPropNames[oldName]}".`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...Object.keys(updatedTitlesPropNames).map((oldName) => ({
      code: `import * as React from "react";
      import { Pagination } from "@patternfly/react-core";
      
      const ${oldName} = "test";
      const titlesObject2 = {${oldName}};
      
      <Pagination titles={titlesObject2} />;`,
      output: `import * as React from "react";
      import { Pagination } from "@patternfly/react-core";
      
      const ${updatedTitlesPropNames[oldName]} = "test";
      const titlesObject2 = {${updatedTitlesPropNames[oldName]}};
      
      <Pagination titles={titlesObject2} />;`,
      errors: [
        {
          message: `The "${oldName}" sub-prop for Pagination's "titles" prop has been renamed to "${updatedTitlesPropNames[oldName]}".`,
          type: "JSXOpeningElement",
        },
      ],
    })),
  ],
});
