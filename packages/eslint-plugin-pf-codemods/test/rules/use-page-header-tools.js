const ruleTester = require("./ruletester");
const rule = require("../../lib/rules/use-page-header-tools");

ruleTester.run("use-page-header-tools", rule, {
  valid: [
    {
      code: `import { Avatar, PageHeader } from '@patternfly/react-core'; <PageHeader headerTools="tools" />`
    },
    {
      // no @patternfly import
      code: `<PageHeader avatar={<Avatar />} />`
    }
  ],
  invalid: [
    {
      code: `import { Avatar, PageHeader } from '@patternfly/react-core'; <PageHeader avatar={<Avatar />} />`,
      output: `import { Avatar, PageHeader } from '@patternfly/react-core'; <PageHeader /*TODO: move to PageHeaderTools - avatar={<Avatar />}*/ />`,
      errors: [
        {
          message: 'avatar prop was removed from PageHeader, move the avatar component into PageHeaderTools',
          type: 'JSXElement'
        }
      ]
    }
  ]
});
