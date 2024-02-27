const ruleTester = require("../../ruletester");
import * as rule from "./drawer-replace-colorVariant-light200";

const affectedDrawerComponents = [
  "DrawerContent",
  "DrawerPanelContent",
  "DrawerSection",
];
const validTests: { code: string }[] = [];
const invalidTests: {
  code: string;
  output: string;
  errors: { message: string; type: string }[];
}[] = [];
affectedDrawerComponents.forEach((component) => {
  validTests.push({
    code: `<${component} colorVariant="light-200" />`,
  });
  validTests.push({
    code: `<${component} colorVariant={DrawerColorVariant.light200} />`,
  });
  validTests.push({
    code: `import { ${component} } from '@patternfly/react-core'; <${component} colorVariant="secondary" />`,
  });
  validTests.push({
    code: `import { ${component}, DrawerColorVariant } from '@patternfly/react-core'; <${component} colorVariant={DrawerColorVariant.secondary} />`,
  });

  invalidTests.push({
    code: `import { ${component} } from '@patternfly/react-core'; <${component} colorVariant="light-200" />`,
    output: `import { ${component} } from '@patternfly/react-core'; <${component} colorVariant="secondary" />`,
    errors: [
      {
        message: `The "light-200" value for the \`colorVariant\` prop has been replaced with the "secondary" value for ${component}.`,
        type: "JSXOpeningElement",
      },
    ],
  });
});

ruleTester.run("drawer-replace-colorVariant-light200", rule, {
  valid: [
    {
      code: `<DrawerContent colorVariant={DrawerColorVariant.light200} />`,
    },
    {
      code: `import { DrawerColorVariant } from '@patternfly/react-core'; <DrawerContent colorVariant={DrawerColorVariant.secondary} />`,
    },
    ...validTests,
  ],
  invalid: [
    {
      code: `import { DrawerColorVariant } from '@patternfly/react-core'; <DrawerContent colorVariant={DrawerColorVariant.light200} />`,
      output: `import { DrawerColorVariant } from '@patternfly/react-core'; <DrawerContent colorVariant={DrawerColorVariant.secondary} />`,
      errors: [
        {
          message:
            "The `light200` property for the DrawerColorVariant enum has been replaced with the `secondary` property.",
          type: "MemberExpression",
        },
      ],
    },
    // Should work outside of JSXOpeningElements
    {
      code: `import { DrawerColorVariant } from '@patternfly/react-core'; const drawerVariant = DrawerColorVariant.light200;`,
      output: `import { DrawerColorVariant } from '@patternfly/react-core'; const drawerVariant = DrawerColorVariant.secondary;`,
      errors: [
        {
          message:
            "The `light200` property for the DrawerColorVariant enum has been replaced with the `secondary` property.",
          type: "MemberExpression",
        },
      ],
    },
    ...invalidTests,
  ],
});
