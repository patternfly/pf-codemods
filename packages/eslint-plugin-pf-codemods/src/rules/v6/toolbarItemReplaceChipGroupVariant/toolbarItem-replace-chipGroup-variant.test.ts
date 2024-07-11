const ruleTester = require("../../ruletester");
import * as rule from "./toolbarItem-replace-chipGroup-variant";

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
  ],
});
