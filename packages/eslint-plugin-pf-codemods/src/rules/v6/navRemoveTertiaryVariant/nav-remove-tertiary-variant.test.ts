const ruleTester = require("../../ruletester");
import * as rule from "./nav-remove-tertiary-variant";

ruleTester.run("nav-remove-tertiary-variant", rule, {
  valid: [
    {
      code: `<Nav variant="tertiary" />`,
    },
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav someOtherProp />`,
    },
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav variant="default" />`,
    },
  ],
  invalid: [
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav variant="tertiary" />`,
      output: `import { Nav } from '@patternfly/react-core'; <Nav variant="horizontal-subnav" />`,
      errors: [
        {
          message: `The "tertiary" Nav variant is no longer supported. Use variant="horizontal-subnav" instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav variant={'tertiary'} />`,
      output: `import { Nav } from '@patternfly/react-core'; <Nav variant={"horizontal-subnav"} />`,
      errors: [
        {
          message: `The "tertiary" Nav variant is no longer supported. Use variant="horizontal-subnav" instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
