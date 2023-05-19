const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/backgroundImageSrcMap-remove-interface");

ruleTester.run("backgroundImageSrcMap-remove-interface", rule, {
  valid: [
    {
      code: `import { BackgroundImage } from '@patternfly/react-core'; const srcObj: SomeType = {};`,
    },
    {
      // No @patternfly/react-core import
      code: `const srcObj: BackgroundImageSrcMap = {};`,
    },
  ],
  invalid: [
    {
      code: `import { BackgroundImageSrcMap } from '@patternfly/react-core'; const srcObj: BackgroundImageSrcMap = {};`,
      output: ` const srcObj = {};`,
      errors: [
        {
          message: `The BackgroundImageSrcMap interface has been removed.`,
          type: "ImportDeclaration",
        },
        {
          message: `The BackgroundImageSrcMap interface has been removed.`,
          type: "Identifier",
        },
      ],
    },
    {
      code: `export { BackgroundImageSrcMap as CustomMap } from '@patternfly/react-core';`,
      output: ``,
      errors: [
        {
          message: `The BackgroundImageSrcMap interface has been removed.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `export { BackgroundImageSrcMap as CustomMap, Foo as Bar } from '@patternfly/react-core';`,
      output: `export {  Foo as Bar } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The BackgroundImageSrcMap interface has been removed.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `import { BackgroundImageSrcMap, Foo } from '@patternfly/react-core'; const srcObj: BackgroundImageSrcMap = {};`,
      output: `import {  Foo } from '@patternfly/react-core'; const srcObj = {};`,
      errors: [
        {
          message: `The BackgroundImageSrcMap interface has been removed.`,
          type: "ImportDeclaration",
        },
        {
          message: `The BackgroundImageSrcMap interface has been removed.`,
          type: "Identifier",
        },
      ],
    },
  ],
});
