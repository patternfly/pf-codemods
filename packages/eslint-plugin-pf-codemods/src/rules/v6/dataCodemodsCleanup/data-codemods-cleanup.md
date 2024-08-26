### data-codemods-cleanup

This rule will remove `data-codemods` attributes and comments, which were introduced by our codemods in order to work correctly.
You should run this rule only once, after you finish running the codemods.

This rule can only run using the `--only data-codemods-cleanup` option.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
