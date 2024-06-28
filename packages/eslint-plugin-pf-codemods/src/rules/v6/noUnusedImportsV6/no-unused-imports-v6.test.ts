const ruleTester = require("../../ruletester");
import * as rule from "./no-unused-imports-v6";

ruleTester.run("no-unused-imports-v6", rule, {
  valid: [
    {
      code: `import { Foo } from 'some-lib'; <Bar />`,
    },
    {
      code: `import { Foo } from '@patternfly/react-core'; <Foo someProp />`,
    },
  ],
  invalid: [
    // when it's the only PF import
    {
      code: `import { Foo } from '@patternfly/react-core'; <p>foo</p>`,
      output: ` <p>foo</p>`,
      errors: [
        {
          message: `Unused PatternFly import Foo from '@patternfly/react-core' should be removed`,
          type: "ImportDeclaration",
        },
      ],
    },
    // when it's the first PF import
    {
      code: `import { Foo, Bar } from '@patternfly/react-core'; <Bar someProp />`,
      output: `import { Bar } from '@patternfly/react-core'; <Bar someProp />`,
      errors: [
        {
          message: `Unused PatternFly import Foo from '@patternfly/react-core' should be removed`,
          type: "ImportDeclaration",
        },
      ],
    },
    //when it's the last PF import
    {
      code: `import { Bar, Foo } from '@patternfly/react-core'; <Bar someProp />`,
      output: `import { Bar,  } from '@patternfly/react-core'; <Bar someProp />`,
      errors: [
        {
          message: `Unused PatternFly import Foo from '@patternfly/react-core' should be removed`,
          type: "ImportDeclaration",
        },
      ],
    },
    // dist/esm import
    {
      code: `import { Bar, Foo } from '@patternfly/react-core/dist/esm/components'; <Bar someProp />`,
      output: `import { Bar,  } from '@patternfly/react-core/dist/esm/components'; <Bar someProp />`,
      errors: [
        {
          message: `Unused PatternFly import Foo from '@patternfly/react-core/dist/esm/components' should be removed`,
          type: "ImportDeclaration",
        },
      ],
    },
    // dist/js import
    {
      code: `import { Bar, Foo } from '@patternfly/react-core/dist/js/components'; <Bar someProp />`,
      output: `import { Bar,  } from '@patternfly/react-core/dist/js/components'; <Bar someProp />`,
      errors: [
        {
          message: `Unused PatternFly import Foo from '@patternfly/react-core/dist/js/components' should be removed`,
          type: "ImportDeclaration",
        },
      ],
    },
    // dist/dynamic import
    {
      code: `import { Bar, Foo } from '@patternfly/react-core/dist/dynamic/components'; <Bar someProp />`,
      output: `import { Bar,  } from '@patternfly/react-core/dist/dynamic/components'; <Bar someProp />`,
      errors: [
        {
          message: `Unused PatternFly import Foo from '@patternfly/react-core/dist/dynamic/components' should be removed`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
