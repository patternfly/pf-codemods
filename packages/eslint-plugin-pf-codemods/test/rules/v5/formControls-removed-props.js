const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/formControls-removed-props");

ruleTester.run("formControls-removed-props", rule, {
  valid: [
    {
      code: `import { FormSelect } from '@patternfly/react-core'; <FormSelect />`,
    },
    {
      code: `import { TextArea } from '@patternfly/react-core'; <TextArea readOnlyVariant="plain" />`,
    },
    {
      code: `import { TextInput } from '@patternfly/react-core'; <TextInput readOnlyVariant="plain" />`,
    },
    // no @patternfly/react-core import
    {
      code: `<FormSelect isIconSprite />`,
    },
    // no @patternfly/react-core import
    {
      code: `<TextArea isReadOnly isIconSprite />`,
    },
    // no @patternfly/react-core import
    {
      code: `<TextInput iconVariant customIconUrl customIconDimensions isReadOnly isIconSprite />`,
    },
  ],
  invalid: [
    {
      code: `import { FormSelect } from '@patternfly/react-core'; <FormSelect isIconSprite />`,
      output: `import { FormSelect } from '@patternfly/react-core'; <FormSelect  />`,
      errors: [
        {
          message: `isIconSprite prop for FormSelect has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { TextArea } from '@patternfly/react-core'; <TextArea isIconSprite />`,
      output: `import { TextArea } from '@patternfly/react-core'; <TextArea  />`,
      errors: [
        {
          message: `isIconSprite prop for TextArea has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { TextInput } from '@patternfly/react-core'; <TextInput isIconSprite iconVariant customIconUrl customIconDimensions />`,
      output: `import { TextInput } from '@patternfly/react-core'; <TextInput     />`,
      errors: [
        {
          message: `isIconSprite prop for TextInput has been removed`,
          type: "JSXOpeningElement",
        },
        {
          message: `"iconVariant" prop on TextInput has been removed. We recommend using the customIcon prop instead.`,
          type: "JSXOpeningElement",
        },
        {
          message: `"customIconUrl" prop on TextInput has been removed. We recommend using the customIcon prop instead.`,
          type: "JSXOpeningElement",
        },
        {
          message: `customIconDimensions prop for TextInput has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // isReadOnly without readOnlyVariant present
    {
      code: `import { TextArea, TextInput } from '@patternfly/react-core'; <><TextArea isReadOnly /><TextInput isReadOnly /></>`,
      output: `import { TextArea, TextInput } from '@patternfly/react-core'; <><TextArea  readOnlyVariant="default" /><TextInput  readOnlyVariant="default" /></>`,
      errors: [
        {
          message: `"isReadOnly" prop on TextArea has been removed and should be replaced with the "readOnlyVariant" prop.`,
          type: "JSXOpeningElement",
        },
        {
          message: `"isReadOnly" prop on TextInput has been removed and should be replaced with the "readOnlyVariant" prop.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // isReadOnly with existing readOnlyVariant
    {
      code: `import { TextArea, TextInput } from '@patternfly/react-core'; <><TextArea isReadOnly readOnlyVariant="plain" /><TextInput isReadOnly readOnlyVariant="plain" /></>`,
      output: `import { TextArea, TextInput } from '@patternfly/react-core'; <><TextArea  readOnlyVariant="plain" /><TextInput  readOnlyVariant="plain" /></>`,
      errors: [
        {
          message: `"isReadOnly" prop on TextArea has been removed and should be replaced with the "readOnlyVariant" prop.`,
          type: "JSXOpeningElement",
        },
        {
          message: `"isReadOnly" prop on TextInput has been removed and should be replaced with the "readOnlyVariant" prop.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Import from dist
    {
      code: `import { FormSelect } from '@patternfly/react-core/dist/esm/components/FormSelect/index.js'; <FormSelect isIconSprite />`,
      output: `import { FormSelect } from '@patternfly/react-core/dist/esm/components/FormSelect/index.js'; <FormSelect  />`,
      errors: [
        {
          message: `isIconSprite prop for FormSelect has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Aliased import
    {
      code: `import { FormSelect as PFFS } from '@patternfly/react-core'; <PFFS isIconSprite />`,
      output: `import { FormSelect as PFFS } from '@patternfly/react-core'; <PFFS  />`,
      errors: [
        {
          message: `isIconSprite prop for PFFS has been removed`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
