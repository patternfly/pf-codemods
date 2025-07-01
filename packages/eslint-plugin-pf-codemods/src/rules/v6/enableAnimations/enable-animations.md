### enable-animations

This rule adds the `hasAnimations` prop to PatternFly components that support animations. This is an optional enhancement that enables smoother transitions and animations in your UI components.

The following components will have `hasAnimations` added:
- AlertGroup
- DualListSelector  
- FormFieldGroupExpandable
- SearchInput
- TreeView
- Table (from @patternfly/react-table)

This rule can only run using the `--only enable-animations` option.

#### Examples

In:

```jsx
import { AlertGroup, TreeView } from '@patternfly/react-core';
import { Table } from '@patternfly/react-table';

export const Example = () => (
  <>
    <AlertGroup isLiveRegion>
      {/* alerts */}
    </AlertGroup>
    <TreeView />
    <Table />
  </>
);
```

Out:

```jsx
import { AlertGroup, TreeView } from '@patternfly/react-core';
import { Table } from '@patternfly/react-table';

export const Example = () => (
  <>
    <AlertGroup hasAnimations isLiveRegion>
      {/* alerts */}
    </AlertGroup>
    <TreeView hasAnimations />
    <Table hasAnimations />
  </>
);
``` 