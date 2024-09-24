const ruleTester = require("../../ruletester");
import * as rule from "./dataListAction-remove-isPlainButtonAction-prop";

ruleTester.run("dataListAction-remove-isPlainButtonAction-prop", rule, {
  valid: [
    {
      code: `<DataListAction isPlainButtonAction />`,
    },
    {
      code: `import { DataListAction } from '@patternfly/react-core'; <DataListAction someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { DataListAction } from '@patternfly/react-core'; <DataListAction isPlainButtonAction />`,
      output: `import { DataListAction } from '@patternfly/react-core'; <DataListAction  />`,
      errors: [
        {
          message: `The \`isPlainButtonAction\` prop has been removed from DataListAction as a wrapper is no longer needed .`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
