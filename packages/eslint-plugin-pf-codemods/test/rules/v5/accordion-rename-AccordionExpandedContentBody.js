const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/accordion-rename-AccordionExpandedContentBody');

ruleTester.run("accordion-rename-AccordionExpandedContentBody", rule, {
  valid: [
    {
      code: `import { AccordionExpandableContentBody } from '@patternfly/react-core';
      <AccordionExpandableContentBody>Body</AccordionExpandableContentBody>
      `,
    },
    {
      // No @patternfly/react-core import
      code: `<AccordionExpandedContentBody>Body</AccordionExpandedContentBody>`,
    },
  ],
  invalid: [
    {
      code: `import { AccordionExpandedContentBody } from '@patternfly/react-core'; <AccordionExpandedContentBody>Body</AccordionExpandedContentBody>`,
      output: `import { AccordionExpandedContentBody, AccordionExpandableContentBody } from '@patternfly/react-core'; <AccordionExpandableContentBody>Body</AccordionExpandableContentBody>`,
      errors: [
        {
          message: `add missing imports AccordionExpandableContentBody from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: "AccordionExpandedContentBody has been replaced with AccordionExpandableContentBody",
          type: "JSXIdentifier",
        },
        {
          message: "AccordionExpandedContentBody has been replaced with AccordionExpandableContentBody",
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `import { AccordionExpandedContentBody } from '@patternfly/react-core/dist/esm/components/Accordion/index.js'; <AccordionExpandedContentBody>Body</AccordionExpandedContentBody>`,
      output: `import { AccordionExpandedContentBody, AccordionExpandableContentBody } from '@patternfly/react-core/dist/esm/components/Accordion/index.js'; <AccordionExpandableContentBody>Body</AccordionExpandableContentBody>`,
      errors: [
        {
          message: `add missing imports AccordionExpandableContentBody from @patternfly/react-core/dist/esm/components/Accordion/index.js`,
          type: "ImportDeclaration",
        },
        {
          message: "AccordionExpandedContentBody has been replaced with AccordionExpandableContentBody",
          type: "JSXIdentifier",
        },
        {
          message: "AccordionExpandedContentBody has been replaced with AccordionExpandableContentBody",
          type: "JSXIdentifier",
        },
      ],
    },
  ],
});
