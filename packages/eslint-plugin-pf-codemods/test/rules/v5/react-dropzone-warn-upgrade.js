const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/react-dropzone-warn-upgrade");

ruleTester.run("react-dropzone-warn-upgrade", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<FileUpload />`,
    },
    {
      // No @patternfly/react-core import
      code: `<MultipleFileUpload />`,
    },
    {
      // No @patternfly/react-code-editor import
      code: `<CodeEditor />`,
    },
  ],
  invalid: [
    {
      code: `import { FileUpload } from '@patternfly/react-core';`,
      output: null,
      errors: [
        {
          message: `The react-dropzone dependency used within FileUpload has been updated from version 9 to version 14. Among the changes from this update, the 'dropzoneProps' prop type is now react-dropzone's DropzoneOptions, and react-dropzone's 'accept' prop type is now an array of strings. Additionally, the 'onFileInputChange' prop has had its event parameter typing updated to react-dropzone's DropEvent.`,
        },
      ],
    },
    {
      code: `import { MultipleFileUpload } from '@patternfly/react-core';`,
      output: null,
      errors: [
        {
          message: `The react-dropzone dependency used within MultipleFileUpload has been updated from version 9 to version 14. Among the changes from this update, the 'dropzoneProps' prop type is now react-dropzone's DropzoneOptions, and react-dropzone's 'accept' prop type is now an array of strings.`,
        },
      ],
    },
    {
      code: `import { CodeEditor } from '@patternfly/react-code-editor';`,
      output: null,
      errors: [
        {
          message: `The react-dropzone dependency used within CodeEditor has been updated from version 9 to version 14.`,
        },
      ],
    },
    {
      code: `import { CodeEditor } from '@patternfly/react-code-editor/dist/esm/components/Popover/index.js'; import { MultipleFileUpload } from '@patternfly/react-core/dist/esm/components/MultipleFileUpload/index.js'; import { FileUpload } from '@patternfly/react-core/dist/esm/components/FileUpload/index.js';`,
      output: null,
      errors: [
        {
          message: `The react-dropzone dependency used within CodeEditor has been updated from version 9 to version 14.`,
        },
        {
          message: `The react-dropzone dependency used within MultipleFileUpload has been updated from version 9 to version 14. Among the changes from this update, the 'dropzoneProps' prop type is now react-dropzone's DropzoneOptions, and react-dropzone's 'accept' prop type is now an array of strings.`,
        },
        {
          message: `The react-dropzone dependency used within FileUpload has been updated from version 9 to version 14. Among the changes from this update, the 'dropzoneProps' prop type is now react-dropzone's DropzoneOptions, and react-dropzone's 'accept' prop type is now an array of strings. Additionally, the 'onFileInputChange' prop has had its event parameter typing updated to react-dropzone's DropEvent.`,
        },
      ],
    },
  ],
});
