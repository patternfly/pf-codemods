const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/remove-variant-enum');

ruleTester.run("remove-variant-enum", rule, {
  valid: [
    {
      code: `<Button variant="plain" />`,
    }
  ],
  invalid: [
    {
      code: `import { Button, ButtonVariant as MyButtonVaraitn } from '@patternfly/react-core';

      const MyButton = (
        <Button variant={MyButtonVaraitn.plain} />
      )`,
      errors: [{
        message: 'Use string value "plain" instead of MyButtonVaraitn.plain',
        type: "JSXExpressionContainer"
      }]
    }
  ]
});
