const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/remove-unused-imports');

ruleTester.run("remove-unused-imports", rule, {
  valid: [
    {
      code: `import { Card } from '@patternfly/react-core';`,
    }
  ],
  invalid: [
    {
      code:   `import { NavVariants } from '@patternfly/react-core';`,
      output: `import {  } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { Card, NavVariants } from '@patternfly/react-core';`,
      output: `import { Card  } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { NavVariants, Card } from '@patternfly/react-core';`,
      output: `import {  Card } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { Card, NavVariants, CardTitle } from '@patternfly/react-core';`,
      output: `import { Card,  CardTitle } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { NavVariants as MyVariants } from '@patternfly/react-core';`,
      output: `import {    } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { Card, NavVariants as MyVariants } from '@patternfly/react-core';`,
      output: `import { Card    } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { NavVariants as MyVariants, Card } from '@patternfly/react-core';`,
      output: `import {    Card } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { Card, NavVariants as MyVariants, CardTitle } from '@patternfly/react-core';`,
      output: `import { Card,    CardTitle } from '@patternfly/react-core';`,
      errors: [{
        message: `NavVariants was removed`,
        type: "ImportDeclaration",
      }]
    },
    {
      code:   `import { Card } from '@patternfly/react-core';
        import { cellHeightAuto } from '@patternfly/react-table';`,
      output: `import { Card } from '@patternfly/react-core';
        import {  } from '@patternfly/react-table';`,
      errors: [{
        message: `cellHeightAuto was removed`,
        type: "ImportDeclaration",
      }]
    },
  ]
});
