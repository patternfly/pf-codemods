const ruleTester = require("./ruletester");
const rule = require("../../lib/rules/use-page-header-tools");

ruleTester.run("card-rename-components", rule, {
  valid: [
    {
      code: `import { Page, PageHeader, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
<Page>
  <PageHeader data-codemods="true" header-tools={
    <PageHeaderTools>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem />
      </PageHeaderToolsGroup>
    </PageHeaderTools>
  } 
  />
</Page>`
    },
    {
      // no @patternfly import
      code: `
<Page>
  <PageHeader data-codemods="true" header-tools={
    <PageHeaderTools>
      <PageHeaderToolsGroup>
      <PageHeaderToolsItem />
    </PageHeaderToolsGroup>
  </PageHeaderTools>
}
/>
</Page>`
    }
  ],
  invalid: [
    {
      code: `import { Page, PageHeader, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
<Page>
  <PageHeader toolbar={
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem />
      </ToolbarGroup>
    </Toolbar>
  }
  />
</Page>`,
      output: `import { Page, PageHeader, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
<Page>
  <PageHeader data-codemods="true" headerTools={
    <PageHeaderTools>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem />
      </PageHeaderToolsGroup>
    </PageHeaderTools>
  }
  />
</Page>`,
      errors: [
        {
          message: 'add missing imports CardTitle, CardHeaderMain from @patternfly/react-core',
          type: 'ImportSpecifier'
        },
        {
          message: "PageHeader has replaced toolbar prop with headerTools",
          type: "JSXIdentifier"
        },
        {
          message: "Toolbar renamed to PageHeaderTools",
          type: "JSXIdentifier"
        },
        {
          message: "ToolbarGroup renamed to PageHeaderToolsGroup",
          type: "JSXIdentifier"
        },
        {
          message: "ToolbarItem renamed to PageHeaderToolsItem",
          type: "JSXIdentifier"
        },
        {
          message: "ToolbarGroup renamed to PageHeaderToolsGroup",
          type: "JSXIdentifier"
        },
        {
          message: "Toolbar renamed to PageHeaderTools",
          type: "JSXIdentifier"
        },
      ]
    },
    {
      code: `import { Avatar, PageHeader } from '@patternfly/react-core';
            <PageHeader avatar={<Avatar  />} />`,
      output: `import { Card, PageHeader, PageHeaderTools } from '@patternfly/react-core';
            <PageHeader headerTools={<PageHeaderTools> <Avatar  /> </PageHeaderTools>} />`,
      errors: [
        {
          message: "avatar prop has been removed for PageHeader",
          type: "JSXIdentifier"
        },
      ]
    }
  ]
});
