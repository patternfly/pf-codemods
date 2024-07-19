### drawerContent-replace-noBackground-colorVariant [(#10211)](https://github.com/patternfly/patternfly-react/pull/10211)

The "no-background" value of the `colorVariant` prop on DrawerContent has been removed, and a new "primary" value has been added.

Additionally, a new DrawerContentColorVariant enum has been added and should be used instead of the DrawerColorVariant enum. The fix when the DrawerColorVariant enum is being used will replace the `colorVariant` prop value with a string.

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
