### card-updated-clickable-markup [(#10859)](https://github.com/patternfly/patternfly-react/pull/10859)

The markup for clickable-only cards has been updated. Additionally, the `selectableActions.selectableActionId` and `selectableActions.name` props are no longer necessary to pass to CardHeader for clickable-only cards. Passing them in will not cause any errors, but running the fix for this rule will remove them.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
