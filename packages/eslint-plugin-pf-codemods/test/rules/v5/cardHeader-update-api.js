const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/cardHeader-update-api");

ruleTester.run("cardHeader-update-api", rule, {
  valid: [
    {
      code: `import { CardHeader } from '@patternfly/react-core'; <CardHeader actions={}>Header content</CardHeader>`,
    },
    {
      // No @patternfly/react-core import
      code: `<CardHeader><CardHeaderMain /><CardActions /></CardHeader>`,
    },
  ],
  invalid: [
    {
      code: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader><CardHeaderMain>Header content</CardHeaderMain></CardHeader>`,
      output: `import { CardHeader,  } from '@patternfly/react-core'; <CardHeader>Header content</CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported.`,
          type: "ImportDeclaration",
        },
        {
          message: `CardHeaderMain is now rendered internally within CardHeader. Any CardHeaderMain content should instead be passed as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader><CardActions hasNoOffset className="test"><Action /></CardActions></CardHeader>`,
      output: `import { CardHeader,  } from '@patternfly/react-core'; <CardHeader actions={{ actions: <><Action /></>, hasNoOffset: true, className: "test" }}></CardHeader>`,
      errors: [
        {
          message: `CardActions is no longer exported.`,
          type: "ImportDeclaration",
        },
        {
          message: `CardActions is now rendered internally within CardHeader. Any CardActions props should instead be passed as a CardHeaderActionsObject to CardHeader's "actions" prop.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
