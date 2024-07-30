const ruleTester = require("../../ruletester");
import * as rule from "./no-duplicate-import-specifiers";

ruleTester.run("no-duplicate-import-specifiers", rule, {
  valid: [
    {
      // we care only about imports from "@patternfly/react-core"
      code: `import { Button, Button } from "somewhere"`,
    },
    {
      code: `import { Button, Button as AnotherButton } from "@patternfly/react-core";
      <>
        <Button>Sample button</Button>
        <AnotherButton>Another one</AnotherButton>
      </>`,
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated';
      import { Select } from '@patternfly/react-core';`
    },
    {
      code: `import { Select } from '@patternfly/react-core/deprecated';
      import { Select } from '@patternfly/react-core/dist/dynamic/components/Select';`
    },
    {
      code: `import { Select } from '@patternfly/react-core/next';
      import { Select } from '@patternfly/react-core';`
    },
    {
      code: `import { Select } from '@patternfly/react-core/next';
      import { Select } from '@patternfly/react-core/dist/dynamic/components/Select';`
    }
  ],
  invalid: [
    {
      code: `import { Button, Button } from "@patternfly/react-core";
      <Button>Sample button</Button>`,
      output: `import { Button,  } from "@patternfly/react-core";
      <Button>Sample button</Button>`,
      errors: [
        {
          message: `Duplicate import specifier Button imported from '@patternfly/react-core'.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Button } from "@patternfly/react-core";
      import { Button } from "@patternfly/react-core";
      <Button>Sample button</Button>`,
      output: `import { Button } from "@patternfly/react-core";
      
      <Button>Sample button</Button>`,
      errors: [
        {
          message: `Duplicate import specifier Button imported from '@patternfly/react-core'.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Button } from "@patternfly/react-core";
      import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
      <Button>Sample button</Button>`,
      output: `import { Button } from "@patternfly/react-core";
      
      <Button>Sample button</Button>`,
      errors: [
        {
          message: `Duplicate import specifier Button imported from '@patternfly/react-core/dist/dynamic/components/Button'.`,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { Button as BTN, TextInput, Button as BTN } from "@patternfly/react-core";
      <>
        <BTN>Sample button</BTN>
        <TextInput>Text</TextInput>
      </>`,
      output: `import { Button as BTN, TextInput,  } from "@patternfly/react-core";
      <>
        <BTN>Sample button</BTN>
        <TextInput>Text</TextInput>
      </>`,
      errors: [
        {
          message: `Duplicate import specifier BTN imported from '@patternfly/react-core'.`,
          type: "ImportSpecifier",
        },
      ],
    },
  ],
});
