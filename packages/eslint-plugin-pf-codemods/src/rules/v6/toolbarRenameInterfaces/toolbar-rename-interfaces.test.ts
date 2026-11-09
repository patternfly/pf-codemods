const ruleTester = require("../../ruletester");
import * as rule from "./toolbar-rename-interfaces";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";

const replacementMap: { [key: string]: string } = {
  ToolbarChipGroup: "ToolbarLabelGroup",
  ToolbarChip: "ToolbarLabel",
  ToolbarChipGroupContentProps: "ToolbarLabelGroupContentProps",
};
const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
for (const previousName in replacementMap) {
  const newName = replacementMap[previousName];
  validTests.push(createValidTest(`const test: ${previousName} = true;`));
  validTests.push(
    createValidTest(
      `import { ${newName} } from '@patternfly/react-core'; const test: ${newName} = true;`
    )
  );
  validTests.push(
    createValidTest(
      `import { ${previousName} } from '@another/package'; const test: ${previousName} = true;`
    )
  );

  const message = `${previousName} has been renamed to ${newName}.`;
  invalidTests.push(
    createInvalidTest(
      `import { ${previousName} } from '@patternfly/react-core';`,
      `import { ${newName} } from '@patternfly/react-core';`,
      [
        {
          message,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${previousName} as CustomName } from '@patternfly/react-core';`,
      `import { ${newName} as CustomName } from '@patternfly/react-core';`,
      [
        {
          message,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${previousName} } from '@patternfly/react-core'; const test: ${previousName} = true;`,
      `import { ${newName} } from '@patternfly/react-core'; const test: ${newName} = true;`,
      [
        {
          message,
        },
        {
          message,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${previousName} as CustomName } from '@patternfly/react-core'; const test: CustomName = true;`,
      `import { ${newName} as CustomName } from '@patternfly/react-core'; const test: CustomName = true;`,
      [
        {
          message,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${previousName} } from '@patternfly/react-core'; interface MyExtension extends ${previousName} {}`,
      `import { ${newName} } from '@patternfly/react-core'; interface MyExtension extends ${newName} {}`,
      [
        {
          message,
        },
        {
          message,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${previousName} as CustomName } from '@patternfly/react-core'; interface MyExtension extends CustomName {}`,
      `import { ${newName} as CustomName } from '@patternfly/react-core'; interface MyExtension extends CustomName {}`,
      [
        {
          message,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${previousName} } from '@patternfly/react-core'; export { ${previousName} as CustomName }`,
      `import { ${newName} } from '@patternfly/react-core'; export { ${newName} as CustomName }`,
      [
        {
          message,
        },
        {
          message,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `export { ${previousName} } from '@patternfly/react-core';`,
      `export { ${newName} } from '@patternfly/react-core';`,
      [
        {
          message,
        },
      ]
    )
  );
}

ruleTester.run("toolbar-rename-interfaces", rule, {
  valid: validTests,
  invalid: invalidTests,
});
