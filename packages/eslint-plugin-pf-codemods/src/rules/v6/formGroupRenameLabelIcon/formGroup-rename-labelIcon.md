### formGroup-rename-labelIcon [(#10016)](https://github.com/patternfly/patternfly-react/pull/10016)

The `labelIcon` prop for FormGroup has been renamed to `labelHelp`. We recommend using FormGroupLabelHelp element for the labelHelp prop. The markup has also changed, we now wrap the labelHelp element in `<span className={styles.formGroupLabelHelp}>`, so there is no need to add `className={styles.formGroupLabelHelp}` to the labelHelp element.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```

