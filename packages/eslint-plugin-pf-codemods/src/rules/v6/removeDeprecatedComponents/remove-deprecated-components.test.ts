const ruleTester = require("../../ruletester");
import * as rule from "./remove-deprecated-components";
import {
  ValidTests,
  InvalidTests,
  createValidTest,
  createInvalidTest,
} from "../../helpers/testHelpers";

const invalidTests: InvalidTests = [];
function createErrorMessage(specifier: string, baseErrorMessage: string) {
  return `${specifier} is no longer exported by PatternFly. ${baseErrorMessage}. This rule will not fix any code.`;
}
function createAllInvalidTests(
  specifierArray: string[],
  baseErrorMessage: string
) {
  specifierArray.forEach((specifier) => {
    invalidTests.push(
      createInvalidTest(
        `import { ${specifier} } from '@patternfly/react-core/deprecated';`,
        `import { ${specifier} } from '@patternfly/react-core/deprecated';`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ImportSpecifier",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${specifier} as CustomThing } from '@patternfly/react-core/deprecated';`,
        `import { ${specifier} as CustomThing } from '@patternfly/react-core/deprecated';`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ImportSpecifier",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `export { ${specifier} as CustomThing } from '@patternfly/react-core/deprecated';`,
        `export { ${specifier} as CustomThing } from '@patternfly/react-core/deprecated';`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ExportSpecifier",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${specifier} } from '@patternfly/react-core/deprecated'; export default ${specifier};`,
        `import { ${specifier} } from '@patternfly/react-core/deprecated'; export default ${specifier};`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ImportSpecifier",
          },
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ExportDefaultDeclaration",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${specifier} as CustomThing } from '@patternfly/react-core/deprecated'; export default CustomThing;`,
        `import { ${specifier} as CustomThing } from '@patternfly/react-core/deprecated'; export default CustomThing;`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ImportSpecifier",
          },
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ExportDefaultDeclaration",
          },
        ]
      )
    );

    // Dist paths
    invalidTests.push(
      createInvalidTest(
        `import { ${specifier} } from '@patternfly/react-core/dist/esm/deprecated';`,
        `import { ${specifier} } from '@patternfly/react-core/dist/esm/deprecated';`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ImportSpecifier",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${specifier} } from '@patternfly/react-core/dist/js/deprecated';`,
        `import { ${specifier} } from '@patternfly/react-core/dist/js/deprecated';`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ImportSpecifier",
          },
        ]
      )
    );
    invalidTests.push(
      createInvalidTest(
        `import { ${specifier} } from '@patternfly/react-core/dist/dynamic/deprecated';`,
        `import { ${specifier} } from '@patternfly/react-core/dist/dynamic/deprecated';`,
        [
          {
            message: createErrorMessage(specifier, baseErrorMessage),
            type: "ImportSpecifier",
          },
        ]
      )
    );
  });
}
const componentErrorMessages = {
  appLauncher:
    "We recommmend using our custom menu application launcher example: https://staging-v6.patternfly.org/components/menus/custom-menus#application-launcher-menu",
  contextSelector:
    "We recommmend using our [custom menu context selector example: https://staging-v6.patternfly.org/components/menus/custom-menus#context-selector-menu",
  dropdown:
    "We recommend using either our current composable Dropdown or our Dropdown template implementation",
  optionsMenu:
    "We recommend using either our current composable Select or our Select template implementation",
  pageHeader:
    "We recommend using our Masthead and Toolbar components to build a page header",
  select:
    "We recommend using either our current composable Select or our Select template implementation",
};

const appLauncherSpecifiers = [
  "ApplicationLauncher",
  "ApplicationLauncherContext",
  "ApplicationLauncherItem",
  "ApplicationLauncherItemContext",
  "ApplicationLauncherContent",
  "ApplicationLauncherIcon",
  "ApplicationLauncherText",
  "ApplicationLauncherGroup",
  "ApplicationLauncherSeparator",
];
createAllInvalidTests(
  appLauncherSpecifiers,
  componentErrorMessages.appLauncher
);

const contextSelectorSpecifiers = [
  "ContextSelector",
  "ContextSelectorItem",
  "ContextSelectorFooter",
];
createAllInvalidTests(
  contextSelectorSpecifiers,
  componentErrorMessages.contextSelector
);

const dropdownSpecifiers = [
  "Dropdown",
  "DropdownMenu",
  "DropdownWithContext",
  "dropdownConstants",
  "DropdownGroup",
  "DropdownItem",
  "DropdownSeparator",
  "BadgeToggle",
  "KebabToggle",
  "DropdownToggle",
  "DropdownToggleCheckbox",
  "DropdownToggleAction",
];
createAllInvalidTests(dropdownSpecifiers, componentErrorMessages.dropdown);

const optionsMenuSpecifiers = [
  "OptionsMenu",
  "OptionsMenuToggle",
  "OptionsMenuItemGroup",
  "OptionsMenuItem",
  "OptionsMenuSeparator",
  "OptionsMenuToggleWithText",
];
createAllInvalidTests(
  optionsMenuSpecifiers,
  componentErrorMessages.optionsMenu
);

const pageHeaderSpecifiers = [
  "PageHeader",
  "PageHeaderTools",
  "PageHeaderToolsGroup",
  "PageHeaderToolsItem",
];
createAllInvalidTests(pageHeaderSpecifiers, componentErrorMessages.pageHeader);

const selectSpecifiers = [
  "Select",
  "SelectGroup",
  "SelectOption",
  "selectConstants",
];
createAllInvalidTests(selectSpecifiers, componentErrorMessages.select);

const allSpecifiers = [
  ...appLauncherSpecifiers,
  ...contextSelectorSpecifiers,
  ...dropdownSpecifiers,
  ...optionsMenuSpecifiers,
  ...pageHeaderSpecifiers,
  ...selectSpecifiers,
];

const validTests: ValidTests = [];
allSpecifiers.forEach((specifier) => {
  validTests.push(createValidTest(`<${specifier} />`));
  validTests.push(
    createValidTest(`import { ${specifier} } from '@patternfly/react-core';`)
  );
  createValidTest(`export { ${specifier} } from '@patternfly/react-core';`);
  createValidTest(
    `import { ${specifier} } from '@patternfly/react-core'; export default ${specifier};`
  );
});

ruleTester.run("remove-deprecated-components", rule, {
  valid: [
    ...validTests,
    {
      code: `import { Chip } from '@patternfly/react-core/deprecated';`,
    },
  ],
  invalid: [
    ...invalidTests,
    {
      code: `import { ApplicationLauncher, Dropdown, Select, Chip } from '@patternfly/react-core/deprecated';`,
      output: `import { ApplicationLauncher, Dropdown, Select, Chip } from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: createErrorMessage(
            "ApplicationLauncher",
            componentErrorMessages.appLauncher
          ),
          type: "ImportSpecifier",
        },
        {
          message: createErrorMessage(
            "Dropdown",
            componentErrorMessages.dropdown
          ),
          type: "ImportSpecifier",
        },
        {
          message: createErrorMessage("Select", componentErrorMessages.select),
          type: "ImportSpecifier",
        },
      ],
    },
  ],
});
