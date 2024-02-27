### tabs-update-markup [(#10044)](https://github.com/patternfly/patternfly-react/pull/10044)

The markup for the Tabs scroll buttons have been updated in the following ways:

- Replaced the native `button` HTML element internally with our Button components
- Added a wrapper `div` around them
- Removed styling when the `isSubtab` (previously `isSecondary`) prop is true
