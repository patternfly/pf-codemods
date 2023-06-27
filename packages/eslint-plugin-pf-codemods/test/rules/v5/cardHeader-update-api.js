const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/cardHeader-update-api");

ruleTester.run("cardHeader-update-api", rule, {
  valid: [
    {
      code: `import { CardHeader } from '@patternfly/react-core'; <CardHeader actions={}>Header content</CardHeader>`,
    },
    {
      code: `import { CardHeader } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <CardHeader actions={}>Header content</CardHeader>`,
    },
    {
      // No @patternfly/react-core import
      code: `<CardHeader><CardHeaderMain /><CardActions /></CardHeader>`,
    },
  ],
  invalid: [
    {
      code: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader><CardHeaderMain>Header content</CardHeaderMain></CardHeader>`,
      output: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader><>Header content</></CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader><CardActions hasNoOffset className="test"><Action /></CardActions></CardHeader>`,
      output: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader actions={{ actions: <><Action /></>, hasNoOffset: true, className: "test"}} ></CardHeader>`,
      errors: [
        {
          message: `CardActions is no longer exported and is instead rendered internally within CardHeader. CardActions props and content should instead be passed as an object to CardHeader's "actions" prop.`,
          type: "JSXElement",
        },
      ],
    },
    // Both CardHeaderMain and CardActions imported - first run
    {
      code: `import { CardHeader, CardHeaderMain, CardActions } from '@patternfly/react-core'; <CardHeader><CardHeaderMain>Header content</CardHeaderMain><CardActions hasNoOffset className="test"><Action /></CardActions></CardHeader>`,
      output: `import { CardHeader, CardHeaderMain, CardActions } from '@patternfly/react-core'; <CardHeader actions={{ actions: <><Action /></>, hasNoOffset: true, className: "test"}} ><CardHeaderMain>Header content</CardHeaderMain></CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
        {
          message: `CardActions is no longer exported and is instead rendered internally within CardHeader. CardActions props and content should instead be passed as an object to CardHeader's "actions" prop.`,
          type: "JSXElement",
        },
      ],
    },
    // Both CardHeaderMain and CardActions imported - second run
    {
      code: `import { CardHeader, CardHeaderMain, CardActions } from '@patternfly/react-core'; <CardHeader actions={{ actions: <><Action /></>, hasNoOffset: true, className: "test"}} ><CardHeaderMain>Header content</CardHeaderMain></CardHeader>`,
      output: `import { CardHeader, CardHeaderMain, CardActions } from '@patternfly/react-core'; <CardHeader actions={{ actions: <><Action /></>, hasNoOffset: true, className: "test"}} ><>Header content</></CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    // Import from dist
    {
      code: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <CardHeader><CardHeaderMain>Header content</CardHeaderMain></CardHeader>`,
      output: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core/dist/esm/components/Card/index.js'; <CardHeader><>Header content</></CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    // ConditionalExpression for CardHeaderMain
    {
      code: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue ? <CardHeaderMain>Header content</CardHeaderMain> : <div>Alternative</div>}</CardHeader>`,
      output: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue ? <>Header content</> : <div>Alternative</div>}</CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    // ConditionalExpression for CardHeaderMain - multiple conditions
    {
      code: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && anotherThingTrue ? <CardHeaderMain>Header content</CardHeaderMain> : <div>Alternative</div>}</CardHeader>`,
      output: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && anotherThingTrue ? <>Header content</> : <div>Alternative</div>}</CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    // LogicalExpression for CardHeaderMain
    {
      code: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && <CardHeaderMain>Header content</CardHeaderMain>}</CardHeader>`,
      output: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && <>Header content</>}</CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    // LogicalExpression for CardHeaderMain - multiple conditions
    {
      code: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && anotherThingTrue &&  <CardHeaderMain>Header content</CardHeaderMain>}</CardHeader>`,
      output: `import { CardHeader, CardHeaderMain } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && anotherThingTrue && <>Header content</>}</CardHeader>`,
      errors: [
        {
          message: `CardHeaderMain is no longer exported and is instead rendered internally within CardHeader. CardHeaderMain content should instead be passed directly as children to CardHeader.`,
          type: "JSXElement",
        },
      ],
    },
    // ConditionalExpression for CardActions
    {
      code: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue ? <CardActions hasNoOffset className="test"><Action /></CardActions> : <div>Alternative</div>}</CardHeader>`,
      output: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader actions={somethingIsTrue ? { actions: <><Action /></>, hasNoOffset: true, className: "test"} : {}} ></CardHeader>`,
      errors: [
        {
          message: `CardActions is no longer exported and is instead rendered internally within CardHeader. CardActions props and content should instead be passed as an object to CardHeader's "actions" prop.`,
          type: "JSXElement",
        },
      ],
    },
    // ConditionalExpression for CardActions - multiple conditions
    {
      code: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && anotherThingTrue ? <CardActions hasNoOffset className="test"><Action /></CardActions> : <div>Alternative</div>}</CardHeader>`,
      output: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader actions={somethingIsTrue && anotherThingTrue ? { actions: <><Action /></>, hasNoOffset: true, className: "test"} : {}} ></CardHeader>`,
      errors: [
        {
          message: `CardActions is no longer exported and is instead rendered internally within CardHeader. CardActions props and content should instead be passed as an object to CardHeader's "actions" prop.`,
          type: "JSXElement",
        },
      ],
    },
    // LogicalExpression for CardActions
    {
      code: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && <CardActions hasNoOffset className="test"><Action /></CardActions>}</CardHeader>`,
      output: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader {...(somethingIsTrue && {actions: { actions: <><Action /></>, hasNoOffset: true, className: "test"}})} ></CardHeader>`,
      errors: [
        {
          message: `CardActions is no longer exported and is instead rendered internally within CardHeader. CardActions props and content should instead be passed as an object to CardHeader's "actions" prop.`,
          type: "JSXElement",
        },
      ],
    },
    // LogicalExpression for CardActions - multiple conditions
    {
      code: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader>{somethingIsTrue && anotherThingTrue && <CardActions hasNoOffset className="test"><Action /></CardActions>}</CardHeader>`,
      output: `import { CardHeader, CardActions } from '@patternfly/react-core'; <CardHeader {...(somethingIsTrue && anotherThingTrue && {actions: { actions: <><Action /></>, hasNoOffset: true, className: "test"}})} ></CardHeader>`,
      errors: [
        {
          message: `CardActions is no longer exported and is instead rendered internally within CardHeader. CardActions props and content should instead be passed as an object to CardHeader's "actions" prop.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
