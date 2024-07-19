const ruleTester = require("../../ruletester");
import * as rule from "./pageNavigation-remove-component";

ruleTester.run("pageNavigation-remove-component", rule, {
  valid: [
    {
      code: `<PageNavigation />`,
    },
    {
      code: `<PageNavigation></PageNavigation>`,
    },
    {
      code: `import { PageNavigation } from '@patternfly/someOtherPackage'; <PageNavigation />`,
    },
    {
      code: `import { PageNavigation } from '@patternfly/someOtherPackage'; <PageNavigation></PageNavigation>`,
    },
  ],
  invalid: [
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation />`,
      output: `import { PageNavigation } from '@patternfly/react-core'; `,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation></PageNavigation>`,
      output: `import { PageNavigation } from '@patternfly/react-core'; `,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; <PageNavigation><div>Some internal content</div></PageNavigation>`,
      output: `import { PageNavigation } from '@patternfly/react-core'; <div>Some internal content</div>`,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; <div>Wrapper content<div>Adjacent Content</div><PageNavigation><div>Some internal content</div></PageNavigation></div>`,
      output: `import { PageNavigation } from '@patternfly/react-core'; <div>Wrapper content<div>Adjacent Content</div><div>Some internal content</div></div>`,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `export { PageNavigation } from '@patternfly/react-core';`,
      output: ``,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `export { PageNavigation, Button } from '@patternfly/react-core';`,
      output: `export {  Button } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `export { Alert, PageNavigation, Button } from '@patternfly/react-core';`,
      output: `export { Alert,  Button } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; export { PageNavigation }`,
      output: `import { PageNavigation } from '@patternfly/react-core'; `,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core'; export default PageNavigation`,
      output: `import { PageNavigation } from '@patternfly/react-core'; `,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "ExportDefaultDeclaration",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <PageNavigation />`,
      output: `import { PageNavigation } from '@patternfly/react-core/dist/esm/components/Page/index.js'; `,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core/dist/js/components/Page/index.js'; <PageNavigation />`,
      output: `import { PageNavigation } from '@patternfly/react-core/dist/js/components/Page/index.js'; `,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { PageNavigation } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <PageNavigation />`,
      output: `import { PageNavigation } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; `,
      errors: [
        {
          message: `The PageNavigation component has been removed from PatternFly.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
