const ruleTester = require('../../ruletester');
import * as rule from './chip-replace-with-label';

ruleTester.run('chip-replace-with-label', rule, {
  valid: [
    {
      code: `<Chip  />`,
    },
    {
      code: `<ChipGroup />`,
    },
  ],
  invalid: [
    {
      code: `import { Chip } from '@patternfly/react-core/deprecated'; <Chip badge={identifier}onClick={handleOnClick} someOtherProp>This is a chip</Chip>`,
      output: `import { Label } from '@patternfly/react-core'; <Label variant="outline" onClose={handleOnClick} someOtherProp>This is a chip{identifier}</Label>`,
      errors: [
        {
          message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
          type: 'ImportDeclaration',
        },
        {
          message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
          type: 'JSXElement',
        },
      ],
    },
    {
      code: `import { ChipGroup } from '@patternfly/react-core/deprecated'; <ChipGroup someOtherProp>This is a chipgroup</ChipGroup>`,
      output: `import { LabelGroup } from '@patternfly/react-core'; <LabelGroup someOtherProp>This is a chipgroup</LabelGroup>`,
      errors: [
        {
          message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
          type: 'ImportDeclaration',
        },
        {
          message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
          type: 'JSXElement',
        },
      ],
    },
  ],
});
