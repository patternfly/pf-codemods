const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/select-rename-isExpanded');

ruleTester.run("select-rename-isExpanded", rule, {
  valid: [
    {
      code: `import { Select } from '@patternfly/react-core'; <Select isOpen />`,
    },
    {
      // No @patternfly/react-core import
      code: ` <Select isExpanded />`,
    },
    {
      code: `import { Select } from '@patternfly/react-core'; <Select isOpen={true} />`,
    },
  ],
  invalid: [
    {
      code:   `import { Select } from '@patternfly/react-core'; <Select isExpanded />`,
      output: `import { Select } from '@patternfly/react-core'; <Select isOpen />`,
      errors: [{
        message: "isExpanded prop for Select has been renamed to isOpen",
        type: "JSXOpeningElement",
      }]
    },
    // With prop value
    {
      code:   `import { Select } from '@patternfly/react-core'; <Select isExpanded={myVar} />`,
      output: `import { Select } from '@patternfly/react-core'; <Select isOpen={myVar} />`,
      errors: [{
        message: "isExpanded prop for Select has been renamed to isOpen",
        type: "JSXOpeningElement",
      }]
    }
  ]
});
