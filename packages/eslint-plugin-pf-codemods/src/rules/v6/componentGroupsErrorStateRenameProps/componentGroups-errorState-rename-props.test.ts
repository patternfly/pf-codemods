const ruleTester = require("../../ruletester");
import * as rule from "./componentGroups-errorState-rename-props";

const renameMap = {
  errorTitle: "titleText",
  errorDescription: "bodyText",
  defaultErrorDescription: "defaultBodyText",
};

ruleTester.run("componentGroups-errorState-rename-props", rule, {
  valid: [
    {
      code: `<ErrorState errorTitle="" />`,
    },
    {
      code: `<ErrorState errorDescription="" />`,
    },
    {
      code: `<ErrorState defaultErrorDescription="" />`,
    },
    {
      code: `import { ErrorState } from '@patternfly/react-component-groups'; <ErrorState someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { ErrorState } from '@patternfly/react-component-groups';
      <ErrorState
        errorTitle="Sample error title"
        errorDescription="Sample error description"
        defaultErrorDescription="Sample default error description"
      />`,
      output: `import { ErrorState } from '@patternfly/react-component-groups';
      <ErrorState
        titleText="Sample error title"
        bodyText="Sample error description"
        defaultBodyText="Sample default error description"
      />`,
      errors: Object.entries(renameMap).map(([oldName, newName]) => ({
        message: `The ${oldName} prop for ErrorState has been renamed to ${newName}.`,
        type: "JSXOpeningElement",
      })),
    },
    {
      code: `import ErrorState from '@patternfly/react-component-groups/dist/cjs/ErrorState/index';
      <ErrorState errorTitle="Sample error title" />`,
      output: `import ErrorState from '@patternfly/react-component-groups/dist/cjs/ErrorState/index';
      <ErrorState titleText="Sample error title" />`,
      errors: [
        {
          message: `The errorTitle prop for ErrorState has been renamed to titleText.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import ErrorState from '@patternfly/react-component-groups/dist/esm/ErrorState/index';
      <ErrorState errorTitle="Sample error title" />`,
      output: `import ErrorState from '@patternfly/react-component-groups/dist/esm/ErrorState/index';
      <ErrorState titleText="Sample error title" />`,
      errors: [
        {
          message: `The errorTitle prop for ErrorState has been renamed to titleText.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import ErrorState from '@patternfly/react-component-groups/dist/dynamic/ErrorState';
      <ErrorState errorTitle="Sample error title" />`,
      output: `import ErrorState from '@patternfly/react-component-groups/dist/dynamic/ErrorState';
      <ErrorState titleText="Sample error title" />`,
      errors: [
        {
          message: `The errorTitle prop for ErrorState has been renamed to titleText.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
