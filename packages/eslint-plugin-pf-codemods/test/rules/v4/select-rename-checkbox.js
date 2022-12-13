const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/select-rename-checkbox');

ruleTester.run("select-rename-checkbox", rule, {
  valid: [
    {
      code: `import { CheckboxSelect, CheckboxSelectOption } from '@patternfly/react-core';
<Select variant="checkbox">
  <SelectOption>option1</SelectOption>
  <SelectOption>option2</SelectOption>
</Select>`,
    }
  ],
  invalid: [
    {
      code:   `import { CheckboxSelect } from '@patternfly/react-core'; <CheckboxSelect>{items}</CheckboxSelect>`,
      output: `import { CheckboxSelect } from '@patternfly/react-core'; <Select variant="checkbox">{items}</Select>`,
      errors: [
        {
          message: `CheckboxSelect has been removed. Use <Select variant="checkbox"> instead.`,
          type: "JSXIdentifier",
        },
        {
          message: `CheckboxSelect has been removed. Use <Select variant="checkbox"> instead.`,
          type: "JSXIdentifier",
        },
      ]
    },
    {
      code:   `import { CheckboxSelectOption } from '@patternfly/react-core'; <CheckboxSelectOption>{items}</CheckboxSelectOption>`,
      output: `import { CheckboxSelectOption } from '@patternfly/react-core'; <SelectOption>{items}</SelectOption>`,
      errors: [
        {
          message: `CheckboxSelectOption has been removed. Use <SelectOption> instead.`,
          type: "JSXIdentifier",
        },
        {
          message: `CheckboxSelectOption has been removed. Use <SelectOption> instead.`,
          type: "JSXIdentifier",
        },
      ]
    },
    {
      code:   `import { CheckboxSelect, CheckboxSelectOption } from '@patternfly/react-core';
<CheckboxSelect>
  <CheckboxSelectOption>option1</CheckboxSelectOption>
  <CheckboxSelectOption>option2</CheckboxSelectOption>
</CheckboxSelect>`,
      output: `import { CheckboxSelect, CheckboxSelectOption } from '@patternfly/react-core';
<Select variant="checkbox">
  <SelectOption>option1</SelectOption>
  <SelectOption>option2</SelectOption>
</Select>`,
      errors: [
        {
          message: 'CheckboxSelect has been removed. Use <Select variant="checkbox"> instead.',
          type: 'JSXIdentifier'
        },
        {
          message: 'CheckboxSelectOption has been removed. Use <SelectOption> instead.',
          type: 'JSXIdentifier'
        },
        {
          message: 'CheckboxSelectOption has been removed. Use <SelectOption> instead.',
          type: 'JSXIdentifier'
        },
        {
          message: 'CheckboxSelectOption has been removed. Use <SelectOption> instead.',
          type: 'JSXIdentifier'
        },
        {
          message: 'CheckboxSelectOption has been removed. Use <SelectOption> instead.',
          type: 'JSXIdentifier'
        },
        {
          message: 'CheckboxSelect has been removed. Use <Select variant="checkbox"> instead.',
          type: 'JSXIdentifier'
        }
      ]
    },
  ]
});
