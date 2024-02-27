const ruleTester = require("../../ruletester");
import * as rule from "./simpleFileUpload-warn-changes";

ruleTester.run("simpleFileUpload-warn-changes", rule, {
  valid: [
    {
      code: `<SimpleFileUpload notAThing />`,
    },
    {
      code: `import { SimpleFileUpload } from '@patternfly/some-other-package';`,
    },
    {
      code: `import { Alert } from '@patternfly/react-core';`,
    },
  ],
  invalid: [
    {
      code: `import { SimpleFileUpload } from '@patternfly/react-core';`,
      output: `import { SimpleFileUpload } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The \`aria-describedby\` attribute was removed from the TextInput within the SimpleFileUpload, and the \`id\` attribute was removed from the "browse" button. Instead use the new \`browseButtonAriaDescribedby\` prop to provide a description to the browse button.

Additionally, we recommend using our FileUploadHelperText component as a child to the FileUpload, instead of using our FormHelperText (the previous recommendation).`,
          type: "ImportDeclaration",
        },
      ],
    },
    // Test that a warning only gets flagged once
    {
      code: `import { SimpleFileUpload } from '@patternfly/react-core'; import { Alert } from '@patternfly/react-core';`,
      output: `import { SimpleFileUpload } from '@patternfly/react-core'; import { Alert } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The \`aria-describedby\` attribute was removed from the TextInput within the SimpleFileUpload, and the \`id\` attribute was removed from the "browse" button. Instead use the new \`browseButtonAriaDescribedby\` prop to provide a description to the browse button.

Additionally, we recommend using our FileUploadHelperText component as a child to the FileUpload, instead of using our FormHelperText (the previous recommendation).`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
