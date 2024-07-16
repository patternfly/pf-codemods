const ruleTester = require("../../ruletester");
import * as rule from "./pageSection-remove-nav-type";

ruleTester.run("pageSection-remove-nav-type", rule, {
  valid: [
    {
      code: `<PageSection type="nav" />`,
    },
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection type={PageSectionTypes.nav} />`,
    },
  ],
  invalid: [
    {
      code: `import { PageSection } from '@patternfly/react-core'; <PageSection type="nav" />`,
      output: `import { PageSection } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionTypes } from '@patternfly/react-core'; <PageSection type={PageSectionTypes.nav} />`,
      output: `import { PageSection, PageSectionTypes } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionTypes } from '@patternfly/react-core'; const chosenType = PageSectionTypes.nav; <PageSection type={chosenType} />`,
      output: `import { PageSection, PageSectionTypes } from '@patternfly/react-core'; const chosenType = PageSectionTypes.nav; <PageSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection as CustomSection } from '@patternfly/react-core'; <CustomSection type="nav" />`,
      output: `import { PageSection as CustomSection } from '@patternfly/react-core'; <CustomSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection, PageSectionTypes as CustomTypes } from '@patternfly/react-core'; <PageSection type={CustomTypes.nav} />`,
      output: `import { PageSection, PageSectionTypes as CustomTypes } from '@patternfly/react-core'; <PageSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection as CustomSection, PageSectionTypes as CustomTypes } from '@patternfly/react-core'; <CustomSection type={CustomTypes.nav} />`,
      output: `import { PageSection as CustomSection, PageSectionTypes as CustomTypes } from '@patternfly/react-core'; <CustomSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <PageSection type="nav" />`,
      output: `import { PageSection } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection } from '@patternfly/react-core/dist/js/components/Page/index.js'; <PageSection type="nav" />`,
      output: `import { PageSection } from '@patternfly/react-core/dist/js/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { PageSection } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <PageSection type="nav" />`,
      output: `import { PageSection } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <PageSection  />`,
      errors: [
        {
          message: `The "nav" type for PageSection has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
