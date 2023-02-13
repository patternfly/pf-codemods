const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/menu-moved-ariaLabel");

ruleTester.run("menu-moved-ariaLabel", rule, {
  valid: [
    {
      code: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu><MenuList aria-label="tester" /></Menu>`,
    },
    {
      code: `import { Menu } from '@patternfly/react-core'; <Menu />`,
    },
    {
      // No @patternfly/react-core import
      code: `<Menu aria-label="tester"><MenuList /></Menu>`,
    },
    {
      // No @patternfly/react-core import
      code: `<Menu aria-label="tester" />`,
    },
  ],
  invalid: [
    {
      code: `import { Menu } from '@patternfly/react-core'; <Menu aria-label="tester" />`,
      output: `import { Menu } from '@patternfly/react-core'; <Menu  />`,
      errors: [
        {
          message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu aria-label="tester"><MenuList /></Menu>`,
      output: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu ><MenuList aria-label="tester" /></Menu>`,
      errors: [
        {
          message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu aria-label="tester"><MenuList></MenuList></Menu>`,
      output: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu ><MenuList aria-label="tester"></MenuList></Menu>`,
      errors: [
        {
          message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // No @patternfly/react-core import for MenuList
      code: `import { Menu } from '@patternfly/react-core'; <Menu aria-label="tester"><MenuList /></Menu>`,
      output: `import { Menu } from '@patternfly/react-core'; <Menu ><MenuList /></Menu>`,
      errors: [
        {
          message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu aria-label="tester"><MenuList /><MenuList /></Menu>`,
      output: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu ><MenuList /><MenuList /></Menu>`,
      errors: [
        {
          message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu aria-label="tester"><MenuList aria-label="another label"/></Menu>`,
      output: `import { Menu, MenuList } from '@patternfly/react-core'; <Menu ><MenuList aria-label="another label"/></Menu>`,
      errors: [
        {
          message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Menu, MenuGroup, MenuList } from '@patternfly/react-core'; <Menu aria-label="tester"><MenuGroup><MenuList /></MenuGroup></Menu>`,
      output: `import { Menu, MenuGroup, MenuList } from '@patternfly/react-core'; <Menu ><MenuGroup><MenuList /></MenuGroup></Menu>`,
      errors: [
        {
          message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
