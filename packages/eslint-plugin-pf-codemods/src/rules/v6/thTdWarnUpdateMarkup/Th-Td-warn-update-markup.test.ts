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
      output: null,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
        },
      ],
    },
    {
      code: `import { Th as CustomTh } from '@patternfly/react-table'; <CustomTh isStickyColumn />`,
      output: null,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
        },
      ],
    },
    {
      code: `import { Td } from '@patternfly/react-table'; <Td isStickyColumn />`,
      output: null,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
        },
      ],
    },
    {
      code: `import { Th } from '@patternfly/react-table/dist/esm/components/Table/index.js'; <Th isStickyColumn />`,
      output: null,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
        },
      ],
    },
    {
      code: `import { Th } from '@patternfly/react-table/dist/js/components/Table/index.js'; <Th isStickyColumn />`,
      output: null,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
        },
      ],
    },
    {
      code: `import { Th } from '@patternfly/react-table/dist/dynamic/components/Table/index.js'; <Th isStickyColumn />`,
      output: null,
      errors: [
        {
          message: `The \`--pf-v6-c-table__sticky-cell--Left\` and \`--pf-v6-c-table__sticky-cell--Right\` CSS variables applied as inline styles have been updated to \`--pf-v6-c-table__sticky-cell--InsetInlineStart\` and \`--pf-v6-c-table__sticky-cell--InsetInlineEnd\`, respectively.`,
        },
      ],
    },
  ],
});
