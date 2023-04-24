const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/td-TdSelectType-TdActionsType-rename-disable");

ruleTester.run("td-TdSelectType-TdActionsType-rename-disable", rule, {
  valid: [
    {
      code: `import { Td } from "@patternfly/react-table";

      let myObj = { isDisabled: true };
      myObj["isDisabled"] = false;
      myObj.isDisabled = true;
      myObj = { isDisabled: false };
      
      <Td select={myObj} actions={{ isDisabled: false }}></Td>;
      
      const isDisabled = true;
      const obj = { isDisabled };
      <>
        <Td select={obj} actions={{ "isDisabled": true }}></Td>
        <Td select={{isDisabled}}></Td>
      </>;`,
    },
    {
      // No @patternfly/react-core import
      code: `
      let myObj = { disable: true };
      myObj["disable"] = false;
      myObj.disable = true;
      myObj = { disable: false };

      <Td select={myObj} actions={{ disable: false }}></Td>;

      const disable = true;
      const obj = { disable };
      <>
        <Td select={obj} actions={{ "disable": true }}></Td>
        <Td select={{disable}}></Td>
      </>;`,
    },
  ],
  invalid: [
    {
      code: `
      import { Td } from "@patternfly/react-table";

      let myObj = { disable: true };
      myObj["disable"] = false;
      myObj.disable = true;
      myObj = { disable: false };

      <Td select={myObj} actions={{ disable: false }}></Td>;

      const disable = true;
      const obj = { disable };
      <>
        <Td select={obj} actions={{ "disable": true }}></Td>
        <Td actions={myObj}></Td>
      </>;`,
      output: `
      import { Td } from "@patternfly/react-table";

      let myObj = { isDisabled: true };
      myObj["isDisabled"] = false;
      myObj.isDisabled = true;
      myObj = { isDisabled: false };

      <Td select={myObj} actions={{ isDisabled: false }}></Td>;

      const isDisabled = true;
      const obj = { isDisabled };
      <>
        <Td select={obj} actions={{ "isDisabled": true }}></Td>
        <Td actions={myObj}></Td>
      </>;`,
      errors: [
        {
          message: `'disable' prop of interface TdSelectType has been renamed to 'isDisabled'`,
          type: "JSXOpeningElement",
        },
        {
          message: `'disable' prop of interface TdActionsType has been renamed to 'isDisabled'`,
          type: "JSXOpeningElement",
        },
        {
          message: `'disable' prop of interface TdSelectType has been renamed to 'isDisabled'`,
          type: "JSXOpeningElement",
        },
        {
          message: `'disable' prop of interface TdActionsType has been renamed to 'isDisabled'`,
          type: "JSXOpeningElement",
        },
        {
          message: `'disable' prop of interface TdActionsType has been renamed to 'isDisabled'`,
          type: "JSXOpeningElement",
        } 
      ],
    },
  ],
});
