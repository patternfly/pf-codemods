const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/form-fix-isValid');

ruleTester.run("form-fix-isValid", rule, {
  valid: [
    {
      code: `VALID_CODE_HERE`,
    }
  ],
  invalid: [
    {
      code:   `import { FormGroup } from '@patternfly/react-core'; <FormGroup isValid={true} />`,
      output: `import { FormGroup } from '@patternfly/react-core'; <FormGroup validated="default" />`,
      errors: [{
        message: `isValid prop has been replaced with validated={'default' | 'error' | 'success'}`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { FormGroup } from '@patternfly/react-core'; <FormGroup isValid={false} />`,
      output: `import { FormGroup } from '@patternfly/react-core'; <FormGroup validated="error" />`,
      errors: [{
        message: `isValid prop has been replaced with validated={'default' | 'error' | 'success'}`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { FormGroup } from '@patternfly/react-core'; <FormGroup isValid />`,
      output: `import { FormGroup } from '@patternfly/react-core'; <FormGroup validated="default" />`,
      errors: [{
        message: `isValid prop has been replaced with validated={'default' | 'error' | 'success'}`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { FormGroup } from '@patternfly/react-core'; <FormGroup isValid={cond} />`,
      output: `import { FormGroup } from '@patternfly/react-core'; <FormGroup validated={(cond) ? 'default' : 'error'} />`,
      errors: [{
        message: `isValid prop has been replaced with validated={'default' | 'error' | 'success'}`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
