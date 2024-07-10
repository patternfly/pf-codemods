const ruleTester = require("../../ruletester");
import * as rule from "./logViewer-moved-styles";

ruleTester.run("logViewer-moved-styles", rule, {
  valid: [
    {
      code: `<LogViewer />`,
    },
    {
      code: `import { LogViewer } from '@patternfly/react-core';`,
    },
  ],
  invalid: [
    {
      code: `import { LogViewer } from '@patternfly/react-log-viewer';`,
      output: `import { LogViewer } from '@patternfly/react-log-viewer';`,
      errors: [
        {
          message: `The stylesheet for LogViewer has been moved out of the PatternFly package and into LogViewer itself. You may need to update stylesheet imports or import the stylesheet manually.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
