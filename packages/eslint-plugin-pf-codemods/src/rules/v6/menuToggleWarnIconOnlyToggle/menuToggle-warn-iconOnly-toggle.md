### menuToggle-warn-iconOnly-toggle [(#10097)](https://github.com/patternfly/patternfly-react/pull/10097)

We now recommend passing any icon to the `icon` prop instead of passing it as children, such as for plain, icon only toggles. Passing an icon as children will result in incorrect styling.

#### Examples

This rule will not provide a fix, but you can refer to the following code blocks to see what updates would need to be made manually.

Previous recommendation:

```jsx
%inputExample%
```

New recommendation:

```jsx
%outputExample%
```
