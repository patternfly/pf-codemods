const ruleTester = require("../../ruletester");
import * as rule from "./switch-remove-labelOff";

ruleTester.run("switch-remove-labelOff", rule, {
  valid: [
    {
      code: `<Switch labelOff />`,
    },
    {
      code: `import { Switch } from '@patternfly/react-core'; <Switch someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Switch } from '@patternfly/react-core'; <Switch labelOff="Some label" />`,
      output: `import { Switch } from '@patternfly/react-core'; <Switch  />`,
      errors: [
        {
          message: `The \`labelOff\` prop has been removed from Switch. The label for a Switch should not dynamically update based on the on/off state.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Switch } from '@patternfly/react-core/dist/esm/components/Switch/index.js'; <Switch labelOff="Some label" />`,
      output: `import { Switch } from '@patternfly/react-core/dist/esm/components/Switch/index.js'; <Switch  />`,
      errors: [
        {
          message: `The \`labelOff\` prop has been removed from Switch. The label for a Switch should not dynamically update based on the on/off state.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Switch } from '@patternfly/react-core/dist/js/components/Switch/index.js'; <Switch labelOff="Some label" />`,
      output: `import { Switch } from '@patternfly/react-core/dist/js/components/Switch/index.js'; <Switch  />`,
      errors: [
        {
          message: `The \`labelOff\` prop has been removed from Switch. The label for a Switch should not dynamically update based on the on/off state.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Switch } from '@patternfly/react-core/dist/dynamic/components/Switch/index.js'; <Switch labelOff="Some label" />`,
      output: `import { Switch } from '@patternfly/react-core/dist/dynamic/components/Switch/index.js'; <Switch  />`,
      errors: [
        {
          message: `The \`labelOff\` prop has been removed from Switch. The label for a Switch should not dynamically update based on the on/off state.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
