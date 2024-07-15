const ruleTester = require("../../ruletester");
import * as rule from "./toolbarLabelGroupContent-updated-markup";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";

const applicableProps: string[] = [
  "numberOfFilters",
  "showClearFiltersButton",
  "customLabelGroupContent",
];
const message =
  "The markup for ToolbarLabelGruopContent has changed when numberOfFilters is greater than 0, showClearFilterButton is true, or customLabelGroupContent is passed.";
const errorObject = {
  message,
  type: "JSXOpeningElement",
};
const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
for (const prop of applicableProps) {
  validTests.push(createValidTest(`<ToolbarLabelGroupContent ${prop} />`));
  validTests.push(
    createValidTest(
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; <ToolbarLabelGroupContent someOtherProp />`
    )
  );

  invalidTests.push(
    createInvalidTest(
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; <ToolbarLabelGroupContent ${prop} />`,
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core'; <ToolbarLabelGroupContent ${prop} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ToolbarLabelGroupContent as CustomThing } from '@patternfly/react-core'; <CustomThing ${prop} />`,
      `import { ToolbarLabelGroupContent as CustomThing } from '@patternfly/react-core'; <CustomThing ${prop} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <ToolbarLabelGroupContent ${prop} />`,
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <ToolbarLabelGroupContent ${prop} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <ToolbarLabelGroupContent ${prop} />`,
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <ToolbarLabelGroupContent ${prop} />`,
      [errorObject]
    )
  );
  invalidTests.push(
    createInvalidTest(
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarLabelGroupContent ${prop} />`,
      `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarLabelGroupContent ${prop} />`,
      [errorObject]
    )
  );
}

invalidTests.push(
  createInvalidTest(
    `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarLabelGroupContent numberOfFilters showClearFiltersButton customLabelGroupContent />`,
    `import { ToolbarLabelGroupContent } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <ToolbarLabelGroupContent numberOfFilters showClearFiltersButton customLabelGroupContent />`,
    [errorObject]
  )
);

ruleTester.run("toolbarLabelGroupContent-updated-markup", rule, {
  valid: validTests,
  invalid: invalidTests,
});
