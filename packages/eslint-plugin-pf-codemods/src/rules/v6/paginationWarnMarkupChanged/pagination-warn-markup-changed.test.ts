const ruleTester = require("../../ruletester");
import * as rule from "./pagination-warn-markup-changed";

ruleTester.run("pagination-warn-markup-changed", rule, {
  valid: [
    {
      code: `<Pagination />`,
    },
    {
      code: `import { Pagination } from '@patternfly/someOtherPackage';`,
    },
  ],
  invalid: [
    {
      code: `import { Pagination } from '@patternfly/react-core';`,
      output: `import { Pagination } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Pagination as CustomThing } from '@patternfly/react-core';`,
      output: `import { Pagination as CustomThing } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Menu, Pagination, Button, Alert } from '@patternfly/react-core';`,
      output: `import { Menu, Pagination, Button, Alert } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core/dist/esm/components/Pagination/index.js';`,
      output: `import { Pagination } from '@patternfly/react-core/dist/esm/components/Pagination/index.js';`,
      errors: [
        {
          message: `The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core/dist/js/components/Pagination/index.js';`,
      output: `import { Pagination } from '@patternfly/react-core/dist/js/components/Pagination/index.js';`,
      errors: [
        {
          message: `The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Pagination } from '@patternfly/react-core/dist/dynamic/components/Pagination/index.js';`,
      output: `import { Pagination } from '@patternfly/react-core/dist/dynamic/components/Pagination/index.js';`,
      errors: [
        {
          message: `The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle.`,
          type: "ImportSpecifier",
        },
      ],
    },
  ],
});
