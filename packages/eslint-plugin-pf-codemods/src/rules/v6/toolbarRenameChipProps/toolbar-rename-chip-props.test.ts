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
  // We can't assume that the rename rule will run after this one, so just add the renamed
  // component to this list
  ToolbarLabelGroupContent: {
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
    const newProp = renames[component][oldProp];
    validTests.push(createValidTest(`<${component} ${oldProp} />`));
    validTests.push(
      createValidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} ${newProp} />`
      )
    );

    const createMessage = (name: string = component) =>
      `${oldProp} prop for ${name} has been renamed to ${newProp}`;
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} ${oldProp} />`,
        `import { ${component} } from '@patternfly/react-core'; <${component} ${newProp} />`,
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
        `import { ${component} } from '@patternfly/react-core'; <${component} ${newProp}="test" />`,
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
        `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing ${newProp} />`,
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
        `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component} ${newProp} />`,
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
        `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component} ${newProp} />`,
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
        `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component} ${newProp} />`,
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
