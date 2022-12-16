# pf-codemods

Hey PatternFly-React devs! `pf-codemods` is an eslint wrapper to update @patternfly/react-core@4.x.x code to 5.x.x.

I hope these rules and their autofixers will help you more quickly adopt our breaking changes. These rules are not designed to fix all build errors, but they can help to fix easy ones.

## Usage

### Simple case

Requires Node.js >= 10.

```sh
npx pf-codemods ./src
```

Giving node more RAM can help for large codebases.

```sh
NODE_OPTIONS=--max-old-space-size=4096 npx pf-codemods ./path-to-src
```

### Options

```sh
Usage: pf-codemods [options] <path> [otherPaths...]

Run codemods on path using eslint.

Options:
  -V, --version      output the version number
  --only <rules>     Comma-seperated list of rules to run
  --exclude <rules>  Run recommended rules EXCLUDING this comma-seperated list
  --fix              Whether to run fixer
  --format <format>  What eslint report format to use (default: "stylish")
  -h, --help         display help for command
```

## Rules

These rules are based off the breaking change notes for React. Each rule links the breaking change patternfly-react PR in case you want to better understand the change. Also, each rule makes sure you're using a PatternFly component before running.

### divider-remove-isVertical [(#8199)](https://github.com/patternfly/patternfly-react/pull/8199)

We've replaced the `isVertical` flag with the `orientation` property that can define verticality on different breakpoints.

#### Examples

```jsx
<Divider isVertical />
```

Out:

```jsx
<Divider orientation={{ default: "vertical" }} />
```

### fileUpload-remove-onChange [(#8155)](https://github.com/patternfly/patternfly-react/pull/8155)

We've removed the deprecated `onChange` prop. This rule will remove the prop from the FileUpload component and suggest replacing it with the `onFileInputChange`, `onTextChange`, `onDataChange`, and `onClearClick` props as needed.

#### Examples

In:

```jsx
<FileUpload onChange={onChange} />
```

Out:

```jsx
<FileUpload />
```

### tableComposable-remove-hasSelectableRowCaption [(#8352)](https://github.com/patternfly/patternfly-react/pull/8352)

We've removed the depracated `hasSelectableRowCaption` prop.

#### Examples

In:

```jsx
<TableComposable hasSelectableRowCaption />
```

Out:

```jsx
<TableComposable />
```

### toolbar-remove-visiblity [(#8212)](https://github.com/patternfly/patternfly-react/pull/8212)

We've removed the deprecated `visiblity` prop. This rule wil replace it with the correct spelled `visibility` prop.

#### Examples

In:

```jsx
<ToolbarContent visiblity={{ default: "hidden" }} />
```

Out:

```jsx
<ToolbarContent visibility={{ default: "hidden" }} />
```

### tooltip-remove-props [(#8231)](https://github.com/patternfly/patternfly-react/pull/8231)

We've removed the `boundary`, `tippyProps`, and `isAppLauncher` properties from Tooltip.

#### Examples

In:

```jsx
<Tooltip boundary={} tippyProps={} isAppLauncher />
```

Out:

```jsx
<Tooltip />
```
