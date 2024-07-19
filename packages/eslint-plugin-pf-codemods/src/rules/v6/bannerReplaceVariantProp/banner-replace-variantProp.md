### banner-replace-variantProp [(#9891)](https://github.com/patternfly/patternfly-react/pull/9891)

The `variant` property has been removed from Banner. We recommend using our new `color` or `status` properties, depending on the original intent of the `variant` property.

Running the fix for this rule will either replace the `variant` property with the `color` property, or remove the `variant` property entirely, but additional updates may need to be made.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
