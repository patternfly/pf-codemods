const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/menu-search-rename");

ruleTester.run("menu-search-rename", rule, {
  valid: [
    {
      code: `import { MenuSearchInput, MenuSearch } from '@patternfly/react-core'; <MenuSearch><MenuSearchInput /></MenuSearch>`,
    },
    // No @patternfly/react-core import
    { code: `<MenuInput />` },
  ],
  invalid: [
    {
      code: `import { MenuInput } from '@patternfly/react-core'; <MenuInput><div /></MenuInput>`,
      output: `import { MenuInput, MenuSearch, MenuSearchInput } from '@patternfly/react-core'; <MenuSearch><MenuSearchInput><div /></MenuSearchInput></MenuSearch>`,
      errors: [
        {
          message: 'add missing imports MenuSearch, MenuSearchInput from @patternfly/react-core',
          type: "ImportDeclaration"
        },
        {
          message: `MenuInput has been renamed to MenuSearchInput and MenuSearch has been added as a wrapper.`,
          type: "JSXOpeningElement",
        }
      ],
    },
    {
      code: `import { MenuInput } from '@patternfly/react-core'; <MenuInput />`,
      output: `import { MenuInput, MenuSearch, MenuSearchInput } from '@patternfly/react-core'; <MenuSearch><MenuSearchInput /></MenuSearch>`,
      errors: [
        {
          message: 'add missing imports MenuSearch, MenuSearchInput from @patternfly/react-core',
          type: "ImportDeclaration"
        },
        {
          message: `MenuInput has been renamed to MenuSearchInput and MenuSearch has been added as a wrapper.`,
          type: "JSXOpeningElement",
        }
      ],
    },
  ],
});
