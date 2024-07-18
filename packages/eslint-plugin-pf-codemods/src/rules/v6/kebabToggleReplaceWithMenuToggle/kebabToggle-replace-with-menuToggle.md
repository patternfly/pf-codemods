### kebabToggle-removed [(#10345)](https://github.com/patternfly/patternfly-react/pull/10345)

KebabToggle has been removed from PatternFly. We recommend using our MenuToggle component instead. Running the fix for this rule will replace most KebabToggle usage with a MenuToggle. Depending on the use-case, however, additional manual updates may be necessary, such as upgrading from our deprecated Dropdown implementation to our current one.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
