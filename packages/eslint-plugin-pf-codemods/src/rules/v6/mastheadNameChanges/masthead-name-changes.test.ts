const ruleTester = require("../../ruletester");
import * as rule from "./masthead-name-changes";

ruleTester.run("masthead-name-changes", rule, {
  valid: [
    {
      code: `<MastheadBrand />`,
    },
    {
      code: `<MastheadMain />`,
    },
    {
      code: `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand data-codemods />`,
    },
    {
      code: `import { MastheadMain } from '@patternfly/react-core'; <MastheadMain data-codemods />`,
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
    {
      code: `import { MastheadMain } from '@patternfly/react-core'; <MastheadMain />`,
      output: `import { MastheadBrand } from '@patternfly/react-core'; <MastheadBrand data-codemods />`,
      errors: [
        {
          message: `MastheadMain has been renamed to MastheadBrand.`,
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
    // because of how the unit tests run I have to handle having both MastheadBrand and MastheadMain together in stages
    {
      code: `import { MastheadBrand, MastheadMain } from '@patternfly/react-core'; <MastheadMain><MastheadBrand>Logo</MastheadBrand></MastheadMain>`,
      output: `import { MastheadLogo, MastheadMain } from '@patternfly/react-core'; <MastheadMain><MastheadLogo data-codemods>Logo</MastheadLogo></MastheadMain>`,
      errors: [
        {
          message: `MastheadMain has been renamed to MastheadBrand.`,
          type: "JSXOpeningElement",
        },
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MastheadLogo, MastheadMain } from '@patternfly/react-core'; <MastheadMain><MastheadLogo data-codemods>Logo</MastheadLogo></MastheadMain>`,
      output: `import { MastheadLogo, MastheadBrand } from '@patternfly/react-core'; <MastheadBrand data-codemods><MastheadLogo data-codemods>Logo</MastheadLogo></MastheadBrand>`,
      errors: [
        {
          message: `MastheadMain has been renamed to MastheadBrand.`,
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
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/esm/components/Masthead/MastheadBrand'; <MastheadLogo data-codemods />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MastheadBrand } from '@patternfly/react-core/dist/js/components/Masthead/MastheadBrand'; <MastheadBrand />`,
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/js/components/Masthead/MastheadBrand'; <MastheadLogo data-codemods />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MastheadBrand } from '@patternfly/react-core/dist/dynamic/components/Masthead/MastheadBrand'; <MastheadBrand />`,
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/dynamic/components/Masthead/MastheadBrand'; <MastheadLogo data-codemods />`,
      errors: [
        {
          message: `MastheadBrand has been renamed to MastheadLogo.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
