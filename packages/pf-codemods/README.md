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

### accordion-rename-displaySize-large [(#8212)](https://github.com/patternfly/patternfly-react/pull/8212)

We've renamed the `large` prop value of `displaySize` to `lg`.

#### Examples

In:

```jsx
<Accordion displaySize="large" />
```

Out:

```jsx
<Accordion displaySize="lg" />
```

### card-remove-isHoverable [(#8196)](https://github.com/patternfly/patternfly-react/pull/8196)

We've removed the deprecated `isHoverable` prop from Card.

In:

```jsx
<Card isHoverable />
```

Out:

```jsx
<Card  />
```

### datalist-remove-ondrags [(#163)](https://github.com/patternfly/pf-codemods/issues/163)

We've removed the deprecated `onDragFinish`, `onDragStart`, `onDragMove`, and `onDragCancel` props. This rule will remove them and suggest the user use the DragDrop component.

#### Examples

In:

```jsx
<DataList onDragStart />
```

Out:

```jsx
<DataList  />
```

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

### expandable-section-rename-displaySize-large [(#8212)](https://github.com/patternfly/patternfly-react/pull/8212)

We've renamed the `large` prop value of `displaySize` to `lg`.

#### Examples

In:

```jsx
<ExpandableSection displaySize="large" />
```

Out:

```jsx
<ExpandableSection displaySize="lg" />
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
<FileUpload  />
```

### pagination-remove-ToggleTemplateProps [(#8134)](https://github.com/patternfly/patternfly-react/pull/8134)

We've removed the depracated `ToggleTemplateProps` prop and replaced it with `PaginationToggleTemplateProps`.

#### Examples

In:

```jsx
<Pagination ToggleTemplateProps />
```

Out:

```jsx
<Pagination PaginationToggleTemplateProps />
```

### pagination-rename-props [(#8319)](https://github.com/patternfly/patternfly-react/pull/8319)

We've renamed and/or removed several props for Pagination:

- `currPage`: `currPageAriaLabel`,
- `paginationTitle`: `paginationAriaLabel`,
- `toFirstPage`: `toFirstPageAriaLabel`,
- `toLastPage`: `toLastPageAriaLabel`,
- `toNextPage`: `toNextPageAriaLabel`,
- `toPreviousPage`: `toPreviousPageAriaLabel`,
- `optionsToggle`: `optionsToggleAriaLabel`,
- `defaultToFullPage`: `isLastFullPageShown`,
- `perPageComponenet`: removed

#### Examples

In:

```jsx
<Pagination
  currPage='text'
  paginationTitle='text'
  toFirstPage='text'
  toLastPage='text'
  toNextPage='text'
  toPreviousPage='text'
  optionsToggle='text'
  defaultToFullPage
  perPageComponenet='div'
/>
```

Out:

```jsx
<Pagination
  currPageAriaLabel='text'
  paginationAriaLabel='text'
  toFirstPageAriaLabel='text'
  toLastPageAriaLabel='text'
  toNextPageAriaLabel='text'
  toPreviousPageAriaLabel='text'
  optionsToggleAriaLabel='text'
  isLastFullPageShown
/>
```

### remove-sticky-props [(#8220)](https://github.com/patternfly/patternfly-react/pull/8220)

We've removed the deprecated `sticky` prop from `PageSection`, `PageGroup`, `PageNavigation`, and `PageBreadcrumb`.

In:

```jsx
<PageSection sticky="top" />
<PageGroup sticky="top" />
<PageNavigation sticky="top" />
<PageBreadcrumb sticky="top" />
```

Out:

```jsx
<PageSection  />
<PageGroup  />
<PageNavigation  />
<PageBreadcrumb  />
```

### resizeObserver-function-param [(#8324)](https://github.com/patternfly/patternfly-react/pull/8324)

We've updated the default value of the `getResizeObserver` helper function's third parameter, `useRequestAnimationFrame`. This rule will only provide two suggestions detailing when to pass which boolean into this parameter.

### tableComposable-remove-hasSelectableRowCaption [(#8352)](https://github.com/patternfly/patternfly-react/pull/8352)

We've removed the depracated `hasSelectableRowCaption` prop.

#### Examples

In:

```jsx
<TableComposable hasSelectableRowCaption />
```

Out:

```jsx
<TableComposable  />
```

### simpleList-remove-isCurrent [(#8132)](https://github.com/patternfly/patternfly-react/pull/8132)

We've removed the deprecated the `isCurrent` prop. This rule wil replace it with `isActive`.

#### Examples

In:

```jsx
<SimpleList isCurrent />
```

Out:

```jsx
<SimpleList isActive />
```

### toggle-remove-isprimary [(#8179)](https://github.com/patternfly/patternfly-react/pull/8179)

We've removed the deprecated `isPrimary` prop. This rule wil replace it with the "primary" value on the `toggleVariant` prop.

#### Examples

In:

```jsx
<Toggle isPrimary />
```

Out:

```jsx
<Toggle toggleVariant="primary" />
```

### toolbar-remove-visiblity [(#8212)](https://github.com/patternfly/patternfly-react/pull/8212)

We've removed the deprecated `visiblity` prop. This rule will replace it with the correctly spelled `visibility` prop.

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
<Tooltip     />
```
