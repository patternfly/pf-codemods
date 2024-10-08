const ruleTester = require("../../ruletester");
import * as rule from "./masthead-name-changes";

ruleTester.run("masthead-name-changes", rule, {
  valid: [
    {
      code: `<MastheadBrand />`,
    },
    {
      code: `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand data-codemods />`,
    },
  ],
  invalid: [
    {
      code: `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand />`,
      output: `import { MastheadLogo } from '@patternfly/react-core'; <MastheadLogo data-codemods />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with other props
    {
      code: `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand className="foo" />`,
      output: `import { MastheadLogo } from '@patternfly/react-core'; <MastheadLogo data-codemods className="foo" />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with alias
    {
      code: `import { MastheadBrand as MB } from '@patternfly/react-core'; <MB />`,
      output: `import { MastheadLogo as MB } from '@patternfly/react-core'; <MB />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // dist imports
    {
      code: `import { MastheadBrand } from '@patternfly/react-core/dist/esm/components/Masthead/MastheadBrand'; <MastheadBrand />`,
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/esm/components/Masthead/MastheadLogo'; <MastheadLogo data-codemods />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MastheadBrand } from '@patternfly/react-core/dist/js/components/Masthead/MastheadBrand'; <MastheadBrand />`,
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/js/components/Masthead/MastheadLogo'; <MastheadLogo data-codemods />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MastheadBrand } from '@patternfly/react-core/dist/dynamic/components/Masthead/MastheadBrand'; <MastheadBrand />`,
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/dynamic/components/Masthead/MastheadLogo'; <MastheadLogo data-codemods />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
