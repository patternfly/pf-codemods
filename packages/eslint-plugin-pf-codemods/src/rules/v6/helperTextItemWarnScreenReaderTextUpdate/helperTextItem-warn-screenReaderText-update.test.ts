const ruleTester = require("../../ruletester");
import * as rule from "./helperTextItem-warn-screenReaderText-update";

ruleTester.run("helperTextItem-warn-screenReaderText-update", rule, {
  valid: [
    {
      code: `<HelperTextItem />`,
    },
  ],
  invalid: [
    {
      code: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem />`,
      output: `import { HelperTextItem } from '@patternfly/react-core'; <HelperTextItem />`,
      errors: [
        {
          message: `The \`screenReaderText\` prop on HelperTextItem has been updated, and will now render only when the \`variant\` prop has a value other than "default". Previously the prop was rendered only when the \`isDynamic\` prop was true.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
