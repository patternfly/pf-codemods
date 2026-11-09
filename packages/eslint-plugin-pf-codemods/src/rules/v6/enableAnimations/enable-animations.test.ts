const ruleTester = require("../../ruletester");
import * as rule from "./enable-animations";

const valid = [
  // Components not in target list should be ignored
  "<AlertGroup />",
  "import { AlertGroup } from '@patternfly/react-core'; <AlertGroup hasAnimations />",
  "import { AlertGroup } from '@patternfly/react-core'; <AlertGroup hasAnimations={true} />",
  "import { Table } from '@patternfly/react-table'; <Table hasAnimations />",
  // Component not in target components
  "import { Button } from '@patternfly/react-core'; <Button />",
  // DualListSelector without isTree should not get hasAnimations
  "import { DualListSelector } from '@patternfly/react-core'; <DualListSelector />",
  // DualListSelector with isTree={false} should not get hasAnimations
  "import { DualListSelector } from '@patternfly/react-core'; <DualListSelector isTree={false} />",
  // DualListSelector with isTree and hasAnimations already present
  "import { DualListSelector } from '@patternfly/react-core'; <DualListSelector isTree hasAnimations />",
];

const invalid = [
  // --- Without includeTable (default) ---
  {
    code: "import { Table } from '@patternfly/react-table'; <Table />",
    output: null,
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  // --- With includeTable: true ---
  {
    code: "import { Table } from '@patternfly/react-table'; <Table />",
    output: "import { Table } from '@patternfly/react-table'; <Table hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ],
    options: [{ includeTable: true }]
  },
  // --- Core components (unchanged) ---
  {
    code: "import { AlertGroup } from '@patternfly/react-core'; <AlertGroup />",
    output: "import { AlertGroup } from '@patternfly/react-core'; <AlertGroup hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  {
    code: "import { DualListSelector } from '@patternfly/react-core'; <DualListSelector isTree />",
    output: "import { DualListSelector } from '@patternfly/react-core'; <DualListSelector isTree hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  {
    code: "import { DualListSelector } from '@patternfly/react-core'; <DualListSelector isTree={true} />",
    output: "import { DualListSelector } from '@patternfly/react-core'; <DualListSelector isTree={true} hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  {
    code: "import { TreeView } from '@patternfly/react-core'; <TreeView />",
    output: "import { TreeView } from '@patternfly/react-core'; <TreeView hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  {
    code: "import { SearchInputExpandable } from '@patternfly/react-core'; <SearchInputExpandable />",
    output: "import { SearchInputExpandable } from '@patternfly/react-core'; <SearchInputExpandable hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  {
    code: "import { FormFieldGroupExpandable } from '@patternfly/react-core'; <FormFieldGroupExpandable />",
    output: "import { FormFieldGroupExpandable } from '@patternfly/react-core'; <FormFieldGroupExpandable hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  {
    code: `import { AlertGroup, TreeView } from '@patternfly/react-core'; 
      <><AlertGroup /><TreeView /></>`,
    output: `import { AlertGroup, TreeView } from '@patternfly/react-core'; 
      <><AlertGroup hasAnimations /><TreeView hasAnimations /></>`,
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      },
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  },
  {
    code: "import { AlertGroup } from '@patternfly/react-core'; <AlertGroup isLiveRegion />",
    output: "import { AlertGroup } from '@patternfly/react-core'; <AlertGroup isLiveRegion hasAnimations />",
    errors: [
      { 
        message: "Consider adding hasAnimations prop to enable component animations.",
      }
    ]
  }
];

ruleTester.run("enable-animations", rule, {
  valid: valid,
  invalid: invalid,
}); 