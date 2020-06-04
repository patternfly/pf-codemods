const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/tab-title-text');

ruleTester.run("tab-title-text", rule, {
  valid: [
    {
      code: `import { Tab, TabTitleText, TabTitleIcon } from '@patternfly/react-core'; <Tab title={<TabTitleText>Title</TabTitleText>}>Content</Tab>`,
    },
    {
      // No @patternfly/react-core import
      code: `<Tab title="Non-PF component">Content</Tab>`,
    }
  ],
  invalid: [
    {
      code:   `import { Tab } from '@patternfly/react-core';
<Tab title="Title">Content</Tab>;
<Tab title="Title">Content</Tab>;
<Tab title={<UsersIcon />}>Content</Tab>;
<Tab title={<><UsersIcon /> Text</>}>Content</Tab>;`,
      output: `import { Tab, TabTitleText, TabTitleIcon } from '@patternfly/react-core';
<Tab title={<TabTitleText>Title</TabTitleText>}>Content</Tab>;
<Tab title={<TabTitleText>Title</TabTitleText>}>Content</Tab>;
<Tab title={<TabTitleIcon><UsersIcon /></TabTitleIcon>}>Content</Tab>;
<Tab title={<><TabTitleIcon><UsersIcon /></TabTitleIcon><TabTitleText> Text</TabTitleText></>}>Content</Tab>;`,
      errors: [
        {
          message: 'add missing imports TabTitleText, TabTitleIcon from @patternfly/react-core',
          type: "ImportDeclaration"
        },
        {
          message: `title needs to be wrapped with the TabTitleText and/or TabTitleIcon component`,
          type: "JSXOpeningElement",
        },
        {
          message: `title needs to be wrapped with the TabTitleText and/or TabTitleIcon component`,
          type: "JSXOpeningElement",
        },
        {
          message: `title needs to be wrapped with the TabTitleText and/or TabTitleIcon component`,
          type: "JSXOpeningElement",
        },
        {
          message: `title needs to be wrapped with the TabTitleText and/or TabTitleIcon component`,
          type: "JSXOpeningElement",
        }
      ]
    },
  ]
});
