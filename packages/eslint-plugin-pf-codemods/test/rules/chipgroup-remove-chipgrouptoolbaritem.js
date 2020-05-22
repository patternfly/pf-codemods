const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/chipgroup-remove-chipgrouptoolbaritem');

ruleTester.run("chipgroup-remove-chipgrouptoolbaritem", rule, {
  valid: [
    // {
    //   code: `VALID_CODE_HERE`,
    // }
  ],
  invalid: [
    {
      code:   `import { ChipGroup, ChipGroupToolbarItem } from '@patternfly/react-core';
<ChipGroup>
  <ChipGroupToolbarItem prop1="ab" prop2="bc">
    Item
    <Chip>
      Another item
    </Chip>
  </ChipGroupToolbarItem>
</ChipGroup>`,
      output: `import { ChipGroup, ChipGroupToolbarItem } from '@patternfly/react-core';
<ChipGroup prop1="ab" prop2="bc">
  
    Item
    <Chip>
      Another item
    </Chip>
  
</ChipGroup>`,
      errors: [{
        message: `ChipGroupToolbarItem has been removed, move its props up to parent ChipGroup`,
        type: "JSXElement",
      }]
    },
  ]
});
