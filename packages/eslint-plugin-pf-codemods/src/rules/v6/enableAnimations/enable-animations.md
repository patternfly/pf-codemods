### enable-animations

This rule adds the `hasAnimations` prop to PatternFly components that support animations. This is an optional enhancement that enables smoother transitions and animations in your UI components.

**⚠️ Important:** Enabling animations may change the DOM structure of some components. This could affect CSS selectors, testing queries, or other code that relies on the specific DOM structure. Review your code after enabling animations to ensure compatibility.

The following components will have `hasAnimations` added:
- AlertGroup
- DualListSelector (only when `isTree` prop has a truthy value)
- FormFieldGroupExpandable
- SearchInputExpandable
- TreeView
- Table (from @patternfly/react-table)

**Note:** For DualListSelector, the `hasAnimations` prop will only be added when the `isTree` prop is present and has a truthy value (e.g., `isTree`, `isTree={true}`, `isTree="yes"`, `isTree={1}`). It will not be added when `isTree` is falsy (e.g., `isTree={false}`, `isTree=""`, `isTree={0}`) or when the `isTree` prop is not present at all.

This rule can only run using the `--only enable-animations` option.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
``` 