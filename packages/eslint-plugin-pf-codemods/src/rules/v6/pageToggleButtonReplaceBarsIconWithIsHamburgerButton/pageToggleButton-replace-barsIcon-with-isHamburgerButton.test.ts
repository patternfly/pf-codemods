const ruleTester = require("../../ruletester");
import * as rule from "./pageToggleButton-replace-barsIcon-with-isHamburgerButton";

ruleTester.run("pageToggleButton-replace-barsIcon-with-isHamburgerButton", rule, {
  valid: [
    {
      code: `<PageToggleButton isHamburgerButton />`,
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton isHamburgerButton />`,
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton><SomeOtherIcon /></PageToggleButton>`,
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton>Some text content</PageToggleButton>`,
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton />`,
    },
    // PageToggleButton not imported from PatternFly, but BarsIcon is
    {
      code: `import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
    },
    // Neither PageToggleButton nor BarsIcon imported from PatternFly
    {
      code: `import { BarsIcon } from 'some-other-package'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
    },
    // PageToggleButton imported from PatternFly, but BarsIcon not imported from PatternFly
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; import { BarsIcon } from 'some-other-package'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
    },
  ],
  invalid: [
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core/dist/esm/components/PageToggleButton/index.js'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core/dist/esm/components/PageToggleButton/index.js'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core/dist/js/components/PageToggleButton/index.js'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core/dist/js/components/PageToggleButton/index.js'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core/dist/dynamic/components/PageToggleButton/index.js'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core/dist/dynamic/components/PageToggleButton/index.js'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton><BarsIcon /><SomeOtherContent /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core'; import { BarsIcon } from '@patternfly/react-icons'; <PageToggleButton isHamburgerButton><SomeOtherContent /></PageToggleButton>`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
  ],
}); 