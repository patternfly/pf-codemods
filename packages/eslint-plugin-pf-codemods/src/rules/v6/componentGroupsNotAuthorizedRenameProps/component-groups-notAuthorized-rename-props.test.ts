const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-notAuthorized-rename-props";

const renameMap = {
  description: "bodyText",
  title: "titleText",
};

const errors = Object.entries(renameMap).map(([oldName, newName]) => ({
  message: `The ${oldName} prop for NotAuthorized has been renamed to ${newName}.`,
  type: "JSXOpeningElement",
}));

ruleTester.run("component-groups-notAuthorized-rename-props", rule, {
  valid: [
    {
      code: `<NotAuthorized description="" />`,
    },
    {
      code: `<NotAuthorized title="" />`,
    },
    {
      code: `import { NotAuthorized } from '@patternfly/react-component-groups'; <NotAuthorized someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { NotAuthorized } from '@patternfly/react-component-groups';
      <NotAuthorized
        description="Description text" 
        title="Title text"
      />`,
      output: `import { NotAuthorized } from '@patternfly/react-component-groups';
      <NotAuthorized
        bodyText="Description text" 
        titleText="Title text"
      />`,
      errors,
    },
    {
      code: `import NotAuthorized from '@patternfly/react-component-groups/dist/cjs/NotAuthorized/index';
      <NotAuthorized
        description="Description text" 
        title="Title text"
      />`,
      output: `import NotAuthorized from '@patternfly/react-component-groups/dist/cjs/NotAuthorized/index';
      <NotAuthorized
        bodyText="Description text" 
        titleText="Title text"
      />`,
      errors,
    },
    {
      code: `import NotAuthorized from '@patternfly/react-component-groups/dist/esm/NotAuthorized/index';
      <NotAuthorized
        description="Description text" 
        title="Title text"
      />`,
      output: `import NotAuthorized from '@patternfly/react-component-groups/dist/esm/NotAuthorized/index';
      <NotAuthorized
        bodyText="Description text" 
        titleText="Title text"
      />`,
      errors,
    },
    {
      code: `import NotAuthorized from '@patternfly/react-component-groups/dist/dynamic/NotAuthorized';
      <NotAuthorized
        description="Description text" 
        title="Title text"
      />`,
      output: `import NotAuthorized from '@patternfly/react-component-groups/dist/dynamic/NotAuthorized';
      <NotAuthorized
        bodyText="Description text" 
        titleText="Title text"
      />`,
      errors,
    },
    {
      code: `import NotAuth from '@patternfly/react-component-groups/dist/dynamic/NotAuthorized';
      <NotAuth
        description="Description text" 
        title="Title text"
      />`,
      output: `import NotAuth from '@patternfly/react-component-groups/dist/dynamic/NotAuthorized';
      <NotAuth
        bodyText="Description text" 
        titleText="Title text"
      />`,
      errors,
    },
  ],
});
