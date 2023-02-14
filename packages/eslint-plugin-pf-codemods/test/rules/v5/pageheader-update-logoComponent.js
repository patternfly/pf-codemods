const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/pageheader-update-logoComponent');

ruleTester.run("pageheader-update-logoComponent", rule, {
  valid: [
    {
      code: `import { PageHeader } from '@patternfly/react-core'; <PageHeader logoComponent="div" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageHeader />`,
    }
  ],
  invalid: [
    {
      code:   `import { PageHeader } from '@patternfly/react-core'; <PageHeader />`,
      output: `import { PageHeader } from '@patternfly/react-core'; <PageHeader logoComponent="a" />`,
      errors: [{
        message: 'The default PageHeader logoComponent type has be updated to switch between an anchor, button, and span based on whether a href, onClick or neither are present. It is also recommended to use Masthead in place of PageHeader.',
        type: "JSXOpeningElement",
      }]
    }
  ]
});
