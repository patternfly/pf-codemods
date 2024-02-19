### helperTextItem-remove-props [(#10029)](https://github.com/patternfly/patternfly-react/pull/10029)

The `hasIcon` and `isDynamic` props have been removed from HelperTextItem. An icon will now render automatically when the `variant` prop has a value other than "default" or when the `icon` prop is passed in.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
