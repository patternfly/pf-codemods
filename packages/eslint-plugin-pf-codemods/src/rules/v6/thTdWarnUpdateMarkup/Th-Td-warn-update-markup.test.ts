const ruleTester = require("../../ruletester");
import * as rule from "./Th-Td-warn-update-markup";

ruleTester.run("Th-Td-warn-update-markup", rule, {
  valid: [
    {
      code: `<Th />`,
    },
    {
      code: `<Td />`,
    },
    {
      code: `import { Th } from '@patternfly/react-table'; <Th />`,
    },
    {
      code: `import { Td } from '@patternfly/react-table'; <Td />`,
    },
  ],
  invalid: [
    {
      code: `import { Th } from '@patternfly/react-table'; <Th isStickyColumn />`,
      output: `import { Th } from '@patternfly/react-table'; <Th isStickyColumn />`,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Th as CustomTh } from '@patternfly/react-table'; <CustomTh isStickyColumn />`,
      output: `import { Th as CustomTh } from '@patternfly/react-table'; <CustomTh isStickyColumn />`,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Td } from '@patternfly/react-table'; <Td isStickyColumn />`,
      output: `import { Td } from '@patternfly/react-table'; <Td isStickyColumn />`,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Th } from '@patternfly/react-table/dist/esm/components/Table/index.js'; <Th isStickyColumn />`,
      output: `import { Th } from '@patternfly/react-table/dist/esm/components/Table/index.js'; <Th isStickyColumn />`,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Th } from '@patternfly/react-table/dist/js/components/Table/index.js'; <Th isStickyColumn />`,
      output: `import { Th } from '@patternfly/react-table/dist/js/components/Table/index.js'; <Th isStickyColumn />`,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Th } from '@patternfly/react-table/dist/dynamic/components/Table/index.js'; <Th isStickyColumn />`,
      output: `import { Th } from '@patternfly/react-table/dist/dynamic/components/Table/index.js'; <Th isStickyColumn />`,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
