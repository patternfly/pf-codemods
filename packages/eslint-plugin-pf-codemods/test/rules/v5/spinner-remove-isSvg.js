const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/spinner-remove-isSvg');

ruleTester.run("spinner-remove-isSvg", rule, {
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
        message: `Spinner's isSVG prop has been removed because Spinner now exclusively uses an SVG.`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
