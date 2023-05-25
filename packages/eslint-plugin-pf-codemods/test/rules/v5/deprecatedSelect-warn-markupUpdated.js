const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/deprecatedSelect-warn-markupUpdated");

ruleTester.run("deprecatedSelect-warn-markupUpdated", rule, {
  valid: [
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; <Select />`,
    },
    {
      code: `import { Select } from '@patternfly/react-core'; <Select variant="typeahead" />`,
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; <Select variant="checkbox" />`,
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; <Select variant={SelectVariant.checkbox} />`,
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; const variant = "checkbox"; <Select variant={variant} />`,
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; const variant = SelectVariant.checkbox; <Select variant={variant} />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Select variant="typeahead" />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Select variant={SomeVariant.typeahead} />`,
    },
  ],
  invalid: [
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; <Select variant="typeahead" />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; <Select variant={SelectVariant.typeahead} />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; const variant = "typeahead"; <Select variant={variant} />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; const variant = SelectVariant.typeahead; <Select variant={variant} />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // Multiple typeahead tests
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; <Select variant="typeaheadmulti" />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated'; <Select variant={SelectVariant.typeaheadMulti} />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // Import from dist
    {
      code: `import { Select } from '@patternfly/react-core/dist/esm/deprecated/components/Select/index.js'; <Select variant="typeahead" />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // Aliased import
    {
      code: `import { Select as DeprecatedSelect } from '@patternfly/react-core/deprecated'; <DeprecatedSelect variant="typeahead" />`,
      errors: [
        {
          message:
            "Typeahead variants of our deprecated Select have had their markup changed. Selectors may need updating.",
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
