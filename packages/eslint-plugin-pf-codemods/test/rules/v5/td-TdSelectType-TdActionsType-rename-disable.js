const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/td-TdSelectType-TdActionsType-rename-disable");

ruleTester.run("td-TdSelectType-TdActionsType-rename-disable", rule, {
  valid: [
    {
      code: `import { Td } from "@patternfly/react-table";
      const myObj = {isDisabled: true};
      <Td select={myObj} actions={{isDisabled: false}} ></Td>`,
    },
    {
      // No @patternfly/react-core import
      code: `
      const myObj = {"disable": true};
      <Td select={myObj} actions={{disable: false}} ></Td>`,
    },
  ],
  invalid: [
    {
      code: `
      import { Td } from "@patternfly/react-table";
      const myObj = {"disable": true};
      <Td select={myObj} actions={{disable: false}} ></Td>`,
      output: `
      import { Td } from "@patternfly/react-table";
      const myObj = {isDisabled: true};
      <Td select={myObj} actions={{isDisabled: false}} ></Td>`,
      errors: [
        {
          message: `'disable' prop of interface TdSelectType has been renamed to 'isDisabled'`,
          type: "JSXOpeningElement",
        },
        {
          message: `'disable' prop of interface TdActionsType has been renamed to 'isDisabled'`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
