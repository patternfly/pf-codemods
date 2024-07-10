const ruleTester = require("../../ruletester");
import * as rule from "./toolbarChipGroupContent-rename-component";

ruleTester.run("toolbarChipGroupContent-rename-component", rule, {
  valid: [
    {
      code: `<ToolbarChipGroupContent />`,
    },
    {
      code: `<ToolbarChipGroupContent></ToolbarChipGroupContent>`,
    },
    {
      code: `import { ToolbarChipGroupContent } from '@another/package'; <ToolbarChipGroupContent></ToolbarChipGroupContent>`,
    },
    {
      code: `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; <ToolbarLabelGroupContent></ToolbarLabelGroupContent>`,
    },
  ],
  invalid: [
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core';`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `export { ToolbarChipGroupContent } from '@patternfly/react-core';`,
      output: `export { ToolbarLabelGroupContent } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ExportSpecifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core'; export {ToolbarChipGroupContent as CustomThing}`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; export {ToolbarLabelGroupContent as CustomThing}`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ExportSpecifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent as CustomThing } from '@patternfly/react-core';`,
      output: `import { ToolbarLabelGroupContent as CustomThing } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Badge, ToolbarChipGroupContent, Button } from '@patternfly/react-core';`,
      output: `import { Badge, ToolbarLabelGroupContent, Button } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core'; <ToolbarChipGroupContent></ToolbarChipGroupContent>`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; <ToolbarLabelGroupContent></ToolbarLabelGroupContent>`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "JSXIdentifier",
        },
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core'; <ToolbarChipGroupContent />`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; <ToolbarLabelGroupContent />`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "JSXIdentifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent as CustomThing } from '@patternfly/react-core'; <CustomThing></CustomThing>`,
      output: `import { ToolbarLabelGroupContent as CustomThing } from '@patternfly/react-core'; <CustomThing></CustomThing>`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core'; const Component = ToolbarChipGroupContent; <Component/>`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; const Component = ToolbarLabelGroupContent; <Component/>`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "Identifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent as CustomThing } from '@patternfly/react-core'; const Component = CustomThing; <Component/>`,
      output: `import { ToolbarLabelGroupContent as CustomThing } from '@patternfly/react-core'; const Component = CustomThing; <Component/>`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js';`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js';`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core/dist/js/components/Toolbar/index.js';`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/js/components/Toolbar/index.js';`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { ToolbarChipGroupContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js';`,
      output: `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js';`,
      errors: [
        {
          message: `The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent`,
          type: "ImportSpecifier",
        },
      ],
    },
  ],
});
