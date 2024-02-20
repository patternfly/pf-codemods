const ruleTester = require('../../ruletester');
import * as rule from './page-rename-tertiaryNav';

ruleTester.run("page-rename-tertiaryNav", rule, {
  valid: [
    {
      code: `<Page tertiaryNav />`
    },
    {
      code: `import { Page } from '@patternfly/react-core'; <Page someOtherProp />`
    }
  ],
  invalid: [
    {
      code:   `import { Page } from '@patternfly/react-core'; <Page tertiaryNav />`,
      output: `import { Page } from '@patternfly/react-core'; <Page horizontalSubnav />`,
      errors: [{
        message: `We've renamed the \`tertiaryNav\` prop to \`horizontalSubnav\`.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
  