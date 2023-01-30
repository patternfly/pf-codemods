const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/spinner-svg-default');

ruleTester.run("spinner-svg-default", rule, {
  valid: [
    {
      code: `import { Spinner } from '@patternfly/react-core'; <Spinner />`,
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
        message: `Spinner's isSVG prop has been removed. Spinner will now only use SVG.`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Spinner } from '@patternfly/react-core'; <Spinner isSVG={true} />`,
      output: `import { Spinner } from '@patternfly/react-core'; <Spinner  />`,
      errors: [{
        message: `Spinner's isSVG prop has been removed. Spinner will now only use SVG.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
