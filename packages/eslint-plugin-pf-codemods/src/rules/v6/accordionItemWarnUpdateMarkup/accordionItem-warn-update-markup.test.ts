const ruleTester = require("../../ruletester");
import * as rule from "./accordionItem-warn-update-markup";

ruleTester.run("accordionItem-warn-update-markup", rule, {
  valid: [
    {
      code: `<AccordionItem />`,
    },
  ],
  invalid: [
    {
      code: `import { AccordionItem } from '@patternfly/react-core'; <AccordionItem />`,
      output: null,
      errors: [
        {
          message: `The markup for AccordionItem has been updated, and it now renders a \`div\` element as a wrapper.`,
        },
      ],
    },
  ],
});
