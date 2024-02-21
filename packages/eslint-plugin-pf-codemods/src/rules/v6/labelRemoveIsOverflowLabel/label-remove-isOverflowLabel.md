### label-remove-isOverflowLabel [(#10037)](https://github.com/patternfly/patternfly-react/pull/10037)

The `isOverflowLabel` prop for Label has been replaced with `variant="overflow"`. Running the fix for this rule will replace an existing `variant` prop (which had no effect if `isOverflowLabel` was used).

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
