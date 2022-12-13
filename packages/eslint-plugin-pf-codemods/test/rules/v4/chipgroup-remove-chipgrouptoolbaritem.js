const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/chipgroup-remove-chipgrouptoolbaritem');

ruleTester.run("chipgroup-remove-chipgrouptoolbaritem", rule, {
  valid: [
    {
      code: `import { ChipGroup, ChipGroupToolbarItem } from '@patternfly/react-core';
<ChipGroup prop1="ab" prop2="bc">
    <Chip>
      Another item
    </Chip>
</ChipGroup>`,
    },
    {
      code: `<ChipGroupToolbarItem />`,
    }
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
        message: `ChipGroupToolbarItem has been removed, move its props up to parent ChipGroup and remove it`,
        type: "JSXElement",
      }]
    },
    {
      code:   `import { ChipGroup, ChipGroupToolbarItem } from '@patternfly/react-core';
<ChipGroup>
  <ChipGroupToolbarItem prop1="ab" prop2="bc">
    Item
    <Chip>
      Another item
    </Chip>
  </ChipGroupToolbarItem>
  <ChipGroupToolbarItem>
  </ChipGroupToolbarItem>
</ChipGroup>`,
      output: `import { ChipGroup, ChipGroupToolbarItem } from '@patternfly/react-core';
<ChipGroup>
  <ChipGroupToolbarItem prop1="ab" prop2="bc">
    Item
    <Chip>
      Another item
    </Chip>
  </ChipGroupToolbarItem>
  <ChipGroupToolbarItem>
  </ChipGroupToolbarItem>
</ChipGroup>`,
      errors: [
        {
          message: `ChipGroupToolbarItem has been removed, move its props up to parent ChipGroup and remove it`,
          type: "JSXElement",
        },
        {
          message: `ChipGroupToolbarItem has been removed, move its props up to parent ChipGroup and remove it`,
          type: "JSXElement",
        }
      ]
    },
  ]
});
