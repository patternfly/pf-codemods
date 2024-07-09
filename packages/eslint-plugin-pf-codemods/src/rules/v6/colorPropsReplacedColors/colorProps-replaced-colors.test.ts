const ruleTester = require("../../ruletester");
import * as rule from "./colorProps-replaced-colors";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";

const components = ["Banner", "Label"];
const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
components.forEach((component) => {
  validTests.push(createValidTest(`<${component} color="gold" />`));
  validTests.push(createValidTest(`<${component} color="cyan" />`));
  validTests.push(
    createValidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} color="red" />`
    )
  );

  const type = "JSXOpeningElement";
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} color="gold" />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} color="yellow" />`,
      [
        {
          message: `The \`color\` prop on ${component} has been updated to replace "gold" with "yellow".`,
          type,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} color="cyan" />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} color="teal" />`,
      [
        {
          message: `The \`color\` prop on ${component} has been updated to replace "cyan" with "teal".`,
          type,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; const color = 'gold'; <${component} color={color} />`,
      `import { ${component} } from '@patternfly/react-core'; const color = 'gold'; <${component} color="yellow" />`,
      [
        {
          message: `The \`color\` prop on ${component} has been updated to replace "gold" with "yellow".`,
          type,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing color="gold" />`,
      `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing color="yellow" />`,
      [
        {
          message: `The \`color\` prop on CustomThing has been updated to replace "gold" with "yellow".`,
          type,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/esm/components/${component}/index.js'; <${component} color="cyan" />`,
      `import { ${component} } from '@patternfly/react-core/dist/esm/components/${component}/index.js'; <${component} color="teal" />`,
      [
        {
          message: `The \`color\` prop on ${component} has been updated to replace "cyan" with "teal".`,
          type,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/js/components/${component}/index.js'; <${component} color="cyan" />`,
      `import { ${component} } from '@patternfly/react-core/dist/js/components/${component}/index.js'; <${component} color="teal" />`,
      [
        {
          message: `The \`color\` prop on ${component} has been updated to replace "cyan" with "teal".`,
          type,
        },
      ]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/${component}/index.js'; <${component} color="cyan" />`,
      `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/${component}/index.js'; <${component} color="teal" />`,
      [
        {
          message: `The \`color\` prop on ${component} has been updated to replace "cyan" with "teal".`,
          type,
        },
      ]
    )
  );
});

ruleTester.run("colorProps-replaced-colors", rule, {
  valid: validTests,
  invalid: invalidTests,
});
