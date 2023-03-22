const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/dropdown-update-deprecatedPath");
const dropdownExports = [
  "BadgeToggle",
  "Dropdown",
  "DropdownPosition",
  "DropdownDirection",
  "DropdownContext",
  "DropdownArrowContext",
  "DropdownGroup",
  "DropdownItem",
  "DropdownMenu",
  "DropdownSeparator",
  "DropdownToggle",
  "DropdownToggleAction",
  "DropdownToggleCheckbox",
  "DropdownWithContext",
  "KebabToggle",
];

ruleTester.run("dropdown-update-deprecatedPath", rule, {
  valid: [
    {
      code: `import { Dropdown } from '@patternfly/react-core/next'; <Dropdown />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Dropdown />`,
    },
    {
      // No @patternfly/react-core import
      code: `import { Dropdown } from 'foo'`,
    },
  ],
  invalid: [
    ...dropdownExports.map((dropdownExport) => ({
      code: `import { ${dropdownExport} } from '@patternfly/react-core'; <${dropdownExport} />`,
      output: `import { ${dropdownExport} as ${dropdownExport}Deprecated } from '@patternfly/react-core/deprecated'; <${dropdownExport}Deprecated />`,
      errors: [
        {
          message: `${dropdownExport} has been deprecated. In order to continue using the deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased.`,
          type: "ImportDeclaration",
        },
        {
          message: `${dropdownExport} has been deprecated. In order to continue using the deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...dropdownExports.map((dropdownExport) => ({
      code: `import { ${dropdownExport} as PF${dropdownExport} } from '@patternfly/react-core'; <PF${dropdownExport} />`,
      output: `import { ${dropdownExport} as PF${dropdownExport} } from '@patternfly/react-core/deprecated'; <PF${dropdownExport} />`,
      errors: [
        {
          message: `${dropdownExport} has been deprecated. In order to continue using the deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased.`,
          type: "ImportDeclaration",
        },
      ],
    })),
    ...dropdownExports.map((dropdownExport) => ({
      code: `import { ${dropdownExport}, Foo } from '@patternfly/react-core'; <${dropdownExport} />`,
      output: `import { Foo } from '@patternfly/react-core';\nimport { ${dropdownExport} as ${dropdownExport}Deprecated } from '@patternfly/react-core/deprecated'; <${dropdownExport}Deprecated />`,
      errors: [
        {
          message: `${dropdownExport} has been deprecated. In order to continue using the deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased.`,
          type: "ImportDeclaration",
        },
        {
          message: `${dropdownExport} has been deprecated. In order to continue using the deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
  ],
});
