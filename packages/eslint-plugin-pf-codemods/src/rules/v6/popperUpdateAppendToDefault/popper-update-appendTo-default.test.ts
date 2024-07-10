const ruleTester = require("../../ruletester");
import * as rule from "./popper-update-appendTo-default";

ruleTester.run("popper-update-appendTo-default", rule, {
  valid: [
    {
      code: `<Dropdown appendTo />`,
    },
    {
      code: `import { Button } from '@patternfly/react-core';`,
    },
  ],
  invalid: [
    {
      code: `import { Dropdown } from '@patternfly/react-core';`,
      output: `import { Dropdown } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The default value of appendTo on Dropdown has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Dropdown as CustomThing } from '@patternfly/react-core';`,
      output: `import { Dropdown as CustomThing } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The default value of appendTo on Dropdown has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Select } from '@patternfly/react-core';`,
      output: `import { Select } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The default value of appendTo on Select has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Popper } from '@patternfly/react-core';`,
      output: `import { Popper } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The default value of appendTo on Popper has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Dropdown, Select, Popper, Button } from '@patternfly/react-core';`,
      output: `import { Dropdown, Select, Popper, Button } from '@patternfly/react-core';`,
      errors: [
        {
          message: `The default value of appendTo on Dropdown has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
        {
          message: `The default value of appendTo on Select has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
        {
          message: `The default value of appendTo on Popper has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Dropdown } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js';`,
      output: `import { Dropdown } from '@patternfly/react-core/dist/esm/components/Dropdown/index.js';`,
      errors: [
        {
          message: `The default value of appendTo on Dropdown has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Dropdown } from '@patternfly/react-core/dist/js/components/Dropdown/index.js';`,
      output: `import { Dropdown } from '@patternfly/react-core/dist/js/components/Dropdown/index.js';`,
      errors: [
        {
          message: `The default value of appendTo on Dropdown has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Dropdown } from '@patternfly/react-core/dist/dynamic/components/Dropdown/index.js';`,
      output: `import { Dropdown } from '@patternfly/react-core/dist/dynamic/components/Dropdown/index.js';`,
      errors: [
        {
          message: `The default value of appendTo on Dropdown has been updated to \`document.body\`.`,
          type: "ImportSpecifier",
        },
      ],
    },
  ],
});
