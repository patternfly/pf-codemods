const ruleTester = require('../../ruletester');
import * as rule from './chip-replace-with-label';

const chipImportError = {
  message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
  type: 'ImportDeclaration',
};

ruleTester.run('chip-replace-with-label', rule, {
  valid: [
    {
      code: `<Chip />`,
    },
    {
      code: `<ChipGroup />`,
    },
    // with import not from the deprecated package
    {
      code: `import { Chip, ChipGroup } from '@patternfly/react-core'; <ChipGroup><Chip /></ChipGroup>`,
    },
  ],
  invalid: [
    {
      code: `import { Chip } from '@patternfly/react-core/deprecated'; <Chip badge={identifier}onClick={handleOnClick} someOtherProp>This is a chip</Chip>`,
      output: `import { Label } from '@patternfly/react-core'; <Label variant="outline" onClose={handleOnClick} someOtherProp>This is a chip {identifier}</Label>`,
      errors: [chipImportError],
    },
    {
      code: `import { ChipGroup } from '@patternfly/react-core/deprecated'; <ChipGroup someOtherProp>This is a chipgroup</ChipGroup>`,
      output: `import { LabelGroup } from '@patternfly/react-core'; <LabelGroup someOtherProp>This is a chipgroup</LabelGroup>`,
      errors: [chipImportError],
    },
    // with Chip nested in ChipGroup
    {
      code: `import { Chip, ChipGroup } from '@patternfly/react-core/deprecated';
      <ChipGroup>
        <Chip badge={identifier}onClick={handleOnClick} someOtherProp>This is a chip</Chip>
      </ChipGroup>`,
      output: `import { Label, LabelGroup } from '@patternfly/react-core';
      <LabelGroup>
        <Label variant="outline" onClose={handleOnClick} someOtherProp>This is a chip {identifier}</Label>
      </LabelGroup>`,
      errors: [chipImportError],
    },
    // with aliased Chip and ChipGroup
    {
      code: `import { Chip as PFChip, ChipGroup as PFChipGroup } from '@patternfly/react-core/deprecated';
      <PFChipGroup>
        <PFChip>This is a chip</PFChip>
      </PFChipGroup>`,
      output: `import { Label, LabelGroup } from '@patternfly/react-core';
      <LabelGroup>
        <Label variant="outline">This is a chip</Label>
      </LabelGroup>`,
      errors: [chipImportError],
    },
    // with other import specifiers from the deprecated package
    {
      code: `import { Chip, Select } from '@patternfly/react-core/deprecated'; 
      <Chip badge={identifier} onClick={handleOnClick} someOtherProp>
        This is a chip
      </Chip>`,
      output: `import {  Select } from '@patternfly/react-core/deprecated';import { Label } from '@patternfly/react-core'; 
      <Label variant="outline"  onClose={handleOnClick} someOtherProp>
        This is a chip
       {identifier}</Label>`,
      errors: [chipImportError],
    },
    // with Label import already included
    {
      code: `import { Label } from '@patternfly/react-core';
      import { Chip } from '@patternfly/react-core/deprecated';
      <>
      <Chip badge={identifier} onClick={handleOnClick} someOtherProp>
        This is a chip
      </Chip>
      <Label>
        This is a label
      </Label>
      </>`,
      output: `import { Label } from '@patternfly/react-core';
      
      <>
      <Label variant="outline"  onClose={handleOnClick} someOtherProp>
        This is a chip
       {identifier}</Label>
      <Label>
        This is a label
      </Label>
      </>`,
      errors: [chipImportError],
    },
    // with LabelGroup import already included
    {
      code: `import { LabelGroup } from '@patternfly/react-core';
      import { Chip, ChipGroup } from '@patternfly/react-core/deprecated';
      <>
        <ChipGroup>
          <Chip badge={identifier} onClick={handleOnClick} someOtherProp>
            This is a chip
          </Chip>
        </ChipGroup>
        <LabelGroup>
          This is a label group
        </LabelGroup>
      </>`,
      output: `import { LabelGroup, Label } from '@patternfly/react-core';
      
      <>
        <LabelGroup>
          <Label variant="outline"  onClose={handleOnClick} someOtherProp>
            This is a chip
           {identifier}</Label>
        </LabelGroup>
        <LabelGroup>
          This is a label group
        </LabelGroup>
      </>`,
      errors: [chipImportError],
    },
    // with Label and LabelGroup imports already included with aliases
    {
      code: `import { Label as PFLabel, LabelGroup as PFLabelGroup } from '@patternfly/react-core';
      import { Chip, ChipGroup } from '@patternfly/react-core/deprecated';
      <>
        <ChipGroup>
          <Chip>
            This is a chip
          </Chip>
        </ChipGroup>
        <PFLabelGroup>
          <PFLabel>
            This is a label
          </PFLabel>
        </PFLabelGroup>
      </>`,
      output: `import { Label as PFLabel, LabelGroup as PFLabelGroup } from '@patternfly/react-core';
      
      <>
        <PFLabelGroup>
          <PFLabel variant="outline">
            This is a chip
          </PFLabel>
        </PFLabelGroup>
        <PFLabelGroup>
          <PFLabel>
            This is a label
          </PFLabel>
        </PFLabelGroup>
      </>`,
      errors: [chipImportError],
    },
  ],
});
