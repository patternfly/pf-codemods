const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/nav-list-variant');
const navName = "Nav"
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
          navName: navName,
          variantVal: variant.default
        },
        type: "JSXElement",
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
          navName: navName,
          variantVal: variant.tertiary
        },
        type: "JSXElement",
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
          navName: navName,
          variantVal: variant.horizontal
        },
        type: "JSXElement",
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
          navName: navName,
          variantVal: variant.all
        },
        type: "JSXElement",
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
          navName: navName,
          variantVal: variant.all
        },
        type: "JSXElement",
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
          navName: navName,
          variantVal: variant.horizontal
        },
        type: "JSXElement",
      }]
    }
  ]
});


