const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/alert-new-action');

ruleTester.run("alert-new-action", rule, {
  valid: [
    // {
    //   code: `import { Alert } from '@patternfly/react-core'; <Alert actionClose="Close" />`,
    // }
  ],
  invalid: [
    {
      code:   `import { Alert } from '@patternfly/react-core'; <Alert action={<AlertActionLink>Close</AlertActionLink>} />`,
      output: `import { Alert } from '@patternfly/react-core'; <Alert actionLinks={<AlertActionLink>Close</AlertActionLink>} />`,
      errors: [{
        message: `action prop for Alert has been replaced with actionLinks or actionClose`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Alert } from '@patternfly/react-core'; <Alert action={<AlertActionCloseButton>Close</AlertActionCloseButton>} />`,
      output: `import { Alert } from '@patternfly/react-core'; <Alert actionClose={<AlertActionCloseButton>Close</AlertActionCloseButton>} />`,
      errors: [{
        message: `action prop for Alert has been replaced with actionLinks or actionClose`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
