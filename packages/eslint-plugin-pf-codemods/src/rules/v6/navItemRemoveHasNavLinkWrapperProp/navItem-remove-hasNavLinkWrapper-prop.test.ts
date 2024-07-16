const ruleTester = require("../../ruletester");
import * as rule from "./navItem-remove-hasNavLinkWrapper-prop";

ruleTester.run("navItem-remove-hasNavLinkWrapper-prop", rule, {
  valid: [
    {
      code: `<NavItem hasNavLinkWrapper />`,
    },
    {
      code: `import { NavItem } from '@patternfly/react-core'; <NavItem someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { NavItem } from '@patternfly/react-core'; <NavItem hasNavLinkWrapper />`,
      output: `import { NavItem } from '@patternfly/react-core'; <NavItem  />`,
      errors: [
        {
          message: `The \`hasNavLinkWrapper\` prop has been removed from NavItem. Additionally, any icons for a NavItem should be passed to its new \`icon\` prop.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { NavItem } from '@patternfly/react-core/dist/esm/components/Nav/index.js'; <NavItem hasNavLinkWrapper />`,
      output: `import { NavItem } from '@patternfly/react-core/dist/esm/components/Nav/index.js'; <NavItem  />`,
      errors: [
        {
          message: `The \`hasNavLinkWrapper\` prop has been removed from NavItem. Additionally, any icons for a NavItem should be passed to its new \`icon\` prop.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { NavItem } from '@patternfly/react-core/dist/js/components/Nav/index.js'; <NavItem hasNavLinkWrapper />`,
      output: `import { NavItem } from '@patternfly/react-core/dist/js/components/Nav/index.js'; <NavItem  />`,
      errors: [
        {
          message: `The \`hasNavLinkWrapper\` prop has been removed from NavItem. Additionally, any icons for a NavItem should be passed to its new \`icon\` prop.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { NavItem } from '@patternfly/react-core/dist/dynamic/components/Nav/index.js'; <NavItem hasNavLinkWrapper />`,
      output: `import { NavItem } from '@patternfly/react-core/dist/dynamic/components/Nav/index.js'; <NavItem  />`,
      errors: [
        {
          message: `The \`hasNavLinkWrapper\` prop has been removed from NavItem. Additionally, any icons for a NavItem should be passed to its new \`icon\` prop.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
