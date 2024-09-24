const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-invalidObject-rename-to-missingPage";

const errors = [
  {
    message: `InvalidObject has been renamed to MissingPage.`,
    type: "JSXOpeningElement",
  },
];

ruleTester.run("component-groups-invalidObject-rename-to-missingPage", rule, {
  valid: [
    // missing import
    {
      code: `<InvalidObject />`,
    },
    // import from wrong package
    {
      code: `import { InvalidObject } from '@patternfly/react-core'; <InvalidObject />`,
    },
  ],
  invalid: [
    {
      code: `import { InvalidObject } from '@patternfly/react-component-groups'; <InvalidObject />`,
      output: `import { MissingPage } from '@patternfly/react-component-groups'; <MissingPage data-codemods />`,
      errors,
    },
    // named import with alias
    {
      code: `import { InvalidObject as InvObj } from '@patternfly/react-component-groups'; <InvObj />`,
      output: `import { MissingPage as InvObj } from '@patternfly/react-component-groups'; <InvObj />`,
      errors,
    },
    // default imports
    {
      code: `import InvalidObject from '@patternfly/react-component-groups/dist/cjs/InvalidObject/index'; <InvalidObject />`,
      output: `import MissingPage from '@patternfly/react-component-groups/dist/cjs/MissingPage/index'; <MissingPage data-codemods />`,
      errors,
    },
    {
      code: `import InvalidObject from '@patternfly/react-component-groups/dist/esm/InvalidObject/index'; <InvalidObject />`,
      output: `import MissingPage from '@patternfly/react-component-groups/dist/esm/MissingPage/index'; <MissingPage data-codemods />`,
      errors,
    },
    {
      code: `import InvalidObject from '@patternfly/react-component-groups/dist/dynamic/InvalidObject'; <InvalidObject />`,
      output: `import MissingPage from '@patternfly/react-component-groups/dist/dynamic/MissingPage'; <MissingPage data-codemods />`,
      errors,
    },
    // default import with name not matching the component name
    {
      code: `import InvObj from '@patternfly/react-component-groups/dist/dynamic/InvalidObject'; <InvObj />`,
      output: `import InvObj from '@patternfly/react-component-groups/dist/dynamic/MissingPage'; <InvObj />`,
      errors,
    },
  ],
});
