const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/onToggle-warn-event");
const onToggleAPIUpdateList = [
  "ApplicationLauncher",
  "BadgeToggle",
  "DropdownToggle",
  "KebabToggle",
  "Toggle",
  "Select",
  "SelectToggle",
];

ruleTester.run("onToggle-warn-event", rule, {
  valid: [
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; <${component} />;`,
    })),
    // No @patternfly/react-core import
    ...onToggleAPIUpdateList.map((component) => ({
      code: `<${component} onToggle />;`,
    })),
  ],
  invalid: [
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle />;`,
      output: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
  ],
});
