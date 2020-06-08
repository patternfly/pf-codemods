const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/card-rename-components');

ruleTester.run("card-rename-components", rule, {
  valid: [
    {
      code: `import { Card, CardTitle, CardHeaderMain, CardHeader } from '@patternfly/react-core';
      <Card>
        <CardHeader data-codemods="true">
          <CardHeaderMain>Header</CardHeaderMain>
        </CardHeader>
        <CardTitle>
          Title
        </CardTitle>
      </Card>`,
    },
    { // Has CardTitle import, trust renaming is already taken care of
      code: `import { Card, CardTitle, CardHeaderMain, CardHeader } from '@patternfly/react-core';
      <Card>
        <CardHeader>
          <CardHeaderMain>Header</CardHeaderMain>
        </CardHeader>
        <CardTitle>
          Title
        </CardTitle>
      </Card>`,
    },
    { // no @patternfly import
      code: `<Card>
      <CardHead>
        <CardHeadMain>Header</CardHeadMain>
      </CardHead>
      <CardHeader>
        Title
      </CardHeader>
    </Card>`
    }
  ],
  invalid: [
    {
      code:   `import { Card, CardHead, CardHeadMain, CardHeader } from '@patternfly/react-core';
<Card>
  <CardHead>
    <CardHeadMain>Header</CardHeadMain>
  </CardHead>
  <CardHeader>
    Title
  </CardHeader>
</Card>`,
      output: `import { Card, CardHead, CardHeadMain, CardHeader, CardTitle, CardHeaderMain } from '@patternfly/react-core';
<Card>
  <CardHeader data-codemods="true">
    <CardHeaderMain>Header</CardHeaderMain>
  </CardHeader>
  <CardTitle>
    Title
  </CardTitle>
</Card>`,
      errors: [
        {
          message: 'add missing imports CardTitle, CardHeaderMain from @patternfly/react-core',
          type: 'ImportDeclaration'
        },
        {
          message: 'CardHead renamed to CardHeader',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHeadMain renamed to CardHeaderMain',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHeadMain renamed to CardHeaderMain',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHead renamed to CardHeader',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHeader renamed to CardTitle',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHeader renamed to CardTitle',
          type: 'JSXIdentifier'
        }
      ]
    },
    {
      code:   `import { Card, CardHead, CardHeadMain, CardHeader } from '@patternfly/react-core';
<CardHead><CardHeadMain>Main</CardHeadMain></CardHead>`,
      output: `import { Card, CardHead, CardHeadMain, CardHeader, CardTitle, CardHeaderMain } from '@patternfly/react-core';
<CardHeader data-codemods="true"><CardHeaderMain>Main</CardHeaderMain></CardHeader>`,
      errors: [
        {
          message: 'add missing imports CardTitle, CardHeaderMain from @patternfly/react-core',
          type: 'ImportDeclaration'
        },
        {
          message: 'CardHead renamed to CardHeader',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHeadMain renamed to CardHeaderMain',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHeadMain renamed to CardHeaderMain',
          type: 'JSXIdentifier'
        },
        {
          message: 'CardHead renamed to CardHeader',
          type: 'JSXIdentifier'
        }
      ]
    }
  ]
});
