const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/rename-toolbar-components');

ruleTester.run("rename-toolbar-components", rule, {
  valid: [
    {
      code: `import { PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
      <PageHeaderTools>
        <PageHeaderToolsGroup>
          <PageHeaderToolsItem />
        </PageHeaderToolsGroup>
      </PageHeaderTools>
      `,
    },
    {
      // No @patternfly/react-core import
      code: `
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem />
        </ToolbarGroup>
      </Toolbar>
    `
    }
  ],
  invalid: [
    {
      code:   `
      import { Page, PageHeader, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
      <Page>
        <PageHeader toolbar={
          <Toolbar>
            <ToolbarGroup>
              <ToolbarItem />
            </ToolbarGroup>
          </Toolbar>
        }
        />
      </Page>
      `,
      output: `
      import { Page, PageHeader, Toolbar, ToolbarGroup, ToolbarItem, PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem } from '@patternfly/react-core';
      <Page>
        <PageHeader toolbar={
          <PageHeaderTools>
            <PageHeaderToolsGroup>
              <PageHeaderToolsItem />
            </PageHeaderToolsGroup>
          </PageHeaderTools>
        }
        />
      </Page>
      `,
      errors: [
        {
          message: `add missing imports PageHeaderTools, PageHeaderToolsGroup, PageHeaderToolsItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Toolbar has been replaced with PageHeaderTools`,
          type: "JSXIdentifier",
        },
        {
          message: `ToolbarGroup has been replaced with PageHeaderToolsGroup`,
          type: "JSXIdentifier",
        },
        {
          message: `ToolbarItem has been replaced with PageHeaderToolsItem`,
          type: "JSXIdentifier",
        },
        {
          message: `ToolbarGroup has been replaced with PageHeaderToolsGroup`,
          type: "JSXIdentifier",
        },
        {
          message: `Toolbar has been replaced with PageHeaderTools`,
          type: "JSXIdentifier",
        },
      ]
    },
  ]
});
