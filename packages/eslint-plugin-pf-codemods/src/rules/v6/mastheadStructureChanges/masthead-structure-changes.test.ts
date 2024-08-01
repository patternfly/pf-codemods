const ruleTester = require("../../ruletester");
import * as rule from "./masthead-structure-changes";

ruleTester.run("masthead-structure-changes", rule, {
  valid: [
    {
      code: `<Masthead  />`,
    },
    {
      code: `import { Masthead } from '@patternfly/react-core'; <Masthead someOtherProp />`,
    },
  ],
  invalid: [
    // stage one of a pre-renamed file
    {
      code: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand>Bar</MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand>Bar</MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // stage two of a pre-renamed file
    {
      code: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand>Bar</MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadBrand>Bar</MastheadBrand></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // stage one of a post-renamed file
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadLogo>Bar</MastheadLogo></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // stage two of a post-renamed file
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
