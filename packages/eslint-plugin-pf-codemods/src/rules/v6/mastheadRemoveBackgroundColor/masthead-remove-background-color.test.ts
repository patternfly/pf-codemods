const ruleTester = require('../../ruletester');
import * as rule from './masthead-remove-background-color';

ruleTester.run("masthead-remove-background-color", rule, {
  valid: [
    {
      code: `<Masthead backgroundColor />`
    }
  ],
  invalid: [
    {
      code:   `import { Masthead } from '@patternfly/react-core'; <Masthead backgroundColor />`,
      output: `import { Masthead } from '@patternfly/react-core'; <Masthead  />`,
      errors: [{
        message: `We've removed the \`backgroundColor\` prop from Masthead as theming is no longer handled React-side.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
  