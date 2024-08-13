const ruleTester = require("../../ruletester");
import * as rule from "./masthead-structure-changes";

ruleTester.run("masthead-structure-changes", rule, {
  valid: [
    // no pf import and has NOT had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `<Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand>Bar</MastheadBrand></MastheadMain></Masthead>`,
    },
    // no pf import and has had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `<Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadLogo>Bar</MastheadLogo></MastheadMain></Masthead>`,
    },
    //toggle already wrapped in MastheadMain and brand double wrapped with data-codemods on the top level, has NOT had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadBrand>Bar</MastheadBrand></MastheadBrand></MastheadMain></Masthead>`,
    },
    // toggle already wrapped in MastheadMain and logo wrapped in a brand with data-codemods, has had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
    },
  ],
  invalid: [
    // stage one of a file that has NOT had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand>Bar</MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand>Bar</MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, the PF5 MastheadBrand has been renamed to MastheadLogo (this renaming is handled by our masthead-name-changes codemod) and should now be wrapped in a new MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // stage two of a file that has NOT had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand>Bar</MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadBrand, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadBrand>Bar</MastheadBrand></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, the PF5 MastheadBrand has been renamed to MastheadLogo (this renaming is handled by our masthead-name-changes codemod) and should now be wrapped in a new MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // stage one of a file that has had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadLogo>Bar</MastheadLogo></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, MastheadLogo should now be wrapped in MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // stage two of a file that has had MastheadBrand renamed to MastheadLogo by the masthead-name-changes codemod
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with aliases
    {
      code: `import { Masthead as MH, MastheadBrand as MB, MastheadMain as MM, MastheadToggle as MT } from '@patternfly/react-core'; <MH><MT>Foo</MT><MM><MB>Bar</MB></MM></MH>`,
      output: `import { Masthead as MH, MastheadBrand as MB, MastheadMain as MM, MastheadToggle as MT } from '@patternfly/react-core'; <MH><MM><MT>Foo</MT><MB>Bar</MB></MM></MH>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, the PF5 MastheadBrand has been renamed to MastheadLogo (this renaming is handled by our masthead-name-changes codemod) and should now be wrapped in a new MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Masthead as MH, MastheadBrand as MB, MastheadMain as MM, MastheadToggle as MT } from '@patternfly/react-core'; <MH><MM><MT>Foo</MT><MB>Bar</MB></MM></MH>`,
      output: `import { Masthead as MH, MastheadBrand as MB, MastheadMain as MM, MastheadToggle as MT } from '@patternfly/react-core'; <MH><MM><MT>Foo</MT><MB data-codemods><MB>Bar</MB></MB></MM></MH>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, the PF5 MastheadBrand has been renamed to MastheadLogo (this renaming is handled by our masthead-name-changes codemod) and should now be wrapped in a new MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with dist imports
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle } from '@patternfly/react-core/dist/esm/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadLogo>Bar</MastheadLogo></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/esm/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, MastheadLogo should now be wrapped in MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/esm/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/esm/components/Masthead'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle } from '@patternfly/react-core/dist/js/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadLogo>Bar</MastheadLogo></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/js/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, MastheadLogo should now be wrapped in MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/js/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/js/components/Masthead'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle } from '@patternfly/react-core/dist/dynamic/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadLogo>Bar</MastheadLogo></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/dynamic/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
        {
          message: `The structure of Masthead has been updated, MastheadLogo should now be wrapped in MastheadBrand.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/dynamic/components/Masthead'; <Masthead><MastheadToggle>Foo</MastheadToggle><MastheadMain><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      output: `import { Masthead, MastheadLogo, MastheadMain, MastheadToggle, MastheadBrand } from '@patternfly/react-core/dist/dynamic/components/Masthead'; <Masthead><MastheadMain><MastheadToggle>Foo</MastheadToggle><MastheadBrand data-codemods><MastheadLogo>Bar</MastheadLogo></MastheadBrand></MastheadMain></Masthead>`,
      errors: [
        {
          message: `The structure of Masthead has been updated, MastheadToggle should now be wrapped in MastheadMain.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
