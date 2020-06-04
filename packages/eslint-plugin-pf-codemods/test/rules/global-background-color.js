const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/global-background-color');

ruleTester.run("global-background-color", rule, {
  valid: [
    {
      code: `import { global_BackgroundColor_200 } from '@patternfly/react-tokens';`,
    }
  ],
  invalid: [
    {
      code:   `import { global_BackgroundColor_300 } from '@patternfly/react-tokens'; const a = global_BackgroundColor_300;`,
      output: `import { global_BackgroundColor_200 as global_BackgroundColor_300 } from '@patternfly/react-tokens'; const a = global_BackgroundColor_300;`,
      errors: [{
        message: `global_BackgroundColor_300 has been removed. Consider using global_BackgroundColor_200 with its new value #f0f0f0 instead`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { global_BackgroundColor_150 } from '@patternfly/react-tokens'; const a = global_BackgroundColor_150;`,
      output: `import { global_BackgroundColor_200 as global_BackgroundColor_150 } from '@patternfly/react-tokens'; const a = global_BackgroundColor_150;`,
      errors: [{
        message: `global_BackgroundColor_150 has been removed. Consider using global_BackgroundColor_200 with its new value #f0f0f0 instead`,
        type: "ImportDeclaration",
      }]
    },
  ]
});
