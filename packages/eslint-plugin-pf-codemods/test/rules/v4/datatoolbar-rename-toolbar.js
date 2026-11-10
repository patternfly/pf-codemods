const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/datatoolbar-rename-toolbar');

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
        },
        {
          message: `DataToolbarContent has been replaced with ToolbarContent`,
        },
        {
          message: `DataToolbarGroup has been replaced with ToolbarGroup`,
        },
        {
          message: `DataToolbarItem has been replaced with ToolbarItem`,
        },
        {
          message: `DataToolbar has been replaced with Toolbar`,
        },
        {
          message: `DataToolbarContent has been replaced with ToolbarContent`,
        },
        {
          message: `DataToolbarGroup has been replaced with ToolbarGroup`,
        },
        {
          message: `DataToolbarItem has been replaced with ToolbarItem`,
        },
        {
          message: `DataToolbarItem has been replaced with ToolbarItem`,
        },
        {
          message: `DataToolbarGroup has been replaced with ToolbarGroup`,
        },
        {
          message: `DataToolbarContent has been replaced with ToolbarContent`,
        },
        {
          message: `DataToolbar has been replaced with Toolbar`,
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
      }]
    }
  ]
});
