const ruleTester = require("../../ruletester");
import * as rule from "./loginMainHeader-warn-updated-markup";

ruleTester.run("loginMainHeader-warn-updated-markup", rule, {
  valid: [
    {
      code: `<LoginMainHeader />`,
    },
    {
      code: `import { LoginMainHeader } from 'somewhere-else'`,
    },
    {
      code: `<LoginPage />`,
    },
    {
      code: `import { LoginPage } from 'somewhere-else'`,
    },
  ],
  invalid: [
    {
      code: `import { LoginMainHeader } from '@patternfly/react-core';`,
      output: `import { LoginMainHeader } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for LoginMainHeader has been updated, now using a div wrapper instead of a header element wrapper.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { LoginPage } from '@patternfly/react-core';`,
      output: `import { LoginPage } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for LoginMainHeader (which is used internally within LoginPage) has been updated, now using a div wrapper instead of a header element wrapper.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { LoginPage, LoginMainHeader, Button } from '@patternfly/react-core';`,
      output: `import { LoginPage, LoginMainHeader, Button } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for LoginMainHeader (which is used internally within LoginPage) has been updated, now using a div wrapper instead of a header element wrapper.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { LoginMainHeader as CustomThing } from '@patternfly/react-core';`,
      output: `import { LoginMainHeader as CustomThing } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for LoginMainHeader has been updated, now using a div wrapper instead of a header element wrapper.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { LoginMainHeader } from '@patternfly/react-core/dist/esm/components/LoginPage/index.js';`,
      output: `import { LoginMainHeader } from '@patternfly/react-core/dist/esm/components/LoginPage/index.js';`,
      errors: [
        {
          message: `The markup for LoginMainHeader has been updated, now using a div wrapper instead of a header element wrapper.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { LoginMainHeader } from '@patternfly/react-core/dist/js/components/LoginPage/index.js';`,
      output: `import { LoginMainHeader } from '@patternfly/react-core/dist/js/components/LoginPage/index.js';`,
      errors: [
        {
          message: `The markup for LoginMainHeader has been updated, now using a div wrapper instead of a header element wrapper.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { LoginMainHeader } from '@patternfly/react-core/dist/dynamic/components/LoginPage/index.js';`,
      output: `import { LoginMainHeader } from '@patternfly/react-core/dist/dynamic/components/LoginPage/index.js';`,
      errors: [
        {
          message: `The markup for LoginMainHeader has been updated, now using a div wrapper instead of a header element wrapper.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
