const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-invalidObject-rename-props";

const renameMap = {
  invalidObjectTitleText: "titleText",
  invalidObjectBodyText: "bodyText",
};

const errors = Object.entries(renameMap).map(([oldName, newName]) => ({
  message: `The ${oldName} prop for InvalidObject has been renamed to ${newName}.`,
  type: "JSXOpeningElement",
}));

ruleTester.run("component-groups-invalidObject-rename-props", rule, {
  valid: [
    {
      code: `<InvalidObject invalidObjectTitleText="" />`,
    },
    {
      code: `<InvalidObject invalidObjectBodyText="" />`,
    },
    {
      code: `import { InvalidObject } from '@patternfly/react-component-groups'; <InvalidObject someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { InvalidObject } from '@patternfly/react-component-groups';
      <InvalidObject
        invalidObjectTitleText="Sample title text"
        invalidObjectBodyText="Sample body text"
      />`,
      output: `import { InvalidObject } from '@patternfly/react-component-groups';
      <InvalidObject
        titleText="Sample title text"
        bodyText="Sample body text"
      />`,
      errors,
    },
    {
      code: `import InvalidObject from '@patternfly/react-component-groups/dist/cjs/InvalidObject/index';
      <InvalidObject
        invalidObjectTitleText="Sample title text"
        invalidObjectBodyText="Sample body text"
      />`,
      output: `import InvalidObject from '@patternfly/react-component-groups/dist/cjs/InvalidObject/index';
      <InvalidObject
        titleText="Sample title text"
        bodyText="Sample body text"
      />`,
      errors,
    },
    {
      code: `import InvalidObject from '@patternfly/react-component-groups/dist/esm/InvalidObject/index';
      <InvalidObject
        invalidObjectTitleText="Sample title text"
        invalidObjectBodyText="Sample body text"
      />`,
      output: `import InvalidObject from '@patternfly/react-component-groups/dist/esm/InvalidObject/index';
      <InvalidObject
        titleText="Sample title text"
        bodyText="Sample body text"
      />`,
      errors,
    },
    {
      code: `import InvalidObject from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';
      <InvalidObject
        invalidObjectTitleText="Sample title text"
        invalidObjectBodyText="Sample body text"
      />`,
      output: `import InvalidObject from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';
      <InvalidObject
        titleText="Sample title text"
        bodyText="Sample body text"
      />`,
      errors,
    },
    {
      code: `import InvObj from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';
      <InvObj
        invalidObjectTitleText="Sample title text"
        invalidObjectBodyText="Sample body text"
      />`,
      output: `import InvObj from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';
      <InvObj
        titleText="Sample title text"
        bodyText="Sample body text"
      />`,
      errors,
    },
  ],
});
