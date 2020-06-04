const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/datatoolbar-rename-toolbar');

ruleTester.run("datatoolbar-rename-toolbar", rule, {
  valid: [
    {
      code: `import { Toolbar } from '@patternfly/react-core';
        <Toolbar></Toolbar>`,
    }
  ],
  invalid: [
    {
      code: `import { DataToolbar, DataToolbarContent, DataToolbarGroup, DataToolbarItem } from '@patternfly/react-core';
        <DataToolbar>
          <DataToolbarContent>
            <DataToolbarGroup>
              <DataToolbarItem></DataToolbarItem>
            </DataToolbarGroup>
          </DataToolbarContent>
        </DataToolbar>`,
      output: `import { Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
        <Toolbar data-codemods="true">
          <ToolbarContent>
            <ToolbarGroup data-codemods="true">
              <ToolbarItem data-codemods="true"></ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>`,
      errors: [
        {
          message: `DataToolbar has been replaced with Toolbar`,
          type: "ImportSpecifier",
        },
        {
          message: `DataToolbarContent has been replaced with ToolbarContent`,
          type: "ImportSpecifier",
        },
        {
          message: `DataToolbarGroup has been replaced with ToolbarGroup`,
          type: "ImportSpecifier",
        },
        {
          message: `DataToolbarItem has been replaced with ToolbarItem`,
          type: "ImportSpecifier",
        },
        {
          message: `DataToolbar has been replaced with Toolbar`,
          type: "JSXIdentifier",
        },
        {
          message: `DataToolbarContent has been replaced with ToolbarContent`,
          type: "JSXIdentifier",
        },
        {
          message: `DataToolbarGroup has been replaced with ToolbarGroup`,
          type: "JSXIdentifier",
        },
        {
          message: `DataToolbarItem has been replaced with ToolbarItem`,
          type: "JSXIdentifier",
        },
        {
          message: `DataToolbarItem has been replaced with ToolbarItem`,
          type: "JSXIdentifier",
        },
        {
          message: `DataToolbarGroup has been replaced with ToolbarGroup`,
          type: "JSXIdentifier",
        },
        {
          message: `DataToolbarContent has been replaced with ToolbarContent`,
          type: "JSXIdentifier",
        },
        {
          message: `DataToolbar has been replaced with Toolbar`,
          type: "JSXIdentifier",
        }
      ]
    },
    {
      code: `import { DataToolbar as MyComponent } from '@patternfly/react-core';
        <MyComponent></MyComponent>`,
      output: `import { Toolbar as MyComponent } from '@patternfly/react-core';
        <MyComponent></MyComponent>`,
      errors: [{
        message: `DataToolbar has been replaced with Toolbar`,
        type: "ImportSpecifier",
      }]
    }
  ]
});
