const ruleTester = require("../../ruletester");
import * as rule from "./pageSection-update-variant-values";

ruleTester.run("pageSection-update-variant-values", rule, {
  valid: [
    {
      code: `<PageSection variant="dark" />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection someOtherProp />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="default" />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="secondary" />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant={PageSectionVariants.dark} />`,
    },
    {
      code: `import { PageSection, PageSectionVariants } from '@patternfly/react-core'; <PageSection variant={PageSectionVariants.default} />`,
    },
    {
      code: `import { PageSection, PageSectionVariants } from '@patternfly/react-core'; <PageSection variant={PageSectionVariants.secondary} />`,
    },
  ],
  invalid: [
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant="dark" />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection variant={"dark"} />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection as CustomPageSection } from '@patternfly/react-core'; <CustomPageSection variant="dark" />`,
      output: `import { PageSection as CustomPageSection } from '@patternfly/react-core'; <CustomPageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionVariants } from '@patternfly/react-core'; <PageSection variant={PageSectionVariants.dark} />`,
      output: `import { PageSection, PageSectionVariants } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionVariants as CustomVariant } from '@patternfly/react-core'; <PageSection variant={CustomVariant.dark} />`,
      output: `import { PageSection, PageSectionVariants as CustomVariant } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <PageSection variant="dark" />`,
      output: `import { PageSection } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection } from '@patternfly/react-core/dist/js/components/Page/index.js'; <PageSection variant="dark" />`,
      output: `import { PageSection } from '@patternfly/react-core/dist/js/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <PageSection variant="dark" />`,
      output: `import { PageSection } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionVariants } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <PageSection variant={PageSectionVariants.dark} />`,
      output: `import { PageSection, PageSectionVariants } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionVariants } from '@patternfly/react-core/dist/js/components/Page/index.js'; <PageSection variant={PageSectionVariants.dark} />`,
      output: `import { PageSection, PageSectionVariants } from '@patternfly/react-core/dist/js/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionVariants } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <PageSection variant={PageSectionVariants.dark} />`,
      output: `import { PageSection, PageSectionVariants } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The \`variant\` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
