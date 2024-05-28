const ruleTester = require("../../ruletester");
import * as rule from "./toolbar-replaced-spacer-spaceItems";
import { RuleTester } from "eslint";

const toolbarComponents = ["ToolbarGroup", "ToolbarToggleGroup", "ToolbarItem"];
const validTests: Array<string | RuleTester.ValidTestCase> = [];
const invalidTests: RuleTester.InvalidTestCase[] = [];
const createValidTest = (code: string) => ({
  code,
});
const createInvalidTest = (code: string, output: string, message: string) => ({
  code,
  output,
  errors: [
    {
      message,
      type: "JSXOpeningElement",
    },
  ],
});

toolbarComponents.forEach((component) => {
  validTests.push(createValidTest(`<${component} spacer />`));
  validTests.push(createValidTest(`<${component} spaceItems />`));
  validTests.push(
    createValidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} />`
    )
  );

  const spacerErrorMessage = `The spacer property has been removed from ${component}. We recommend instead using our new gap, columnGap, or rowGap properties.`;
  const spaceItemsErrorMessage = `spaceItems property has been removed from ${component}.`;
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} spacer={{default: "spacerNone"}} />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} gap={{default: "gapNone"}} />`,
      spacerErrorMessage
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; const NO_SPACER = "spacerNone"; <${component} spacer={{default: NO_SPACER}} />`,
      `import { ${component} } from '@patternfly/react-core'; const NO_SPACER = "spacerNone"; <${component} gap={{default: NO_SPACER}} />`,
      spacerErrorMessage
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} as CustomComponent } from '@patternfly/react-core'; <CustomComponent spacer={{default: "spacerNone"}} />`,
      `import { ${component} as CustomComponent } from '@patternfly/react-core'; <CustomComponent gap={{default: "gapNone"}} />`,
      `The spacer property has been removed from CustomComponent. We recommend instead using our new gap, columnGap, or rowGap properties.`
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} spacer={{default: "spacerNone", md: "spacerLg", lg: "spacerSm"}} />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} gap={{default: "gapNone", md: "gapLg", lg: "gapSm"}} />`,
      spacerErrorMessage
    )
  );
  createInvalidTest(
    `import { ${component} } from '@patternfly/react-core'; <${component} spaceItems={{default: "spaceItemsNone"}} />`,
    `import { ${component} } from '@patternfly/react-core'; <${component}  />`,
    `The ${spaceItemsErrorMessage}`
  );
  createInvalidTest(
    `import { ${component} } from '@patternfly/react-core'; <${component} spacer={{default: "spacerNone"}} spaceItems={{default: "spaceItemsNone"}} />`,
    `import { ${component} } from '@patternfly/react-core'; <${component} gap={{default: "gapNone"}}  />`,
    `${spacerErrorMessage} Additionally, the ${spaceItemsErrorMessage}`
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} spacer={{default: "spacerNone"}} />`,
      `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} gap={{default: "gapNone"}} />`,
      spacerErrorMessage
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} spacer={{default: "spacerNone"}} />`,
      `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} gap={{default: "gapNone"}} />`,
      spacerErrorMessage
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} spacer={{default: "spacerNone"}} />`,
      `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} gap={{default: "gapNone"}} />`,
      spacerErrorMessage
    )
  );
});

ruleTester.run("toolbar-replaced-spacer-spaceItems", rule, {
  valid: validTests,
  invalid: invalidTests,
});
