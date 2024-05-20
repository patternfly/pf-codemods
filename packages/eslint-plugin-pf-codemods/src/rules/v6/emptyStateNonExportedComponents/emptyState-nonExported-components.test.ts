const ruleTester = require("../../ruletester");
import * as rule from "./emptyState-nonExported-components";

ruleTester.run("emptyState-nonExported-components", rule, {
  valid: [
    {
      code: `import { EmptyStateHeader } from '@some/other/package';`,
    },
    {
      code: `import { EmptyStateIcon } from '@some/other/package';`,
    },
  ],
  invalid: [
    {
      code: `import { EmptyStateHeader } from '@patternfly/react-core';`,
      output: `import { EmptyStateHeader } from '@patternfly/react-core';`,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly. This rule will not fix any imports, as our cleanup rule handles removal of unused imports.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { EmptyStateHeader as CustomHeader } from '@patternfly/react-core';`,
      output: `import { EmptyStateHeader as CustomHeader } from '@patternfly/react-core';`,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly. This rule will not fix any imports, as our cleanup rule handles removal of unused imports.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `export { EmptyStateHeader } from '@patternfly/react-core';`,
      output: ``,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `export { EmptyStateHeader as CustomHeader } from '@patternfly/react-core';`,
      output: ``,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `export { EmptyStateHeader, EmptyStateIcon } from '@patternfly/react-core';`,
      output: ``,
      errors: [
        {
          message: `EmptyStateHeader and EmptyStateIcon are no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `export { EmptyStateHeader, Button, EmptyStateIcon } from '@patternfly/react-core';`,
      output: `export {  Button } from '@patternfly/react-core';`,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
        {
          message: `EmptyStateIcon is no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `import { EmptyStateHeader } from '@patternfly/react-core';export { EmptyStateHeader };`,
      output: `import { EmptyStateHeader } from '@patternfly/react-core';`,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly. This rule will not fix any imports, as our cleanup rule handles removal of unused imports.`,
          type: "ImportSpecifier",
        },
        {
          message: `EmptyStateHeader is no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `import { EmptyStateHeader as CustomHeader } from '@patternfly/react-core';export { CustomHeader };`,
      output: `import { EmptyStateHeader as CustomHeader } from '@patternfly/react-core';`,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly. This rule will not fix any imports, as our cleanup rule handles removal of unused imports.`,
          type: "ImportSpecifier",
        },
        {
          message: `CustomHeader is no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `import { EmptyStateHeader } from '@patternfly/react-core';export { EmptyStateHeader as CustomHeader };`,
      output: `import { EmptyStateHeader } from '@patternfly/react-core';`,
      errors: [
        {
          message: `EmptyStateHeader is no longer exported by PatternFly. This rule will not fix any imports, as our cleanup rule handles removal of unused imports.`,
          type: "ImportSpecifier",
        },
        {
          message: `EmptyStateHeader is no longer exported by PatternFly.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
  ],
});
