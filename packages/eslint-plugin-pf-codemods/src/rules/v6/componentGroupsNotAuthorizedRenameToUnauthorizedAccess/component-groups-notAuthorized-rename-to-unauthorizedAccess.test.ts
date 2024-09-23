const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-notAuthorized-rename-to-unauthorizedAccess";

const errors = [
  {
    message: `NotAuthorized has been renamed to UnauthorizedAccess.`,
    type: "JSXOpeningElement",
  },
];

ruleTester.run(
  "component-groups-notAuthorized-rename-to-unauthorizedAccess",
  rule,
  {
    valid: [
      // missing import
      {
        code: `<NotAuthorized />`,
      },
      // import from wrong package
      {
        code: `import { NotAuthorized } from '@patternfly/react-core'; <NotAuthorized />`,
      },
    ],
    invalid: [
      {
        code: `import { NotAuthorized } from '@patternfly/react-component-groups'; <NotAuthorized />`,
        output: `import { UnauthorizedAccess } from '@patternfly/react-component-groups'; <UnauthorizedAccess data-codemods />`,
        errors,
      },
      // named import with alias
      {
        code: `import { NotAuthorized as NotAuth } from '@patternfly/react-component-groups'; <NotAuth />`,
        output: `import { UnauthorizedAccess as NotAuth } from '@patternfly/react-component-groups'; <NotAuth />`,
        errors,
      },
      // default imports
      {
        code: `import NotAuthorized from '@patternfly/react-component-groups/dist/cjs/NotAuthorized/index'; <NotAuthorized />`,
        output: `import UnauthorizedAccess from '@patternfly/react-component-groups/dist/cjs/UnauthorizedAccess/index'; <UnauthorizedAccess data-codemods />`,
        errors,
      },
      {
        code: `import NotAuthorized from '@patternfly/react-component-groups/dist/esm/NotAuthorized/index'; <NotAuthorized />`,
        output: `import UnauthorizedAccess from '@patternfly/react-component-groups/dist/esm/UnauthorizedAccess/index'; <UnauthorizedAccess data-codemods />`,
        errors,
      },
      {
        code: `import NotAuthorized from '@patternfly/react-component-groups/dist/dynamic/NotAuthorized'; <NotAuthorized />`,
        output: `import UnauthorizedAccess from '@patternfly/react-component-groups/dist/dynamic/UnauthorizedAccess'; <UnauthorizedAccess data-codemods />`,
        errors,
      },
      // default import with name not matching the component name
      {
        code: `import NotAuth from '@patternfly/react-component-groups/dist/dynamic/NotAuthorized'; <NotAuth />`,
        output: `import NotAuth from '@patternfly/react-component-groups/dist/dynamic/UnauthorizedAccess'; <NotAuth />`,
        errors,
      },
    ],
  }
);
