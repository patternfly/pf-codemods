const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/aboutModalBoxHero-remove-subcomponent");

ruleTester.run("aboutModalBoxHero-remove-subcomponent", rule, {
  valid: [
    {
      code: `import { Foo } from '@patternfly/react-core';`,
    },
    // No @patternfly/react-core import
    {
      code: `<AboutModal />`,
    },
  ],
  invalid: [
    {
      code: `import { AboutModal } from '@patternfly/react-core';`,
      output: `import { AboutModal } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The AboutModalBoxHero sub-component has been removed from AboutModal. Selectors in tests may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
