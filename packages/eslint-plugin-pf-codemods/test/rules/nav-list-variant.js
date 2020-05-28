const ruleTester = require('./ruletester');
const rule = require('../../lib/rules/nav-list-variant');

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
      code: `import { Nav, NavList } from '@patternfly/react-core';
<Nav>
    <NavList variant>
        some item
    </NavList>
</Nav>`,
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
        message: `variant has been removed from NavList, use <Nav variant="default"> instead`,
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
        message: `variant has been removed from NavList, use <Nav variant="tertiary"> instead`,
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
        message: `variant has been removed from NavList, use <Nav variant="horizontal"> instead`,
        type: "JSXElement",
      }]
    }
  ]
});


