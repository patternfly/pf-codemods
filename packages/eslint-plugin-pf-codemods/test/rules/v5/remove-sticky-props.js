const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/remove-sticky-props');

ruleTester.run("remove-sticky-props", rule, {
  valid: [
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageSection sticky="top" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageSection sticky="bottom" />`,
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageNavigation sticky="top" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageNavigation sticky="bottom" />`,
    },
    {
      code: `import { PageGroup } from '@patternfly/react-core'; <PageGroup />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageGroup sticky="top" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageGroup sticky="bottom" />`,
    },
    {
      code: `import { PageBreadcrumb } from '@patternfly/react-core'; <PageBreadcrumb />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageBreadcrumb sticky="top" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<PageBreadcrumb sticky="bottom" />`,
    },
  ],
  invalid: [
    {
      code:   `import { PageSection } from '@patternfly/react-core'; <PageSection sticky="top" />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection  />`,
      errors: [{
        message: `sticky prop for PageSection has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
      code:   `import { PageSection } from '@patternfly/react-core'; <PageSection sticky="bottom" />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection  />`,
      errors: [{
        message: `sticky prop for PageSection has been removed`,
        type: "JSXOpeningElement",
      }]
    },
    {
        code:   `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation sticky="top" />`,
        output: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation  />`,
        errors: [{
          message: `sticky prop for PageNavigation has been removed`,
          type: "JSXOpeningElement",
        }]
      },
      {
        code:   `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation sticky="bottom" />`,
        output: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation  />`,
        errors: [{
          message: `sticky prop for PageNavigation has been removed`,
          type: "JSXOpeningElement",
        }]
      },
      {
        code:   `import { PageGroup } from '@patternfly/react-core'; <PageGroup sticky="top" />`,
        output: `import { PageGroup } from '@patternfly/react-core'; <PageGroup  />`,
        errors: [{
          message: `sticky prop for PageGroup has been removed`,
          type: "JSXOpeningElement",
        }]
      },
      {
        code:   `import { PageGroup } from '@patternfly/react-core'; <PageGroup sticky="bottom" />`,
        output: `import { PageGroup } from '@patternfly/react-core'; <PageGroup  />`,
        errors: [{
          message: `sticky prop for PageGroup has been removed`,
          type: "JSXOpeningElement",
        }]
      },
      {
        code:   `import { PageBreadcrumb } from '@patternfly/react-core'; <PageBreadcrumb sticky="top" />`,
        output: `import { PageBreadcrumb } from '@patternfly/react-core'; <PageBreadcrumb  />`,
        errors: [{
          message: `sticky prop for PageBreadcrumb has been removed`,
          type: "JSXOpeningElement",
        }]
      },
      {
        code:   `import { PageBreadcrumb } from '@patternfly/react-core'; <PageBreadcrumb sticky="bottom" />`,
        output: `import { PageBreadcrumb } from '@patternfly/react-core'; <PageBreadcrumb  />`,
        errors: [{
          message: `sticky prop for PageBreadcrumb has been removed`,
          type: "JSXOpeningElement",
        }]
      },
  ]
});
