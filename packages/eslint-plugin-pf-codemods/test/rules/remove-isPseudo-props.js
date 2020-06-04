const ruleTester = require('../ruletester');
const rule = require('../../lib/rules/remove-isPseudo-props');

ruleTester.run("remove-isPseudo-props", rule, {
  valid: [
    {
      code: `import { Button } from '@patternfly/react-core'; <Button />`,
    }
  ],
  invalid: [
    {
      code:   `import { Button } from '@patternfly/react-core'; <Button isHover isFocus />`,
      output: `import { Button } from '@patternfly/react-core'; <Button   />`,
      errors: [
        {
          message: `isHover prop for Button has been removed`,
          type: "JSXOpeningElement",
        },
        {
          message: `isFocus prop for Button has been removed`,
          type: "JSXOpeningElement",
        },
      ]
    },
    {
      code:   `import { ContextSelectorToggle } from '@patternfly/react-core'; <ContextSelectorToggle isHovered isFocused />`,
      output: `import { ContextSelectorToggle } from '@patternfly/react-core'; <ContextSelectorToggle   />`,
      errors: [
        {
          message: `isHovered prop for ContextSelectorToggle has been removed`,
          type: "JSXOpeningElement",
        },
        {
          message: `isFocused prop for ContextSelectorToggle has been removed`,
          type: "JSXOpeningElement",
        },
      ]
    },
    {
      code:   `import { Chip } from '@patternfly/react-core'; <Chip isReadOnly />`,
      output: `import { Chip } from '@patternfly/react-core'; <Chip  />`,
      errors: [
        {
          message: `isReadOnly prop for Chip has been removed`,
          type: "JSXOpeningElement",
        },
      ]
    },
  ]
});
