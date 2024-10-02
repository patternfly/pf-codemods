### menuToggle-remove-splitButtonOptions [(#11096)](https://github.com/patternfly/patternfly-react/pull/11096)

We have replaced `splitButtonOptions` prop on MenuToggle with `splitButtonItems`. SplitButtonOptions interface has been deleted, because its `variant` prop no longer supports the "action" option. The `items` prop of SplitButtonOptions will be passed directly to MenuToggle's new `splitButtonItems` prop.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```

