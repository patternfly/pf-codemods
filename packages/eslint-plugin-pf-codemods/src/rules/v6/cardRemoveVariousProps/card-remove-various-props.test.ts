const ruleTester = require("../../ruletester");
import * as rule from "./card-remove-various-props";

interface InvalidTest {
  code: string;
  output: string;
  errors: { message: string }[];
}

const removedBooleanProps = [
  "isSelectableRaised",
  "isDisabledRaised",
  "hasSelectableInput",
  "isFlat",
  "isRounded",
];
const removedStringProps = ["selectableInputAriaLabel"];
const removedFunctionProps = ["onSelectableInputChange"];

const removedBooleanPropTests = removedBooleanProps.map((prop) => ({
  code: `import { Card } from '@patternfly/react-core'; <Card ${prop} />`,
  output: `import { Card } from '@patternfly/react-core'; <Card  />`,
  errors: [{ message: `The ${prop} prop has been removed` }],
}));

const removedStringPropTests = removedStringProps.reduce((acc, prop) => {
  return [
    ...acc,
    {
      code: `import { Card } from '@patternfly/react-core'; <Card ${prop}='foo bar' />`,
      output: `import { Card } from '@patternfly/react-core'; <Card  />`,
      errors: [{ message: `The ${prop} prop has been removed` }],
    },
    {
      code: `import { Card } from '@patternfly/react-core'; const foo = "foo bar"; <Card ${prop}={foo} />`,
      output: `import { Card } from '@patternfly/react-core'; const foo = "foo bar"; <Card  />`,
      errors: [{ message: `The ${prop} prop has been removed` }],
    },
  ];
}, [] as InvalidTest[]);

const removedFunctionPropTests = removedFunctionProps.reduce((acc, prop) => {
  return [
    ...acc,
    {
      code: `import { Card } from '@patternfly/react-core'; <Card ${prop}={() => {}} />`,
      output: `import { Card } from '@patternfly/react-core'; <Card  />`,
      errors: [{ message: `The ${prop} prop has been removed` }],
    },
    {
      code: `import { Card } from '@patternfly/react-core'; const foo = () => {}; <Card ${prop}={foo} />`,
      output: `import { Card } from '@patternfly/react-core'; const foo = () => {}; <Card  />`,
      errors: [{ message: `The ${prop} prop has been removed` }],
    },
    {
      code: `import { Card } from '@patternfly/react-core'; function foo() {}; <Card ${prop}={foo} />`,
      output: `import { Card } from '@patternfly/react-core'; function foo() {}; <Card  />`,
      errors: [{ message: `The ${prop} prop has been removed` }],
    },
  ];
}, [] as InvalidTest[]);

ruleTester.run("card-remove-various-props", rule, {
  valid: [
    {
      code: `<Card isSelectableRaised isDisabledRaised hasSelectableInput selectableInputAriaLabel='foo bar' onSelectableInputChange={() => {}} isFlat isRounded />`,
    },
    {
      code: `import { Card } from '@patternfly/react-core'; <Card someOtherProp />`,
    },
  ],
  invalid: [
    ...removedBooleanPropTests,
    ...removedStringPropTests,
    ...removedFunctionPropTests,
  ],
});
