const ruleTester = require("../../ruletester");
import * as rule from "./accordionToggle-move-isExpanded-prop";

ruleTester.run("accordionToggle-move-isExpanded-prop", rule, {
  valid: [
    {
      code: `<AccordionToggle isExpanded />`,
    },
    {
      code: `import { AccordionToggle } from '@patternfly/react-core'; <AccordionToggle someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { AccordionItem, AccordionToggle } from '@patternfly/react-core'; <AccordionItem><AccordionToggle isExpanded /></AccordionItem>`,
      output: `import { AccordionItem, AccordionToggle } from '@patternfly/react-core'; <AccordionItem isExpanded><AccordionToggle  /></AccordionItem>`,
      errors: [
        {
          message: `The \`isExpanded\` prop for AccordionToggle has been moved to AccordionItem.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { AccordionItem, AccordionToggle } from '@patternfly/react-core'; <AccordionItem><AccordionToggle isExpanded={someReference} /></AccordionItem>`,
      output: `import { AccordionItem, AccordionToggle } from '@patternfly/react-core'; <AccordionItem isExpanded={someReference}><AccordionToggle  /></AccordionItem>`,
      errors: [
        {
          message: `The \`isExpanded\` prop for AccordionToggle has been moved to AccordionItem.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      // Test that the prop is moved correctly when AccordionItem already has a prop
      code: `import { AccordionItem, AccordionToggle } from '@patternfly/react-core'; <AccordionItem className="someClass"><AccordionToggle isExpanded /></AccordionItem>`,
      output: `import { AccordionItem, AccordionToggle } from '@patternfly/react-core'; <AccordionItem isExpanded className="someClass"><AccordionToggle  /></AccordionItem>`,
      errors: [
        {
          message: `The \`isExpanded\` prop for AccordionToggle has been moved to AccordionItem.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
