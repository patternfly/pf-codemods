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
            "Selectable styling attribute (`pf-m-selectable`) has been removed on the list items of the TreeView component. You should update selectors, tests and snapshot tests which are relying on the `pf-m-selectable` class.",
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
