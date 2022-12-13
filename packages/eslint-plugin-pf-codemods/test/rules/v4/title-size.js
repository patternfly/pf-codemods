const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/title-size');

ruleTester.run("title-size", rule, {
  valid: [
    {
      code: `import { Title } from '@patternfly/react-core'; <Title size="md" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Title size="sm" />`,
    },
    {
      code: `import { Title } from '@patternfly/react-core'; <Title size="4xl" />`,
    },
    {
      // No size attribute
      code: `import { Title } from '@patternfly/react-core'; <Title />`,
    },
  ],
  invalid: [
    {
      code:   `import { Title } from '@patternfly/react-core'; <Title size="sm">MyTitle</Title>`,
      output: `import { Title } from '@patternfly/react-core'; <Title size="md">MyTitle</Title>`,
      errors: [{
        message: `size "sm" has been removed for Title. Use size=md|lg|xl|2xl|3xl|4xl instead`,
        type: "JSXOpeningElement",
      }]
    },
    // Suggest TitleSize.xl -> "xl"
    {
      code:   `import { Title, TitleSize } from '@patternfly/react-core'; <Title size={TitleSize.xl}>MyTitle</Title>`,
      output: `import { Title, TitleSize } from '@patternfly/react-core'; <Title size="xl">MyTitle</Title>`,
      errors: [{
        message: `size {TitleSize.xl} has been removed for Title. Use size=md|lg|xl|2xl|3xl|4xl instead`,
        type: "JSXOpeningElement",
      }]
    },
    // Suggest TitleSize.sm -> "md"
    {
      code:   `import { Title, TitleSize } from '@patternfly/react-core'; <Title size={TitleSize.sm}>MyTitle</Title>`,
      output: `import { Title, TitleSize } from '@patternfly/react-core'; <Title size="md">MyTitle</Title>`,
      errors: [{
        message: `size {TitleSize.sm} has been removed for Title. Use size=md|lg|xl|2xl|3xl|4xl instead`,
        type: "JSXOpeningElement",
      }]
    }
  ]
});
