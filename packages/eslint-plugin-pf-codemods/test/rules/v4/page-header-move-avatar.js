const ruleTester = require('../../ruletester');
const rule = require("../../../lib/rules/v4/page-header-move-avatar");

ruleTester.run("page-header-move-avatar", rule, {
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
    },
    {
      code: `import { Avatar, PageHeader, PageHeaderTools } from '@patternfly/react-core'; <PageHeader avatar={<Avatar />} headerTools={<PageHeaderTools></PageHeaderTools>} />`,
      output: `import { Avatar, PageHeader, PageHeaderTools } from '@patternfly/react-core'; <PageHeader  headerTools={<PageHeaderTools><Avatar /></PageHeaderTools>} />`,
      errors: [
        {
          message: 'avatar prop was removed from PageHeader, move the avatar component into PageHeaderTools',
          type: 'JSXElement'
        }
      ]
    },
  ]
});
