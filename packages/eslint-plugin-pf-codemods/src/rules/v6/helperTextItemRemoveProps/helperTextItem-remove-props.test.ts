const ruleTester = require("../../ruletester");
import * as rule from "./helperTextItem-remove-props";

ruleTester.run("helperTextItem-remove-props", rule, {
  valid: [
    {
      code: `<HelperTextItem hasIcon isDynamic />`,
    },
    {
      code: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem hasIcon />`,
      output: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem  />`,
      errors: [
        {
          message: `The \`hasIcon\` prop has been removed from HelperTextItem. An icon will now render automatically when the \`variant\` prop has a value other than "default" or when the \`icon\` prop is passed in.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem isDynamic />`,
      output: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem  />`,
      errors: [
        {
          message: `The \`isDynamic\` prop has been removed from HelperTextItem.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Test that both are removed when passed in
    {
      code: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem hasIcon isDynamic />`,
      output: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem   />`,
      errors: [
        {
          message: `The \`hasIcon\` prop has been removed from HelperTextItem. An icon will now render automatically when the \`variant\` prop has a value other than "default" or when the \`icon\` prop is passed in.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The \`isDynamic\` prop has been removed from HelperTextItem.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
