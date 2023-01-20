const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/react-dropzone-warn-upgrade");

ruleTester.run("react-dropzone-warn-upgrade", rule, {
  valid: [],
  invalid: [
    {
      code: `import { FileUpload } from '@patternfly/react-core';`,
      output: `import { FileUpload } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The react-dropzone dependency used within FileUpload has been updated from version 9 to version 14.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { MultipleFileUpload } from '@patternfly/react-core';`,
      output: `import { MultipleFileUpload } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The react-dropzone dependency used within MultipleFileUpload has been updated from version 9 to version 14.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { CodeEditor } from '@patternfly/react-code-editor';`,
      output: `import { CodeEditor } from '@patternfly/react-code-editor';`,
      errors: [
        {
          message: `The react-dropzone dependency used within CodeEditor has been updated from version 9 to version 14.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
