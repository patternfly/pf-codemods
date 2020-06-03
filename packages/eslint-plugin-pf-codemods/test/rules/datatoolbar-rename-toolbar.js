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
      code: `import { DataToolbar } from '@patternfly/react-core';
        <DataToolbar></DataToolbar>`,
      output: `import { Toolbar } from '@patternfly/react-core';
        <Toolbar data-codemods="true"></Toolbar>`,
      errors: [
        {
          message: `DataToolbar has been replaced with Toolbar`,
          type: "ImportSpecifier",
        },
        {
          message: `DataToolbar has been replaced with Toolbar`,
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
