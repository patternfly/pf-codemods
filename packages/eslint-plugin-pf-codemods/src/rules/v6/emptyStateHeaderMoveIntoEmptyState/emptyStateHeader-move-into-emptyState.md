### emptyStateHeader-move-into-emptyState [(#9947)](https://github.com/patternfly/patternfly-react/pull/9947)

EmptyStateHeader and EmptyStateIcon are now rendered internally within EmptyState and should only be customized using props. Content passed to the `icon` prop on EmptyState will also be wrapped by EmptyStateIcon automatically.

Additionally, the `titleText` prop is now required on EmptyState.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```

