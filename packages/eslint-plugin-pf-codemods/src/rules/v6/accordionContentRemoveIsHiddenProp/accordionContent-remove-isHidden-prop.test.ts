const ruleTester = require("../../ruletester");
import * as rule from "./accordionContent-remove-isHidden-prop";

ruleTester.run("accordionContent-remove-isHidden-prop", rule, {
  valid: [
    {
      code: `<AccordionContent isHidden />`,
    },
    {
      code: `import { AccordionContent } from '@patternfly/react-core'; <AccordionContent someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { AccordionContent } from '@patternfly/react-core'; <AccordionContent isHidden />`,
      output: `import { AccordionContent } from '@patternfly/react-core'; <AccordionContent  />`,
      errors: [
        {
          message: `The \`isHidden\` prop has been removed from AccordionContent, as its visibility will now be set automatically based on the \`isExpanded\` prop on AccordionItem.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
