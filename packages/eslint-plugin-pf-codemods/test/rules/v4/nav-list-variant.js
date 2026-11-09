const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v4/nav-list-variant');
const navListName = "NavList"
const variant = {
  default: 'variant="default"',
  tertiary: 'variant="tertiary"',
  horizontal: 'variant="horizontal"',
  all: 'variant={"horizontal" | "default" | "tertiary"}'
}

ruleTester.run("nav-list-variant", rule, {
  valid: [
    {
      code: `import { Nav, NavList } from '@patternfly/react-core';
<Nav variant="tertiary">
    <NavList>
        some item
    </NavList>
</Nav>`
    },
    {
      code: `import { NavList } from '@patternfly/react-core';
    <NavList>
        some item
    </NavList>`
    }
  ],
  invalid: [
    {
      code: `import { Nav, NavList } from '@patternfly/react-core';
<Nav>
    <NavList variant="default">
        some item
    </NavList>
</Nav>`,
      output: `import { Nav, NavList } from '@patternfly/react-core';
<Nav variant="default">
    <NavList >
        some item
    </NavList>
</Nav>`,
      errors: [{
        messageId: "removeNavListVariant",
        data: {
          navListName: navListName,
          variantVal: variant.default
        },
      }]
    },
    {
      code: `import { Nav, NavList } from '@patternfly/react-core';
<Nav>
    <NavList variant="tertiary">
        some item
    </NavList>
</Nav>`,
      output: `import { Nav, NavList } from '@patternfly/react-core';
<Nav variant="tertiary">
    <NavList >
        some item
    </NavList>
</Nav>`,
      errors: [{
        messageId: "removeNavListVariant",
        data: {
          navListName: navListName,
          variantVal: variant.tertiary
        },
      }]
    },
    {
      code:   `import { Nav, NavList } from '@patternfly/react-core';
<Nav>
    <NavList variant="horizontal">
        some item
    </NavList>
</Nav>`,
      output: `import { Nav, NavList } from '@patternfly/react-core';
<Nav variant="horizontal">
    <NavList >
        some item
    </NavList>
</Nav>`,
      errors: [{
        messageId: "removeNavListVariant",
        data: {
          navListName: navListName,
          variantVal: variant.horizontal
        },
      }]
    },
    {
      code: `import { Nav, NavList } from '@patternfly/react-core';
<Nav>
    <NavList variant>
        some item
    </NavList>
</Nav>`,
      output: `import { Nav, NavList } from '@patternfly/react-core';
<Nav>
    <NavList >
        some item
    </NavList>
</Nav>`,
      errors: [{
        messageId: "removeNavListVariant",
        data: {
          navListName: navListName,
          variantVal: variant.all
        },
      }]
    },
    {
      code: `import { NavList } from '@patternfly/react-core';
<NavList variant>
    some item
</NavList>`,
      output: `import { NavList } from '@patternfly/react-core';
<NavList >
    some item
</NavList>`,
      errors: [{
        messageId: "removeNavListVariant",
        data: {
          navListName: navListName,
          variantVal: variant.all
        },
      }]
    },
    {
      code: `import { NavList } from '@patternfly/react-core';
<NavList variant="horizontal">
    some item
</NavList>`,
      output: `import { NavList } from '@patternfly/react-core';
<NavList /*TODO: move to Nav - variant="horizontal"*/>
    some item
</NavList>`,
      errors: [{
        messageId: "removeNavListVariant",
        data: {
          navListName: navListName,
          variantVal: variant.horizontal
        },
      }]
    },
    {
      code: `import { NavList } from '@patternfly/react-core';
<NavList variant="simple">
    some item
</NavList>`,
      output: `import { NavList } from '@patternfly/react-core';
<NavList >
    some item
</NavList>`,
      errors: [{
        messageId: "removeNavListSimpleVariant",
      }]
    },
    {
      code: `import { NavList } from '@patternfly/react-core';
<Nav>
  <NavList variant="simple">
      some item
  </NavList>
</Nav>`,
      output: `import { NavList } from '@patternfly/react-core';
<Nav>
  <NavList >
      some item
  </NavList>
</Nav>`,
      errors: [{
        messageId: "removeNavListSimpleVariant",
      }]
    },
    {
      code: `import { Nav, NavList, NavListVariants } from '@patternfly/react-core';
<Nav>
  <NavList variant={NavListVariants.tertiary}>
      some item
  </NavList>
</Nav>`,
      output: `import { Nav, NavList, NavListVariants } from '@patternfly/react-core';
<Nav variant="tertiary">
  <NavList >
      some item
  </NavList>
</Nav>`,
    errors: [{
      messageId: "removeNavListVariant",
      data: {
        navListName: navListName,
        variantVal: `variant="tertiary"`
      },
    }]
    }
  ]
});


