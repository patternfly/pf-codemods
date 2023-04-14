const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/pageSidebar-update-api");

ruleTester.run("pageSidebar-update-api", rule, {
  valid: [
    {
      code: `import { PageSidebar, PageSidebarBody } from '@patternfly/react-core'; <PageSidebar><PageSidebarBody>Content</PageSidebarBody></PageSidebar>`,
    },
    // No @patternfly/react-core import
    {
      code: `<PageSidebar nav="Content" />`,
    },
  ],
  invalid: [
    {
      code: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar nav="Content" />`,
      output: `import { PageSidebar, PageSidebarBody } from '@patternfly/react-core'; <PageSidebar  >
<PageSidebarBody>
Content
</PageSidebarBody>
</PageSidebar>`,
      errors: [
        {
          message: `The PageSidebar API has been updated and our new PageSidebarBody sub-component should be wrapped around the PageSidebar content.`,
          type: "ImportDeclaration",
        },
        {
          message: `The PageSidebar API has been updated and the "nav" prop has been renamed to "children". Our new PageSidebarBody sub-component should also be wrapped around the content passed as children to PageSidebar.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      // Retains non-"nav" props
      code: `import { PageSidebar } from '@patternfly/react-core'; <PageSidebar theme="dark" isOtherProp={true} nav="Content" />`,
      output: `import { PageSidebar, PageSidebarBody } from '@patternfly/react-core'; <PageSidebar theme="dark" isOtherProp={true} >
<PageSidebarBody>
Content
</PageSidebarBody>
</PageSidebar>`,
      errors: [
        {
          message: `The PageSidebar API has been updated and our new PageSidebarBody sub-component should be wrapped around the PageSidebar content.`,
          type: "ImportDeclaration",
        },
        {
          message: `The PageSidebar API has been updated and the "nav" prop has been renamed to "children". Our new PageSidebarBody sub-component should also be wrapped around the content passed as children to PageSidebar.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
