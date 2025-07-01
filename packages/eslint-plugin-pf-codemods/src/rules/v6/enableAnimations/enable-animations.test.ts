const ruleTester = require("../../ruletester");
import * as rule from "./enable-animations";

ruleTester.run("enable-animations", rule, {
  valid: [
    // No imports, should not trigger
    {
      code: `<AlertGroup />`,
    },
    // Already has hasAnimations prop
    {
      code: `import { AlertGroup } from '@patternfly/react-core'; <AlertGroup hasAnimations />`,
    },
    // Already has hasAnimations with value
    {
      code: `import { AlertGroup } from '@patternfly/react-core'; <AlertGroup hasAnimations={true} />`,
    },
    // Table already has hasAnimations
    {
      code: `import { Table } from '@patternfly/react-table'; <Table hasAnimations />`,
    },
    // Non-target component should not be affected
    {
      code: `import { Button } from '@patternfly/react-core'; <Button />`,
    },
  ],
  invalid: [
    // AlertGroup without hasAnimations
    {
      code: `import { AlertGroup } from '@patternfly/react-core'; <AlertGroup />`,
      output: `import { AlertGroup } from '@patternfly/react-core'; <AlertGroup hasAnimations />`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // DualListSelector without hasAnimations
    {
      code: `import { DualListSelector } from '@patternfly/react-core'; <DualListSelector />`,
      output: `import { DualListSelector } from '@patternfly/react-core'; <DualListSelector hasAnimations />`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // TreeView without hasAnimations
    {
      code: `import { TreeView } from '@patternfly/react-core'; <TreeView />`,
      output: `import { TreeView } from '@patternfly/react-core'; <TreeView hasAnimations />`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // SearchInput without hasAnimations
    {
      code: `import { SearchInput } from '@patternfly/react-core'; <SearchInput />`,
      output: `import { SearchInput } from '@patternfly/react-core'; <SearchInput hasAnimations />`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // FormFieldGroupExpandable without hasAnimations
    {
      code: `import { FormFieldGroupExpandable } from '@patternfly/react-core'; <FormFieldGroupExpandable />`,
      output: `import { FormFieldGroupExpandable } from '@patternfly/react-core'; <FormFieldGroupExpandable hasAnimations />`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // Table from react-table without hasAnimations
    {
      code: `import { Table } from '@patternfly/react-table'; <Table />`,
      output: `import { Table } from '@patternfly/react-table'; <Table hasAnimations />`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // Multiple components in one file
    {
      code: `import { AlertGroup, TreeView } from '@patternfly/react-core'; 
        <>
          <AlertGroup />
          <TreeView />
        </>`,
      output: `import { AlertGroup, TreeView } from '@patternfly/react-core'; 
        <>
          <AlertGroup hasAnimations />
          <TreeView hasAnimations />
        </>`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // Component with existing props
    {
      code: `import { AlertGroup } from '@patternfly/react-core'; <AlertGroup isLiveRegion />`,
      output: `import { AlertGroup } from '@patternfly/react-core'; <AlertGroup hasAnimations isLiveRegion />`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
    // Self-closing and regular tags
    {
      code: `import { DualListSelector } from '@patternfly/react-core'; 
        <>
          <DualListSelector />
          <DualListSelector></DualListSelector>
        </>`,
      output: `import { DualListSelector } from '@patternfly/react-core'; 
        <>
          <DualListSelector hasAnimations />
          <DualListSelector hasAnimations></DualListSelector>
        </>`,
      errors: [
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
        {
          message: "Consider adding hasAnimations prop to enable component animations.",
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
}); 