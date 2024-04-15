const ruleTester = require("../../ruletester");
import * as rule from "./drawerContent-replace-noBackground-colorVariant";

ruleTester.run("drawerContent-replace-noBackground-colorVariant", rule, {
  valid: [
    {
      code: `<DrawerContent colorVariant="no-background" />`,
    },
    {
      code: `<DrawerContent colorVariant={DrawerColorVariant.primary} />`,
    },
    {
      code: `import { DrawerContent } from '@patternfly/react-core'; <DrawerContent colorVariant="primary" />`,
    },
    {
      code: `import { DrawerContent, DrawerContentColorVariant } from '@patternfly/react-core'; <DrawerContent colorVariant={DrawerContentColorVariant.primary} />`,
    },
    {
      code: `import { DrawerContent } from '@patternfly/react-core'; <DrawerContent colorVariant={DrawerColorVariant.primary} />`,
    },
    {
      code: `import { DrawerContent } from '@patternfly/react-core'; <DrawerContent someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { DrawerContent } from '@patternfly/react-core'; <DrawerContent colorVariant="no-background" />`,
      output: `import { DrawerContent } from '@patternfly/react-core'; <DrawerContent  />`,
      errors: [
        {
          message: `The "no-background" value of the \`colorVariant\` prop on DrawerContent has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DrawerContent } from '@patternfly/react-core'; <DrawerContent colorVariant={"no-background"} />`,
      output: `import { DrawerContent } from '@patternfly/react-core'; <DrawerContent  />`,
      errors: [
        {
          message: `The "no-background" value of the \`colorVariant\` prop on DrawerContent has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DrawerContent } from '@patternfly/react-core'; const color = "no-background"; <DrawerContent colorVariant={color} />`,
      output: `import { DrawerContent } from '@patternfly/react-core'; const color = "no-background"; <DrawerContent  />`,
      errors: [
        {
          message: `The "no-background" value of the \`colorVariant\` prop on DrawerContent has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; <DrawerContent colorVariant={DrawerColorVariant.default} />`,
      output: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; <DrawerContent colorVariant="default" />`,
      errors: [
        {
          message: `The DrawerContentColorVariant enum should be used instead of the DrawerColorVariant enum when passed to the DrawerContent component. This fix will replace the colorVariant prop value with a string.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; <DrawerContent colorVariant={DrawerColorVariant.noBackground} />`,
      output: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; <DrawerContent  />`,
      errors: [
        {
          message: `The "no-background" value of the \`colorVariant\` prop on DrawerContent has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; const color = DrawerColorVariant.default; <DrawerContent colorVariant={DrawerColorVariant.default} />`,
      output: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; const color = DrawerColorVariant.default; <DrawerContent colorVariant="default" />`,
      errors: [
        {
          message: `The DrawerContentColorVariant enum should be used instead of the DrawerColorVariant enum when passed to the DrawerContent component. This fix will replace the colorVariant prop value with a string.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; const color = DrawerColorVariant.noBackground; <DrawerContent colorVariant={color} />`,
      output: `import { DrawerContent, DrawerColorVariant } from '@patternfly/react-core'; const color = DrawerColorVariant.noBackground; <DrawerContent  />`,
      errors: [
        {
          message: `The "no-background" value of the \`colorVariant\` prop on DrawerContent has been removed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
