const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/title-heading-level');

ruleTester.run("title-heading-level", rule, {
  valid: [
    {
      code: `<Title size="lg" headingLevel="h2">{t('details.cost_value', { value: cost })}</Title>`,
    }
  ],
  invalid: [
    {
      code: `<Title size="lg">{t('details.cost_value', { value: cost })}</Title>`,
      errors: [{
        message: "Must include headingLevel attribute",
        type: "JSXOpeningElement"
      }]
    }
  ]
});
