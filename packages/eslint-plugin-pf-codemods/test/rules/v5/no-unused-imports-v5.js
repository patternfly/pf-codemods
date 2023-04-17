const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/no-unused-imports-v5");

ruleTester.run("no-unused-imports-v5", rule, {
  valid: [
    {
      code: `import React from "react";
      import { Button,  } from "@patternfly/react-core";
      
      import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";
      
      <Button variant="link" icon={<PlusCircleIcon />}>
        Link
      </Button>;
      `,
    },
  ],
  invalid: [
    {
      code: `import React from "react";
      import { Alert, Button, Title } from "@patternfly/react-core";
      import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";
      import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";
      
      <Button variant="link" icon={<PlusCircleIcon />}>
        Link
      </Button>;`,
      output: `import React from "react";
      import { Button,  } from "@patternfly/react-core";
      
      import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";
      
      <Button variant="link" icon={<PlusCircleIcon />}>
        Link
      </Button>;`,
      errors: [
        {
          message: `unused PatternFly imports Alert, Title from '@patternfly/react-core'`,
          type: "ImportDeclaration",
        },
        {
          message: `unused PatternFly import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon'`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
