const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/page-rename-props");

ruleTester.run("page-rename-props", rule, {
  valid: [
    {
      code: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar isSidebarOpen />`,
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton isSidebarOpen onSidebarToggle />`,
    },
    // No @patternfly/react-core import
    {
      code: `<PageSidebar isNavOpen />`,
    },
    // No @patternfly/react-core import
    {
      code: `<PageToggleButton onNavToggle isNavOpen />`,
    },
  ],
  invalid: [
    {
      code: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar isNavOpen />`,
      output: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar isSidebarOpen />`,
      errors: [
        {
          message: `isNavOpen prop for PageSidebar has been renamed to isSidebarOpen`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSidebar as PFPageSidebar } from '@patternfly/react-core'; <PFPageSidebar isNavOpen />`,
      output: `import { PageSidebar as PFPageSidebar } from '@patternfly/react-core'; <PFPageSidebar isSidebarOpen />`,
      errors: [
        {
          message: `isNavOpen prop for PFPageSidebar has been renamed to isSidebarOpen`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton isNavOpen />`,
      output: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton isSidebarOpen />`,
      errors: [
        {
          message: `isNavOpen prop for PageToggleButton has been renamed to isSidebarOpen`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton onNavToggle />`,
      output: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton onSidebarToggle />`,
      errors: [
        {
          message: `onNavToggle prop for PageToggleButton has been renamed to onSidebarToggle`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton as PFPTButton } from '@patternfly/react-core'; <PFPTButton onNavToggle />`,
      output: `import { PageToggleButton as PFPTButton } from '@patternfly/react-core'; <PFPTButton onSidebarToggle />`,
      errors: [
        {
          message: `onNavToggle prop for PFPTButton has been renamed to onSidebarToggle`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
