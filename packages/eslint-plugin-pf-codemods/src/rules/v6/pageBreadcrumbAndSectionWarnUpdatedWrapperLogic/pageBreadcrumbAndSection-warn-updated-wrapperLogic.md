### pageBreadcrumbAndSection-warn-updated-wrapperLogic [(#10650)](https://github.com/patternfly/patternfly-react/pull/10650)

The `isWidthLimited` prop on PageBreadcrumb and PageSection will no longer determine whether the children of either component are wrapped in a PageBody. Instead the new `hasBodyWrapper` prop must be used. By default this new prop is set to true. Running the fix for this rule will apply `hasBodyWrapper` with the same value as the `isWidthLimited` prop or false if `isWidthLimited` is not passed.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
