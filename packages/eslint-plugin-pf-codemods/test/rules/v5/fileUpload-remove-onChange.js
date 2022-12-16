const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/fileUpload-remove-onChange");

ruleTester.run("fileUpload-remove-onChange", rule, {
  valid: [
    {
      code: `import { FileUpload } from '@patternfly/react-core'; <FileUpload />`,
    },
    // No @patternfly/react-core import
    { code: "<FileUpload onChange />" },
  ],
  invalid: [
    {
      code: `import { FileUpload } from '@patternfly/react-core'; <FileUpload onChange={onChange} />`,
      output: `import { FileUpload } from '@patternfly/react-core'; <FileUpload  />`,
      errors: [
        {
          message: `onChange prop for FileUpload has been removed and should be replaced with onFileInputChange, onTextChange, onDataChange, and onClearClick as needed.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
