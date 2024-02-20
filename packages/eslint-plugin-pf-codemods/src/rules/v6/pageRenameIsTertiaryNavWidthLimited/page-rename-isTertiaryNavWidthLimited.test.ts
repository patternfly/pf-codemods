const ruleTester = require('../../ruletester');
import * as rule from './page-rename-isTertiaryNavWidthLimited';

ruleTester.run("page-rename-isTertiaryNavWidthLimited", rule, {
  valid: [
    {
      code: `<Page isTertiaryNavWidthLimited />`
    },
    {
      code: `import { Page } from '@patternfly/react-core'; <Page someOtherProp />`
    }
  ],
  invalid: [
    {
      code:   `import { Page } from '@patternfly/react-core'; <Page isTertiaryNavWidthLimited />`,
      output: `import { Page } from '@patternfly/react-core'; <Page isHorizontalSubnavWidthLimited />`,
      errors: [{
        message: `We've renamed the \`isTertiaryNavWidthLimited\` prop to \`isHorizontalSubnavWidthLimited\`.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
  