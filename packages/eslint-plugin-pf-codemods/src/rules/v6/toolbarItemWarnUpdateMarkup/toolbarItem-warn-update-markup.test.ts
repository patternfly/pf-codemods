const ruleTester = require("../../ruletester");
import * as rule from "./toolbarItem-warn-update-markup";

ruleTester.run("toolbarItem-warn-update-markup", rule, {
  valid: [
    {
      code: `<ToolbarItem variant="chip-group" />`,
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem />`,
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="separator" />`,
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant['chip-group']} />`,
    },
  ],
  invalid: [
    {
      code: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core'; <ToolbarItem variant="chip-group" />`,
      errors: [
        {
          message: `The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from \`pf-m-chip-group\` to \`pf-m-label-group\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem as CustomItem } from '@patternfly/react-core'; <CustomItem variant="chip-group" />`,
      output: `import { ToolbarItem as CustomItem } from '@patternfly/react-core'; <CustomItem variant="chip-group" />`,
      errors: [
        {
          message: `The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from \`pf-m-chip-group\` to \`pf-m-label-group\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant["chip-group"]} />`,
      output: `import { ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core'; <ToolbarItem variant={ToolbarItemVariant["chip-group"]} />`,
      errors: [
        {
          message: `The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from \`pf-m-chip-group\` to \`pf-m-label-group\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem, ToolbarItemVariant as CustomVariant } from '@patternfly/react-core'; <ToolbarItem variant={CustomVariant["chip-group"]} />`,
      output: `import { ToolbarItem, ToolbarItemVariant as CustomVariant } from '@patternfly/react-core'; <ToolbarItem variant={CustomVariant["chip-group"]} />`,
      errors: [
        {
          message: `The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from \`pf-m-chip-group\` to \`pf-m-label-group\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      errors: [
        {
          message: `The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from \`pf-m-chip-group\` to \`pf-m-label-group\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      errors: [
        {
          message: `The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from \`pf-m-chip-group\` to \`pf-m-label-group\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ToolbarItem } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      output: `import { ToolbarItem } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarItem variant="chip-group" />`,
      errors: [
        {
          message: `The classname applied to the ToolbarItem when its variant is "chip-group" has been updated from \`pf-m-chip-group\` to \`pf-m-label-group\`.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
