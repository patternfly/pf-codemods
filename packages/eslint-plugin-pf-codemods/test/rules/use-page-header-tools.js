const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/use-page-header-tools');

ruleTester.run("use-page-header-tools", rule, {
  valid: [
    {
      code: `import { PageHeader } from '@patternfly/react-core'; <PageHeader headerTools={<PageHeaderTools  />} />`,
    },
    {    
      // No @patternfly/react-core import
      code: `<PageHeader headerTools={<PageHeaderTools  />} />`,
    }
  ],
  invalid: [
    {
      code:   `import { PageHeader } from '@patternfly/react-core'; <PageHeader avatar={<Avatar />} />`,
      output: `import { PageHeader } from '@patternfly/react-core'; <PageHeader headerTools={<PageHeaderTools> <Avatar  /> </PageHeaderTools>} />`,
      errors: [{
        message: `avatar prop was removed. Nest the Avatar component in the PageHeaderTools component instead, which is passed into PageHeader via the headerTools prop.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { PageHeader } from '@patternfly/react-core'; <PageHeader toolbar={<Toolbar> <ToolbarGroup> <ToolbarItem  /> </ToolbarGroup> </Toolbar>} />`,
      output: `import { PageHeader } from '@patternfly/react-core'; <PageHeader headerTools={<PageHeaderTools> <PageHeaderToolsGroup> <PageHeaderToolsItem /> </PageHeaderToolsGroup> </PageHeaderTools>} />`,
      errors: [{
        message: `If you previously used the Toolbar, ToolbarGroup, or ToolbarItem components for the header, replace them with the PageHeaderTools, PageHeaderToolsGroup, and PageHeaderToolsItem components.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
