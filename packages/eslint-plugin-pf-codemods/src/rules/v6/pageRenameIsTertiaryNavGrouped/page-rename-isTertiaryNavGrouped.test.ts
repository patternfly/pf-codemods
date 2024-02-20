const ruleTester = require('../../ruletester');
import * as rule from './page-rename-isTertiaryNavGrouped';

ruleTester.run("page-rename-isTertiaryNavGrouped", rule, {
  valid: [
    {
      code: `<Page isTertiaryNavGrouped />`
    },
    {
      code: `import { Page } from '@patternfly/react-core'; <Page someOtherProp />`
    }
  ],
  invalid: [
    {
      code:   `import { Page } from '@patternfly/react-core'; <Page isTertiaryNavGrouped />`,
      output: `import { Page } from '@patternfly/react-core'; <Page isHorizontalSubnavGrouped />`,
      errors: [{
        message: `We've renamed the \`isTertiaryNavGrouped\` prop to \`isHorizontalSubnavGrouped\`.`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
  