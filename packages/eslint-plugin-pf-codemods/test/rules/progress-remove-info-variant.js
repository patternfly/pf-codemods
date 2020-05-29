const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/progress-remove-info-variant');

ruleTester.run("progress-remove-info-variant", rule, {
  valid: [
    {
      code: `import { Progress } from '@patternfly/react-core'; <Progress variant="default" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Progress variant="info" />`,
    }
  ],
  invalid: [
    {
      code:   `import { Progress } from '@patternfly/react-core'; <Progress variant="info" />`,
      output: `import { Progress } from '@patternfly/react-core'; <Progress  />`,
      errors: [{
        message: `info variant which adds no styling has been removed for Progress. Don't pass this prop`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Progress, ProgressVariant } from '@patternfly/react-core'; <Progress variant={ProgressVariant.info} />`,
      output: `import { Progress, ProgressVariant } from '@patternfly/react-core'; <Progress  />`,
      errors: [{
        message: `info variant which adds no styling has been removed for Progress. Don't pass this prop`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
