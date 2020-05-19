const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/title-require-heading-level');

ruleTester.run("title-require-heading-level", rule, {
  valid: [
    {
      code: `import { Title } from '@patternfly/react-core'; <Title headingLevel="h2" size="lg">{t('details.cost_value', { value: cost })}</Title>`,
    },
    {
      // No @patternfly/react-core import
      code: `<Title size="lg">{t('details.cost_value', { value: cost })}</Title>`,
    }
  ],
  invalid: [
    {
      code:   `import { Title } from '@patternfly/react-core'; <Title size="lg">{t('details.cost_value', { value: cost })}</Title>`,
      output: `import { Title } from '@patternfly/react-core'; <Title headingLevel="h2" size="lg">{t('details.cost_value', { value: cost })}</Title>`,
      errors: [{
        message: "headingLevel attribute is required for Title",
        type: "JSXOpeningElement",
      }]
    }
  ]
});
