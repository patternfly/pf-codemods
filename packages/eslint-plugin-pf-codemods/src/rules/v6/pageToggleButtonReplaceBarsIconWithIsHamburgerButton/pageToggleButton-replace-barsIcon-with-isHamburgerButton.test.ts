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
  ],
  invalid: [
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core/dist/esm/components/PageToggleButton/index.js'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core/dist/esm/components/PageToggleButton/index.js'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core/dist/js/components/PageToggleButton/index.js'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core/dist/js/components/PageToggleButton/index.js'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core/dist/dynamic/components/PageToggleButton/index.js'; <PageToggleButton><BarsIcon /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core/dist/dynamic/components/PageToggleButton/index.js'; <PageToggleButton isHamburgerButton />`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton><BarsIcon /><SomeOtherContent /></PageToggleButton>`,
      output: `import { PageToggleButton } from '@patternfly/react-core'; <PageToggleButton isHamburgerButton><SomeOtherContent /></PageToggleButton>`,
      errors: [
        {
          message: `The BarsIcon child component should be replaced with the \`isHamburgerButton\` prop on PageToggleButton.`,
          type: "JSXElement",
        },
      ],
    },
  ],
}); 