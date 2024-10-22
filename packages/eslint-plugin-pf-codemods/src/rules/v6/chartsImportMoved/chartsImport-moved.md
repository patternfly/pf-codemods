### chartsImport-moved [(#11091)](https://github.com/patternfly/patternfly-react/pull/11091)

In order to support multiple chart libraries, Victory based charts have moved. This rule will update import paths to our victory directory.

Additionally, Victory is now an optional peer dependency, allowing future chart libraries to be installed without including Victory dependencies and vice versa

You may choose to install the single "victory" package to cover all features. Or, install packages based on the features used in your app (e.g., "victory-core", "victory-tooltip", etc.).

#### Examples

In:

```jsx
%inputExample%
```

Out:

```jsx
%outputExample%
```
