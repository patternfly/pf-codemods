const ruleTester = require("../../ruletester");
import * as rule from "./card-updated-clickable-markup";

ruleTester.run("card-updated-clickable-markup", rule, {
  valid: [
    {
      code: `<Card isClickable />`,
    },
    {
      code: `<Card isClickable><CardHeader selectableActions={{name: 'Test', selectableActionId: 'Id' }} /></Card>`,
    },
    {
      code: `import { Card } from '@patternfly/react-core'; <Card someOtherProp />`,
    },
    {
      code: `import { Card } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{name: 'Test', selectableActionId: 'Id'}} /></Card>`,
    },
    {
      code: `import { CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{name: 'Test', selectableActionId: 'Id'}} /></Card>`,
    },
  ],
  invalid: [
    // No invalid properties
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      errors: [
        {
          message: "The markup for clickable-only cards has been updated.",
          type: "JSXElement",
        },
      ],
    },
    // 1 valid property + 1 invalid property
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{to: '#', selectableActionId: 'Id'}} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{to: '#'}} /></Card>`,
      errors: [
        {
          message:
            "The markup for clickable-only cards has been updated.Additionally, the `selectableActions.selectableActionId` and `selectableActions.name` props are no longer necessary to pass to CardHeader for clickable-only cards.",
          type: "JSXElement",
        },
      ],
    },
    // 2 invalid properties
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{name: 'Test', selectableActionId: 'Id'}} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{}} /></Card>`,
      errors: [
        {
          message:
            "The markup for clickable-only cards has been updated.Additionally, the `selectableActions.selectableActionId` and `selectableActions.name` props are no longer necessary to pass to CardHeader for clickable-only cards.",
          type: "JSXElement",
        },
      ],
    },
    // 1 valid property + 2 invalid properties
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{to: "#", name: 'Test', selectableActionId: 'Id'}} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      errors: [
        {
          message:
            "The markup for clickable-only cards has been updated.Additionally, the `selectableActions.selectableActionId` and `selectableActions.name` props are no longer necessary to pass to CardHeader for clickable-only cards.",
          // message: `The markup for clickable-only cards has been updated, now using button and anchor elements for the respective clickable action. The \`selectableActions.selectableActionId\` and \`selectableActions.name\` props are also no longer necessary for clickable-only cards. Passing them in will not cause any errors, but running the fix for this rule will remove them.`,
          type: "JSXElement",
        },
      ],
    },
    // Passed as a variable reference
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core'; const obj = {name: 'Test', selectableActionId: 'Id'}; <Card isClickable><CardHeader selectableActions={obj} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core'; const obj = {}; <Card isClickable><CardHeader selectableActions={obj} /></Card>`,
      errors: [
        {
          message:
            "The markup for clickable-only cards has been updated.Additionally, the `selectableActions.selectableActionId` and `selectableActions.name` props are no longer necessary to pass to CardHeader for clickable-only cards.",
          type: "JSXElement",
        },
      ],
    },
    // Passed as a variable reference with 2 valid and 2 invalid properties
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core'; const obj = {to: "#", name: 'Test', extra: "thing", selectableActionId: 'Id'}; <Card isClickable><CardHeader selectableActions={obj} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core'; const obj = {to: "#", extra: "thing"}; <Card isClickable><CardHeader selectableActions={obj} /></Card>`,
      errors: [
        {
          message:
            "The markup for clickable-only cards has been updated.Additionally, the `selectableActions.selectableActionId` and `selectableActions.name` props are no longer necessary to pass to CardHeader for clickable-only cards.",
          type: "JSXElement",
        },
      ],
    },
    // Aliased
    {
      code: `import { Card as CustomCard, CardHeader as CustomCardHeader } from '@patternfly/react-core'; <CustomCard isClickable><CustomCardHeader selectableActions={{to: "#"}} /></CustomCard>`,
      output: `import { Card as CustomCard, CardHeader as CustomCardHeader } from '@patternfly/react-core'; <CustomCard isClickable><CustomCardHeader selectableActions={{to: "#"}} /></CustomCard>`,
      errors: [
        {
          message: "The markup for clickable-only cards has been updated.",
          type: "JSXElement",
        },
      ],
    },
    // Dist Imports
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      errors: [
        {
          message: "The markup for clickable-only cards has been updated.",
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core/dist/js/components/Card/index.js'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core/dist/js/components/Card/index.js'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      errors: [
        {
          message: "The markup for clickable-only cards has been updated.",
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Card, CardHeader } from '@patternfly/react-core/dist/dynamic/components/Card/index.js'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      output: `import { Card, CardHeader } from '@patternfly/react-core/dist/dynamic/components/Card/index.js'; <Card isClickable><CardHeader selectableActions={{to: "#"}} /></Card>`,
      errors: [
        {
          message: "The markup for clickable-only cards has been updated.",
          type: "JSXElement",
        },
      ],
    },
  ],
});
