const ruleTester = require("../../ruletester");
import * as rule from "./toolbar-rename-chip-props";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";

const renames: { [key: string]: { [key: string]: string } } = {
  Toolbar: {
    customChipGroupContent: "customLabelGroupContent",
  },
  ToolbarExpandableContent: {
    chipContainerRef: "labelContainerRef",
  },
  ToolbarFilter: {
    chips: "labels",
    deleteChipGroup: "deleteLabelGroup",
    deleteChip: "deleteLabel",
    chipGroupExpandedText: "labelGroupExpandedText",
    chipGroupCollapsedText: "labelGroupCollapsedText",
    expandableChipContainerRef: "expandableLabelContainerRef",
  },
  ToolbarChipGroupContent: {
    chipGroupContentRef: "labelGroupContentRef",
    customChipGroupContent: "customLabelGroupContent",
  },
  ToolbarToggleGroup: {
    chipContainerRef: "labelContainerRef",
  },
};
const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
for (const component in renames) {
  for (const oldProp in renames[component]) {
    validTests.push(createValidTest(`<${component} ${oldProp} />`));
    validTests.push(
      createValidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} ${renames[component][oldProp]} />`
      )
    );

    const newProp = renames[component][oldProp];
    const createMessage = (name: string = component) =>
      `${oldProp} prop for ${name} has been renamed to ${newProp}`;
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} ${oldProp} />`,
        `import { ${component} } from '@patternfly/react-core'; <${component} ${renames[component][oldProp]} />`,
        [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} ${oldProp}="test" />`,
        `import { ${component} } from '@patternfly/react-core'; <${component} ${renames[component][oldProp]}="test" />`,
        [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing ${oldProp} />`,
        `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing ${renames[component][oldProp]} />`,
        [
          {
            message: createMessage("CustomThing"),
            type: "JSXOpeningElement",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} ${oldProp} />`,
        `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} ${renames[component][oldProp]} />`,
        [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} ${oldProp} />`,
        `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} ${renames[component][oldProp]} />`,
        [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} ${oldProp} />`,
        `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} ${renames[component][oldProp]} />`,
        [
          {
            message: createMessage(),
            type: "JSXOpeningElement",
          },
        ]
      )
    );
  }
}

ruleTester.run("toolbar-rename-chip-props", rule, {
  valid: validTests,
  invalid: invalidTests,
});
