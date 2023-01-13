const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/spinner-svg-default');

ruleTester.run("spinner-svg-default", rule, {
  valid: [
    {
      code: `import { Spinner } from '@patternfly/react-core'; <Spinner />`,
    },
    {
      code: `import { Spinner } from '@patternfly/react-core'; <Spinner isSVG={false} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Spinner isSVG />`,
    }
  ],
  invalid: [
    {
      code:   `import { Spinner } from '@patternfly/react-core'; <Spinner isSVG />`,
      output: `import { Spinner } from '@patternfly/react-core'; <Spinner  />`,
      errors: [{
        message: `Spinner isSVG prop default value has changed from false to true.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Spinner } from '@patternfly/react-core'; <Spinner isSVG={true} />`,
      output: `import { Spinner } from '@patternfly/react-core'; <Spinner  />`,
      errors: [{
        message: `Spinner isSVG prop default value has changed from false to true.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
