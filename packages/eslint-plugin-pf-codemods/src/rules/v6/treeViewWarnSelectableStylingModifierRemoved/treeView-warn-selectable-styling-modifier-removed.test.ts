const ruleTester = require("../../ruletester");
import * as rule from "./treeView-warn-selectable-styling-modifier-removed";

ruleTester.run("treeView-warn-selectable-styling-modifier-removed", rule, {
  valid: [
    {
      code: `<TreeView  />`,
    },
  ],
  invalid: [
    {
      code: `import { TreeView } from '@patternfly/react-core'; <TreeView  />`,
      output: `import { TreeView } from '@patternfly/react-core'; <TreeView  />`,
      errors: [
        {
          message:
            "Selectable styling attribute (`pf-m-selectable`) has been removed in TreeView component.",
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
