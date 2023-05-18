const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/formControls-updated-markup");

const affectedWithoutProp = [
  "TextArea",
  "TextInput",
  "FormSelect",
  "TimePicker",
  "ClipboardCopy",
  "DatePicker",
  "FileUpload",
  "LoginPage",
  "NumberInput",
  "SearchInput",
  "TreeViewSearch",
];

ruleTester.run("formControls-updated-markup", rule, {
  valid: [
    // no @patternfly/react-core import
    {
      code: `<Slider />`,
    },
    // no @patternfly/react-core import
    {
      code: `<Select />`,
    },
    // no @patternfly/react-core import
    ...affectedWithoutProp.map((component) => ({ code: `<${component} />` })),
  ],
  invalid: [
    {
      code: `import { Slider } from '@patternfly/react-core';`,
      output: `import { Slider } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for Slider with the isInputVisible prop has been changed. Selectors may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated';`,
      output: `import { Select } from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `The markup for Select with the hasInlineFilter prop has been changed. Selectors may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
    ...affectedWithoutProp.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core';`,
      output: `import { ${component} } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for ${component} has been changed. Selectors may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    })),
    // Import from dist
    {
      code: `import { FormSelect } from '@patternfly/react-core/dist/esm/components/FormSelect/index.js';`,
      output: `import { FormSelect } from '@patternfly/react-core/dist/esm/components/FormSelect/index.js';`,
      errors: [
        {
          message: `The markup for FormSelect has been changed. Selectors may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
    // Aliased import
    {
      code: `import { FormSelect as PFFS } from '@patternfly/react-core';`,
      output: `import { FormSelect as PFFS } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for FormSelect has been changed. Selectors may need to be updated.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
