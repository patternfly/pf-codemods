const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/tooltip-remove-props');

ruleTester.run("tooltip-remove-props", rule, {
  valid: [
    {
      code: `import { Tooltip } from '@patternfly/react-core'; <Tooltip />`,
    },
    {
      code: `import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/index.js'; <Tooltip />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tooltip boundary={} tippyProps={} isAppLauncher />`,
    }
  ],
  invalid: [
    {
      code:   `import { Tooltip } from '@patternfly/react-core'; <Tooltip boundary={} tippyProps={} isAppLauncher />`,
      output: `import { Tooltip } from '@patternfly/react-core'; <Tooltip    />`,
      errors: [{
        message: `boundary prop for Tooltip has been removed`,
        type: "JSXOpeningElement",
      },
      {
        message: `tippyProps prop for Tooltip has been removed`,
        type: "JSXOpeningElement",
      },
      {
        message: `isAppLauncher prop for Tooltip has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/index.js'; <Tooltip boundary={} tippyProps={} isAppLauncher />`,
      output: `import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/index.js'; <Tooltip    />`,
      errors: [{
        message: `boundary prop for Tooltip has been removed`,
        type: "JSXOpeningElement",
      },
      {
        message: `tippyProps prop for Tooltip has been removed`,
        type: "JSXOpeningElement",
      },
      {
        message: `isAppLauncher prop for Tooltip has been removed`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
