const ruleTester = require("../../ruletester");
import * as rule from "./nav-remove-theme-prop";

ruleTester.run("nav-remove-theme-prop", rule, {
  valid: [
    {
      code: `<Nav theme />`,
    },
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav theme="dark" />`,
      output: `import { Nav } from '@patternfly/react-core'; <Nav  />`,
      errors: [
        {
          message: `The \`theme\` prop is no longer supported in Nav. Use light/dark mode theming instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Nav } from '@patternfly/react-core'; <Nav theme="light" />`,
      output: `import { Nav } from '@patternfly/react-core'; <Nav  />`,
      errors: [
        {
          message: `The \`theme\` prop is no longer supported in Nav. Use light/dark mode theming instead.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
