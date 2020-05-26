const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/rename-noPadding');

ruleTester.run("rename-noPadding", rule, {
  valid: [
    {
      code: `import { DataListContent } from '@patternfly/react-core'; <DataListContent hasNoPadding />`,
    }
  ],
  invalid: [
    {
      code:   `import { DataListContent } from '@patternfly/react-core'; <DataListContent noPadding />`,
      output: `import { DataListContent } from '@patternfly/react-core'; <DataListContent hasNoPadding />`,
      errors: [{
        message: `noPadding prop for DataListContent has been renamed to hasNoPadding`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { DrawerHead } from '@patternfly/react-core'; <DrawerHead noPadding="true" />`,
      output: `import { DrawerHead } from '@patternfly/react-core'; <DrawerHead hasNoPadding="true" />`,
      errors: [{
        message: `noPadding prop for DrawerHead has been renamed to hasNoPadding`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { DrawerPanelBody } from '@patternfly/react-core'; <DrawerPanelBody noPadding={false} />`,
      output: `import { DrawerPanelBody } from '@patternfly/react-core'; <DrawerPanelBody hasNoPadding={false} />`,
      errors: [{
        message: `noPadding prop for DrawerPanelBody has been renamed to hasNoPadding`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { PageSection } from '@patternfly/react-core'; <PageSection noPadding={true} />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection hasNoPadding={true} />`,
      errors: [{
        message: `noPadding prop for PageSection has been renamed to hasNoPadding`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
