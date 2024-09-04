const ruleTester = require("../../ruletester");
import * as rule from "./toolbarGroup-updated-variant";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";
const applicableComponents = ["ToolbarGroup", "ToolbarToggleGroup"];
const renames = {
  "button-group": "action-group",
  "icon-button-group": "action-group-plain",
};
const oldVariantNames = Object.keys(renames) as (
  | "button-group"
  | "icon-button-group"
)[];

const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
for (const component of applicableComponents) {
  for (const oldName of oldVariantNames) {
    const newName = renames[oldName];

    validTests.push(createValidTest(`<ToolbarGroup variant="${oldName}" />`));
    validTests.push(
      createValidTest(
        `import { ToolbarGroup } from '@patternfly/react-core'; <ToolbarGroup variant={ToolbarGroupVariant["${oldName}"]} />`
      )
    );

    const message = `The \`${oldName}\` variant of ${component} has been renamed to \`${newName}\`.`;
    const errorObject = {
      message,
      type: "JSXOpeningElement",
    };
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} variant="${oldName}" />`,
        `import { ${component} } from '@patternfly/react-core'; <${component} variant="${newName}" />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing variant="${oldName}" />`,
        `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing variant="${newName}" />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core'; <${component} variant={ToolbarGroupVariant["${oldName}"]} />`,
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core'; <${component} variant={ToolbarGroupVariant["${newName}"]} />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core';
        const variant = ToolbarGroupVariant["${oldName}"]; <${component} variant={variant} />`,
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core';
        const variant = ToolbarGroupVariant["${newName}"]; <${component} variant={variant} />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component}, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <${component} variant={CustomThing["${oldName}"]} />`,
        `import { ${component}, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <${component} variant={CustomThing["${newName}"]} />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component} as CustomGroup, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <CustomGroup variant={CustomThing["${oldName}"]} />`,
        `import { ${component} as CustomGroup, ToolbarGroupVariant as CustomThing } from '@patternfly/react-core'; <CustomGroup variant={CustomThing["${newName}"]} />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["${oldName}"]} />`,
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["${newName}"]} />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["${oldName}"]} />`,
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["${newName}"]} />`,
        [errorObject]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["${oldName}"]} />`,
        `import { ${component}, ToolbarGroupVariant } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} variant={ToolbarGroupVariant["${newName}"]} />`,
        [errorObject]
      )
    );
  }
}

ruleTester.run("toolbarGroup-updated-iconButtonGroup-variant", rule, {
  valid: validTests,
  invalid: invalidTests,
});
