const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/clipboardCopy-onChange-event-added');

ruleTester.run("clipboardCopy-onChange-event-added", rule, {
  valid: [
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy />;`,
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={() => handleChange()} />;`,
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; const handleChange = () => {}; <ClipboardCopy onChange={handleChange} />;`,
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; function handleChange() {}; <ClipboardCopy onChange={handleChange} />;`,
    },
    {
      // No @patternfly/react-core import
      code: `<ClipboardCopy onChange />;`,
    },
  ],
  invalid: [
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={(id) => handleChange(id)} />;`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={(_event, id) => handleChange(id)} />;`,
      errors: [
        {
          message: `The "onChange" prop for ClipboardCopy has been updated to include the "_event" parameter as its first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={id => handleChange(id)} />;`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={(_event, id) => handleChange(id)} />;`,
      errors: [
        {
          message: `The "onChange" prop for ClipboardCopy has been updated to include the "_event" parameter as its first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; const handleChange = (id) => {}; <ClipboardCopy onChange={handleChange} />;`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; const handleChange = (_event, id) => {}; <ClipboardCopy onChange={handleChange} />;`,
      errors: [
        {
          message: `The "onChange" prop for ClipboardCopy has been updated to include the "_event" parameter as its first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; function handleChange(id) {}; <ClipboardCopy onChange={handleChange} />;`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; function handleChange(_event, id) {}; <ClipboardCopy onChange={handleChange} />;`,
      errors: [
        {
          message: `The "onChange" prop for ClipboardCopy has been updated to include the "_event" parameter as its first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={this.handleChange} />;`,
      output: `import { ClipboardCopy } from '@patternfly/react-core'; <ClipboardCopy onChange={this.handleChange} />;`,
      errors: [
        {
          message: `The "onChange" prop for ClipboardCopy has been updated to include the "_event" parameter as its first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { ClipboardCopy as PFClipboardCopy } from '@patternfly/react-core'; <PFClipboardCopy onChange={(id) => handleChange(id)} />;`,
      output: `import { ClipboardCopy as PFClipboardCopy } from '@patternfly/react-core'; <PFClipboardCopy onChange={(_event, id) => handleChange(id)} />;`,
      errors: [
        {
          message: `The "onChange" prop for PFClipboardCopy has been updated to include the "_event" parameter as its first parameter. "onChange" handlers may require an update.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
