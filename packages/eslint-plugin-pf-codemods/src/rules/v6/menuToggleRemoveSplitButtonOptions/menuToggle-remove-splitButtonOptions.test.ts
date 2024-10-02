const ruleTester = require("../../ruletester");
import * as rule from "./menuToggle-remove-splitButtonOptions";

const message =
  "We have replaced `splitButtonOptions` prop on MenuToggle with `splitButtonItems`. SplitButtonOptions interface has been removed, because its `variant` prop no longer supports the 'action' option. The `items` prop of SplitButtonOptions will be passed directly to MenuToggle's new `splitButtonItems` prop.";
const interfaceRemovedMessage = `The SplitButtonOptions interface has been removed.`;

const generalError = {
  message,
  type: "JSXOpeningElement",
};

ruleTester.run("menuToggle-remove-splitButtonOptions", rule, {
  valid: [
    {
      code: `<MenuToggle splitButtonOptions={{ items: ["Item 1", "Item 2"], variant: "action" }} />`,
    },
    {
      code: `import { MenuToggle } from '@patternfly/react-core'; <MenuToggle someOtherProp />`,
    },
  ],
  invalid: [
    {
      // object expression with "items" property - direct value
      code: `import { MenuToggle } from '@patternfly/react-core';
      <MenuToggle splitButtonOptions={{ items: ["Item 1", "Item 2"], variant: "action" }} />`,
      output: `import { MenuToggle } from '@patternfly/react-core';
      <MenuToggle splitButtonItems={["Item 1", "Item 2"]} />`,
      errors: [generalError],
    },
    {
      // object expression with "items" property - in a variable
      code: `import { MenuToggle } from '@patternfly/react-core';
      const sbItems = ["Item 1", "Item 2"];
      <MenuToggle splitButtonOptions={{ items: sbItems, variant: "action" }} />`,
      output: `import { MenuToggle } from '@patternfly/react-core';
      const sbItems = ["Item 1", "Item 2"];
      <MenuToggle splitButtonItems={sbItems} />`,
      errors: [generalError],
    },
    {
      // identifier
      code: `import { MenuToggle } from '@patternfly/react-core'; import { optionsObject } from 'somewhere';
      <MenuToggle splitButtonOptions={optionsObject} />`,
      output: `import { MenuToggle } from '@patternfly/react-core'; import { optionsObject } from 'somewhere';
      <MenuToggle splitButtonItems={optionsObject.items} />`,
      errors: [generalError],
    },
    {
      // object expression with a spreaded object
      code: `import { MenuToggle } from '@patternfly/react-core'; import { optionsObject } from 'somewhere';
      <MenuToggle splitButtonOptions={{ ...optionsObject }} />`,
      output: `import { MenuToggle } from '@patternfly/react-core'; import { optionsObject } from 'somewhere';
      <MenuToggle splitButtonItems={optionsObject.items} />`,
      errors: [generalError],
    },
    {
      // identifier + SplitButtonOptions type
      code: `import { MenuToggle, SplitButtonOptions } from '@patternfly/react-core';
      const sbOptions: SplitButtonOptions = { items: sbItems, variant: "action" };
      <MenuToggle splitButtonOptions={sbOptions} />`,
      output: `import { MenuToggle,  } from '@patternfly/react-core';
      const sbOptions = { items: sbItems, variant: "action" };
      <MenuToggle splitButtonItems={sbOptions.items} />`,
      errors: [
        {
          message: interfaceRemovedMessage,
          type: "ImportSpecifier",
        },
        {
          message: interfaceRemovedMessage,
          type: "Identifier",
        },
        generalError,
      ],
    },
    {
      // SplitButtonOptions named export
      code: `import { SplitButtonOptions } from '@patternfly/react-core';
      export { SplitButtonOptions as SBO };`,
      output: `
      `,
      errors: [
        {
          message: interfaceRemovedMessage,
          type: "ImportSpecifier",
        },
        {
          message: interfaceRemovedMessage,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      // SplitButtonOptions default export
      code: `import { SplitButtonOptions } from '@patternfly/react-core';
      export default SplitButtonOptions;`,
      output: `
      `,
      errors: [
        {
          message: interfaceRemovedMessage,
          type: "ImportSpecifier",
        },
        {
          message: interfaceRemovedMessage,
          type: "ExportDefaultDeclaration",
        },
      ],
    },
  ],
});
