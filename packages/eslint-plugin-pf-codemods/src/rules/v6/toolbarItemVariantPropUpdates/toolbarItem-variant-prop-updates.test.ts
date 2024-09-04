const ruleTester = require("../../ruletester");
import * as rule from "./toolbarItem-variant-prop-updates";

ruleTester.run("toolbarItem-replace-chipGroup-variant", rule, {
  valid: [
    {
      code: `<ToolbarItem variant="chip-group" />`,
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem />`,
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="label-group" />`,
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant['chip-group']} />`,
    },
    {
      code: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant['label-group']} />`,
    },
  ],
  invalid: [
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="label-group" />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant={"chip-group"} />`,
      output: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="label-group" />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem as CustomItem } from '@patternfly/react-core'; <CustomItem variant="chip-group" />`,
      output: `import { ToolbarItem as CustomItem } from '@patternfly/react-core'; <CustomItem variant="label-group" />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant["chip-group"]} />`,
      output: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant["label-group"]} />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "MemberExpression",
        },
      ],
    },
    {
      code: `import { ToolbarItem, ToolbarItemVariant as CustomVariant } from '@patternfly/react-core'; <ToolbarItem variant={CustomVariant["chip-group"]} />`,
      output: `import { ToolbarItem, ToolbarItemVariant as CustomVariant } from '@patternfly/react-core'; <ToolbarItem variant={CustomVariant["label-group"]} />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "MemberExpression",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <ToolbarItem variant="label-group" />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <ToolbarItem variant="label-group" />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarItem variant="label-group" />`,
      errors: [
        {
          message: `The "chip-group" variant for ToolbarItem has been replaced with "label-group".`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="bulk-select" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem  />`,
      errors: [
        {
          message: `The "bulk-select" variant for ToolbarItem has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="overflow-menu" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem  />`,
      errors: [
        {
          message: `The "overflow-menu" variant for ToolbarItem has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="search-filter" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem  />`,
      errors: [
        {
          message: `The "search-filter" variant for ToolbarItem has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant={"bulk-select"} />`,
      output: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem  />`,
      errors: [
        {
          message: `The "bulk-select" variant for ToolbarItem has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant["bulk-select"]} />`,
      output: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; <ToolbarItem  />`,
      errors: [
        {
          message: `The "bulk-select" variant for ToolbarItem has been removed.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The "bulk-select" variant for ToolbarItem has been removed.`,
          type: "MemberExpression",
        },
      ],
    },
    {
      code: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; 
      const variant = ToolbarItemVariant["bulk-select"]; <ToolbarItem variant={variant} />`,
      output: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; 
      const variant = ToolbarItemVariant["bulk-select"]; <ToolbarItem  />`,
      errors: [
        {
          message: `The "bulk-select" variant for ToolbarItem has been removed.`,
          type: "MemberExpression",
        },
        {
          message: `The "bulk-select" variant for ToolbarItem has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // error without the option to fix
    {
      code: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; const variant = ToolbarItemVariant["bulk-select"];`,
      output: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; const variant = ToolbarItemVariant["bulk-select"];`,
      errors: [
        {
          message: `The "bulk-select" variant for ToolbarItem has been removed.`,
          type: "MemberExpression",
        },
      ],
    },
  ],
});
