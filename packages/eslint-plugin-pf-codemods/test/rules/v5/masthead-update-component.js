const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/masthead-update-component');

ruleTester.run("masthead-update-component", rule, {
  valid: [
    {
      code: `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand component="div" />`,
    },
    {
      code: `import { MastheadBrand } from '@patternfly/react-core/dist/esm/components/Masthead/index.js'; <MastheadBrand component="div" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<MastheadBrand />`,
    }
  ],
  invalid: [
    {
      code:   `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand />`,
      output: `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand component="a" />`,
      errors: [{
        message: 'The default MastheadBrand component type has be updated to switch between an anchor, button, and span based on whether a href, onClick or neither are present.',
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { MastheadBrand } from '@patternfly/react-core/dist/esm/components/Masthead/index.js'; <MastheadBrand />`,
      output: `import { MastheadBrand } from '@patternfly/react-core/dist/esm/components/Masthead/index.js'; <MastheadBrand component="a" />`,
      errors: [{
        message: 'The default MastheadBrand component type has be updated to switch between an anchor, button, and span based on whether a href, onClick or neither are present.',
        type: "JSXOpeningElement",
      }]
    },
  ]
});
