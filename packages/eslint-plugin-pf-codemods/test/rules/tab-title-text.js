const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/tab-title-text');

ruleTester.run("tab-title-text", rule, {
  valid: [
    {
      code: `import { Tab } from '@patternfly/react-core'; <Tab title={<TabTitleText>Title</TabTitleText>}>Content</Tab>`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tab title="Non-PF component">Content</Tab>`,
    }
  ],
  invalid: [
    {
      code:   `import { Tab } from '@patternfly/react-core'; <Tab title="Title">Content</Tab>`,
      output: `import { Tab } from '@patternfly/react-core'; <Tab title={<TabTitleText>Title</TabTitleText>}>Content</Tab>`,
      errors: [{
        message: `title needs to be wrapped with the TabTitleText and/or TabTitleIcon component`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
