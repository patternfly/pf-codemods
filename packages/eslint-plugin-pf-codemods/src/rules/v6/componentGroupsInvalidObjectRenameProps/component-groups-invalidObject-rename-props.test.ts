const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-invalidObject-rename-props";

const renameMap = {
  invalidObjectTitleText: "titleText",
  invalidObjectBodyText: "bodyText",
};

const getErrors = (component: string) =>
  Object.entries(renameMap).map(([oldName, newName]) => ({
    message: `The ${oldName} prop for ${component} has been renamed to ${newName}.`,
    type: "JSXOpeningElement",
  }));

const components = ["InvalidObject", "MissingPage"];

const valid = components
  .map((component) => [
    {
      code: `<${component} invalidObjectTitleText="" />`,
    },
    {
      code: `<${component} invalidObjectBodyText="" />`,
    },
    {
      code: `import { ${component} } from '@patternfly/react-component-groups'; <${component} someOtherProp />`,
    },
  ])
  .flat();

const invalid = components
  .map((component) => [
    {
      code: `import { ${component} } from '@patternfly/react-component-groups';
    <${component}
      invalidObjectTitleText="Sample title text"
      invalidObjectBodyText="Sample body text"
    />`,
      output: `import { ${component} } from '@patternfly/react-component-groups';
    <${component}
      titleText="Sample title text"
      bodyText="Sample body text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import ${component} from '@patternfly/react-component-groups/dist/cjs/${component}/index';
    <${component}
      invalidObjectTitleText="Sample title text"
      invalidObjectBodyText="Sample body text"
    />`,
      output: `import ${component} from '@patternfly/react-component-groups/dist/cjs/${component}/index';
    <${component}
      titleText="Sample title text"
      bodyText="Sample body text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import ${component} from '@patternfly/react-component-groups/dist/esm/${component}/index';
    <${component}
      invalidObjectTitleText="Sample title text"
      invalidObjectBodyText="Sample body text"
    />`,
      output: `import ${component} from '@patternfly/react-component-groups/dist/esm/${component}/index';
    <${component}
      titleText="Sample title text"
      bodyText="Sample body text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import ${component} from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <${component}
      invalidObjectTitleText="Sample title text"
      invalidObjectBodyText="Sample body text"
    />`,
      output: `import ${component} from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <${component}
      titleText="Sample title text"
      bodyText="Sample body text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import InvObj from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <InvObj
      invalidObjectTitleText="Sample title text"
      invalidObjectBodyText="Sample body text"
    />`,
      output: `import InvObj from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <InvObj
      titleText="Sample title text"
      bodyText="Sample body text"
    />`,
      errors: getErrors(component),
    },
  ])
  .flat();

ruleTester.run("component-groups-invalidObject-rename-props", rule, {
  valid,
  invalid,
});
