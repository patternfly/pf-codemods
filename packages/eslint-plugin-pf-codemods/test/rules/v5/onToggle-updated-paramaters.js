const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/onToggle-updated-paramaters");
const onToggleAPIUpdateList = [
  "ApplicationLauncher",
  "BadgeToggle",
  "DropdownToggle",
  "KebabToggle",
  "Toggle",
  "Select",
  "SelectToggle",
];

ruleTester.run("onToggle-updated-paramaters", rule, {
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
      code: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle={() => onToggle} />;`,
      output: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle={() => onToggle} />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle={(isOpen) => onToggle()} />;`,
      output: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle={(_event, isOpen) => onToggle()} />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle={isOpen => onToggle()} />;`,
      output: `import { ${component} } from '@patternfly/react-core'; <${component} onToggle={(_event, isOpen) => onToggle()} />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; const onToggle = () => {}; <${component} onToggle={onToggle} />;`,
      output: `import { ${component} } from '@patternfly/react-core'; const onToggle = () => {}; <${component} onToggle={onToggle} />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; const onToggle = (isOpen) => {}; <${component} onToggle={onToggle} />;`,
      output: `import { ${component} } from '@patternfly/react-core'; const onToggle = (_event, isOpen) => {}; <${component} onToggle={onToggle} />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; function onToggle() {}; <${component} onToggle={onToggle} />;`,
      output: `import { ${component} } from '@patternfly/react-core'; function onToggle() {}; <${component} onToggle={onToggle} />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
    ...onToggleAPIUpdateList.map((component) => ({
      code: `import { ${component} } from '@patternfly/react-core'; function onToggle(isOpen) {}; <${component} onToggle={onToggle} />;`,
      output: `import { ${component} } from '@patternfly/react-core'; function onToggle(_event, isOpen) {}; <${component} onToggle={onToggle} />;`,
      errors: [
        {
          message: `${component} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    })),
  ],
});
