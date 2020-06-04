const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/page-header-prop-rename');

ruleTester.run("page-header-prop-rename", rule, {
  valid: [
    {
      code: `import { PageHeader } from '@patternfly/react-core'; <PageHeader headerTools="tools" />`,
    },
    {
      // no @patternfly import
      code: `<PageHeader toolbar="tools" />`}
  ],
  invalid: [
    {
      code:   `import { PageHeader } from '@patternfly/react-core'; <PageHeader toolbar="tools" />`,
      output: `import { PageHeader } from '@patternfly/react-core'; <PageHeader headerTools="tools" />`,
      errors: [{
        message: `toolbar prop has been removed from PageHeader. Use headerTools instead`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
