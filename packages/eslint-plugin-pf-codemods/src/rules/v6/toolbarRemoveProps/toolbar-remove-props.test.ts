const ruleTester = require("../../ruletester");
import * as rule from "./toolbar-remove-props";
import {
  ValidTests,
  InvalidTests,
  createInvalidTest,
  createValidTest,
} from "../../helpers/testHelpers";
const renames: { [key: string]: { [key: string]: string } } = {
  Toolbar: {
    usePageInsets: "",
  },
  ToolbarContent: {
    alignSelf: "",
  },
  ToolbarItem: {
    widths: "",
  },
  ToolbarToggleGroup: {
    alignment: "",
  },
};
const validTests: ValidTests = [];
const invalidTests: InvalidTests = [];
for (const component in renames) {
  for (const oldProp in renames[component]) {
    validTests.push(createValidTest(`<${component} ${oldProp} />`));
    validTests.push(
      createValidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} someOtherProp />`
      )
    );

    const createMessage = (name: string = component) =>
      `${oldProp} prop for ${name} has been removed`;
    invalidTests.push(
      createInvalidTest(
        `import { ${component} } from '@patternfly/react-core'; <${component} ${oldProp} />`,
        `import { ${component} } from '@patternfly/react-core'; <${component}  />`,
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
        `import { ${component} } from '@patternfly/react-core'; <${component}  />`,
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
        `import { ${component} as CustomThing } from '@patternfly/react-core'; <CustomThing  />`,
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
        `import { ${component} } from '@patternfly/react-core/dist/esm/components/Toolbar/index.js'; <${component}  />`,
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
        `import { ${component} } from '@patternfly/react-core/dist/js/components/Toolbar/index.js'; <${component}  />`,
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
        `import { ${component} } from '@patternfly/react-core/dist/dynamic/components/Toolbar/index.js'; <${component}  />`,
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

ruleTester.run("toolbar-remove-props", rule, {
  valid: validTests,
  invalid: invalidTests,
});
