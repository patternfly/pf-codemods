const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-notAuthorized-rename-props";

const renameMap = {
  description: "bodyText",
  title: "titleText",
};

const getErrors = (component: string) =>
  Object.entries(renameMap).map(([oldName, newName]) => ({
    message: `The ${oldName} prop for ${component} has been renamed to ${newName}.`,
    type: "JSXOpeningElement",
  }));

const components = ["NotAuthorized", "UnauthorizedAccess"];

const valid = components
  .map((component) => [
    {
      code: `<${component} description="" />`,
    },
    {
      code: `<${component} title="" />`,
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
      description="Description text" 
      title="Title text"
    />`,
      output: `import { ${component} } from '@patternfly/react-component-groups';
    <${component}
      bodyText="Description text" 
      titleText="Title text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import ${component} from '@patternfly/react-component-groups/dist/cjs/${component}/index';
    <${component}
      description="Description text" 
      title="Title text"
    />`,
      output: `import ${component} from '@patternfly/react-component-groups/dist/cjs/${component}/index';
    <${component}
      bodyText="Description text" 
      titleText="Title text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import ${component} from '@patternfly/react-component-groups/dist/esm/${component}/index';
    <${component}
      description="Description text" 
      title="Title text"
    />`,
      output: `import ${component} from '@patternfly/react-component-groups/dist/esm/${component}/index';
    <${component}
      bodyText="Description text" 
      titleText="Title text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import ${component} from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <${component}
      description="Description text" 
      title="Title text"
    />`,
      output: `import ${component} from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <${component}
      bodyText="Description text" 
      titleText="Title text"
    />`,
      errors: getErrors(component),
    },
    {
      code: `import NotAuth from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <NotAuth
      description="Description text" 
      title="Title text"
    />`,
      output: `import NotAuth from '@patternfly/react-component-groups/dist/dynamic/${component}';
    <NotAuth
      bodyText="Description text" 
      titleText="Title text"
    />`,
      errors: getErrors(component),
    },
  ])
  .flat();

ruleTester.run("component-groups-notAuthorized-rename-props", rule, {
  valid,
  invalid,
});
