const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/skip-to-content-remove-component');

ruleTester.run("skip-to-content-remove-component", rule, {
  valid: [
    {
      code: `import { SkipToContent } from '@patternfly/react-core'; <SkipToContent />`,
    }
  ],
  invalid: [
    {
      code:   `import { SkipToContent } from '@patternfly/react-core'; <SkipToContent component="h1" />`,
      output: `import { SkipToContent } from '@patternfly/react-core'; <SkipToContent  />`,
      errors: [{
        message: `Component prop was removed from SkipToContent in favor of always using an anchor tag`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
