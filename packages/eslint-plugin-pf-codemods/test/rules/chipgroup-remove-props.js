const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/chipgroup-remove-props');

ruleTester.run("chipgroup-remove-props", rule, {
  valid: [
    {
      code: `import { ChipGroup } from '@patternfly/react-core'; <ChipGroup>button</ChipGroup>`,
    }
  ],
  invalid: [
    {
      code:   `import { ChipGroup } from '@patternfly/react-core'; <ChipGroup withToolbar>button</ChipGroup>`,
      output: `import { ChipGroup } from '@patternfly/react-core'; <ChipGroup categoryName="pf-codemod-category">button</ChipGroup>`,
      errors: [
        {
          message: `withToolbar has been removed from ChipGroup. Add the categoryName prop instead for a category.`,
          type: "JSXOpeningElement",
        },
      ]
    },
    {
      code:   `import { ChipGroup } from '@patternfly/react-core'; <ChipGroup categoryName="I already have a categoryName" withToolbar>button</ChipGroup>`,
      output: `import { ChipGroup } from '@patternfly/react-core'; <ChipGroup categoryName="I already have a categoryName" >button</ChipGroup>`,
      errors: [
        {
          message: `withToolbar has been removed from ChipGroup. Add the categoryName prop instead for a category.`,
          type: "JSXOpeningElement",
        },
      ]
    },
    {
      code:   `import { ChipGroup } from '@patternfly/react-core'; <ChipGroup headingLevel="123">button</ChipGroup>`,
      output: `import { ChipGroup } from '@patternfly/react-core'; <ChipGroup >button</ChipGroup>`,
      errors: [
        {
          message: `headingLevel has been removed from ChipGroup since the category name is now a <span>`,
          type: "JSXOpeningElement",
        },
      ]
    },
  ]
});
