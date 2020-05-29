const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/expandable-rename-expandablesection');

ruleTester.run("expandable-rename-expandablesection", rule, {
  valid: [
    {
      code: `import { ExpandableSection } from '@patternfly/react-core';
        <ExpandableSection toggleText="Show More"></ExpandableSection>`
    },
    {
      code: `import { ExpandableSection as MyComponent } from '@patternfly/react-core';
        <MyComponent toggleText="Show More"></MyComponent>`
    }
  ],
  invalid: [
    {
      code:   `import { Expandable } from '@patternfly/react-core';`,
      output: `import { ExpandableSection } from '@patternfly/react-core';`,
      errors: [{
        message: `Expandable has been renamed to ExpandableSection, update import`,
        type: "ImportSpecifier",
      }]
    },
    {
      code:   `import { Expandable } from '@patternfly/react-core';
        <Expandable toggleText="Show More"></Expandable>`,
      output: `import { ExpandableSection } from '@patternfly/react-core';
        <ExpandableSection toggleText="Show More"></ExpandableSection>`,
      errors: [
        {
          message: `Expandable has been renamed to ExpandableSection, update import`,
          type: "ImportSpecifier",
        },
        {
          message: 'Expandable has been renamed to ExpandableSection, update usage',
          type: "JSXElement"
        }
      ]
    },
  ]
});
