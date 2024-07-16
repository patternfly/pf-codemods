const ruleTester = require("../../ruletester");
import * as rule from "./toolbarGroup-updated-iconButtonGroup-variant";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";
const applicableComponents = ["ToolbarGroup", "ToolbarToggleGroup"];
const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
for (const component of applicableComponents) {
  validTests.push(
    createValidTest(`<ToolbarGroup variant="icon-button-group" />`)
  );
  validTests.push(
    createValidTest(
      `import { ToolbarGroup } from '@patternfly/react-core'; <ToolbarGroup variant={ToolbarGroupVariant["icon-button-group"]} />`
    )
  );

  const message = `The \`icon-button-group\` variant of ${component} has been renamed to \`action-group-plain\`.`;
  const errorObject = {
    message,
    type: "JSXOpeningElement",
  };
  invalidTests.push(
    createInvalidTest(
      `import { ${component} } from '@patternfly/react-core'; <${component} variant="icon-button-group" />`,
      `import { ${component} } from '@patternfly/react-core'; <${component} variant="action-group-plain" />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing variant="icon-button-group" />`,
      `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing variant="action-group-plain" />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core'; <${component} variant={ToolbarGroupVariant["icon-button-group"]} />`,
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core'; <${component} variant={ToolbarGroupVariant["action-group-plain"]} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component}, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <${component} variant={CustomThing["icon-button-group"]} />`,
      `import { ${component}, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <${component} variant={CustomThing["action-group-plain"]} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component} as CustomGroup, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <CustomGroup variant={CustomThing["icon-button-group"]} />`,
      `import { ${component} as CustomGroup, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <CustomGroup variant={CustomThing["action-group-plain"]} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["icon-button-group"]} />`,
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["action-group-plain"]} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["icon-button-group"]} />`,
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["action-group-plain"]} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["icon-button-group"]} />`,
      `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["action-group-plain"]} />`,
      [errorObject]
    )
  );
}

ruleTester.run("toolbarGroup-updated-iconButtonGroup-variant", rule, {
  valid: validTests,
  invalid: invalidTests,
});
