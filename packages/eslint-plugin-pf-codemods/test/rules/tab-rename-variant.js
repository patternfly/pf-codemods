const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/tab-rename-variant');

ruleTester.run("tab-rename-variant", rule, {
  valid: [
    {
      code: `import { Tabs, TabsComponent } from '@patternfly/react-core'; <Tabs component={TabsComponent.nav} />`,
    }
  ],

  invalid: [
    {
      code: `import { Tabs, TabsVariant } from '@patternfly/react-core'; 
<Tabs variant={TabsVariant.nav} />; 
<Tabs variant={TabsVariant.nav} />;`,
      output: `import { Tabs, TabsComponent } from '@patternfly/react-core'; 
<Tabs component={TabsComponent.nav} />; 
<Tabs component={TabsComponent.nav} />;`,
      errors: [
        {
        message: 'TabsVariant enum for Tabs has been renamed to TabsComponent',
        type: "JSXIdentifier"
        },
        {
        message: 'variant prop for Tabs has been renamed to component',
        type: "JSXOpeningElement"
        }
    ]
    },
    
  ]
});
