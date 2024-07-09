### button-moveIcons-icon-prop [(#10663)](https://github.com/patternfly/patternfly-react/pull/10663)

Icons must now be passed to the `icon` prop of Button instead of as children. This rule will only update instances of a Button with `variant="plain"` passed in, but you must ensure you are only passing an icon in such instances before running the fix.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
