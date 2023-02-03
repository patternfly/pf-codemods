# pf-codemods

Hey PatternFly-React devs! `pf-codemods` is an eslint wrapper to update @patternfly/react-core@4.x.x code to 5.x.x.

We hope these rules and their autofixers will help you more quickly adopt our breaking changes. These rules are not designed to fix all build errors, but they can help to fix easy ones as well as point out the more complicated ones and offer suggestions on how you might go about fixing them.

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

These commands will show you places in your code that may have issues with our breaking changes similar to linting. Add the `--fix` flag to allow us to autofix issues where possible.

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

### accordion-rename-AccordionExpandedContentBody[(#8525)](https://github.com/patternfly/patternfly-react/pull/8525)

We've renamed the `AccordionExpandedContentBody` component to `AccordionExpandableContentBody`.

#### Examples

In:

```jsx
<AccordionExpandedContentBody>Body</AccordionExpandedContentBody>
```

Out:

```jsx
<AccordionExpandableContentBody>Body</AccordionExpandableContentBody>
```

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

### applicationLauncher-warn-input [(#8293)](https://github.com/patternfly/patternfly-react/pull/8293)

We've updated the internal input in ApplicationLauncher to the PatternFly SearchInput. Any relative selectors, such as in unit tests, may need to be updated.

### card-warn-component [(#8601)](https://github.com/patternfly/patternfly-react/pull/8601)

We've updated the internal default value of the `component` prop within Card; it has been changed from 'article' to 'div'. Any related references, such as in unit tests, may need to be updated.

### card-remove-isHoverable [(#8196)](https://github.com/patternfly/patternfly-react/pull/8196)

We've removed the deprecated `isHoverable` prop from Card.

#### Examples

In:

```jsx
<Card isHoverable />
```

Out:

```jsx
<Card  />
```

### chart-getResizeObserver [(#8533)](https://github.com/patternfly/patternfly-react/pull/8533)

We've removed the `getResizeObserver` function from react-charts in favor of react-core's `getResizeObserver`. This helper function now has a third parameter, `useRequestAnimationFrame`, and allows a single function to be maintained going forward.

#### Examples

In:

```jsx
import { getResizeObserver } from "@patternfly/react-charts";
```

Out:

```jsx
import { getResizeObserver } from "@patternfly/react-core";
```

### chart-themeVariant [(#8590)](https://github.com/patternfly/patternfly-react/pull/8590)

We've removed the deprecated `themeVariant` properties from all react-charts components. This functionality was previously a noop and replaced by PatternFly core's dark theme support.

#### Examples

In:

```jsx
import { Chart, ChartThemeColor, ChartThemeVariant, getCustomTheme } from '@patternfly/react-charts';

const customTheme = {...};
const newTheme = getCustomTheme(ChartThemeColor.default, ChartThemeVariant.light, customTheme);

return (
  <Chart themeVariant={ChartThemeVariant.light} theme={newTheme}/>
);
```

Out:

```jsx
import { Chart, ChartThemeColor, getCustomTheme } from '@patternfly/react-charts';

const customTheme = {...};
const newTheme = getCustomTheme(ChartThemeColor.default, customTheme);

return (
  <Chart theme={newTheme}/>
);
```

### clipboardCopy-remove-popoverPosition [(#8226)](https://github.com/patternfly/patternfly-react/pull/8226)

We've removed the PopoverPosition type for the `position` prop on both ClipboardCopy and ClipboardCopyButton.

#### Examples

In:

```jsx
<ClipboardCopy position={PopoverPosition.top} />
<ClipboardCopyButton position={PopoverPosition.bottom} />
```

Out:

```jsx
<ClipboardCopy position="top" />
<ClipboardCopyButton position="bottom" />
```

### codeeditor-remove-deprecated-props [(#8624)](https://github.com/patternfly/patternfly-react/pull/8624)

We've removed the deprecated `entryDelay`, `exitDelay`, `maxWidth`, `position`, and `toolTipText` props. This rule will remove them from your code and suggest that you use the tooltipProps prop instead.

#### Examples

In:

```jsx
<CodeEditor entryDelay="500" exitDelay="500" maxWidth="15rem" position="top" toolTipText="hi" />
```

Out:

```jsx
<CodeEditor      />
```

### clipboardCopy-remove-popoverPosition [(#8619)](https://github.com/patternfly/patternfly-react/pull/8619)

We've removed the switchDelay prop the `ClipBoardCopy` component.

#### Examples

In:

```jsx
<ClipboardCopy switchDelay="500" />
```

Out:

```jsx
<ClipboardCopy  />
```

### datalist-remove-ondrags [(#8388)](https://github.com/patternfly/patternfly-react/pull/8388)

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

### dropdownMenu-remove-openedOnEnter [(#8179)](https://github.com/patternfly/patternfly-react/pull/8179)

We've removed the `openedOnEnter` prop for the `DropdownMenu`.

#### Examples

In:

```jsx
<DropdownMenu openedOnEnter={false} />
```

Out:
```jsx
<DropdownMenu  />
```
### dropdownToggle-remove-isprimary [(#8179)](https://github.com/patternfly/patternfly-react/pull/8179)

We've removed the deprecated `isPrimary` prop. This rule wil replace it with the "primary" value on the `toggleVariant` prop.

#### Examples

In:

```jsx
<DropdownToggle isPrimary />
```

Out:

```jsx
<DropdownToggle toggleVariant="primary" />
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

### horizontalSubnav-ariaLabel [(#8213)](https://github.com/patternfly/patternfly-react/pull/8213)

We've updated the default value of the `aria-label` attribute for Nav with a `horizontal-subnav` variant to "local" (previously the default value was "Global").

### menuItemAction-ariaLabel-required [(#8617)](https://github.com/patternfly/patternfly-react/pull/8617)

We've update the `aria-label` prop on MenuItemAction, making it required instead of optional.

### pagination-optionsToggle [(#8319)](https://github.com/patternfly/patternfly-react/pull/8319)

We've removed the `OptionsToggle` used by `Pagination` and replaced it with `Menu` and `MenuToggle`.

### pagination-remove-ToggleTemplateProps [(#8134)](https://github.com/patternfly/patternfly-react/pull/8134)

We've removed the deprecated `ToggleTemplateProps` prop and replaced it with `PaginationToggleTemplateProps`.

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
  currPage="text"
  paginationTitle="text"
  toFirstPage="text"
  toLastPage="text"
  toNextPage="text"
  toPreviousPage="text"
  optionsToggle="text"
  defaultToFullPage
  perPageComponenet="div"
/>
```

Out:

```jsx
<Pagination
  currPageAriaLabel="text"
  paginationAriaLabel="text"
  toFirstPageAriaLabel="text"
  toLastPageAriaLabel="text"
  toNextPageAriaLabel="text"
  toPreviousPageAriaLabel="text"
  optionsToggleAriaLabel="text"
  isLastFullPageShown
/>
```

### popover-remove-props [(#8201)](https://github.com/patternfly/patternfly-react/pull/8201)

We've removed the `boundary` and `tippyProps` from Popover, as well as removed the first parameter of `shouldClose` and all parameters of `onHidden`, `onHide`, `onMount`, `onShow`, and `onShown`.

#### Examples

In:

```jsx
<Popover boundary={} tippyProps={} shouldClose={(tip, hideFunction) => {/* ... */}} onHidden={(tip) => {/* ... */}} onHide={(tip) => {/* ... */}} onMount={(tip) => {/* ... */}} onShow={(tip) => {/* ... */}} onShown={(tip) => {/* ... */}} />
```

Out:

```jsx
<Popover
  shouldClose={(hideFunction) => {
    /* ... */
  }}
  onHidden={() => {
    /* ... */
  }}
  onHide={() => {
    /* ... */
  }}
  onMount={() => {
    /* ... */
  }}
  onShow={() => {
    /* ... */
  }}
  onShown={() => {
    /* ... */
  }}
/>
```

### react-dropzone-warn-upgrade [(#7926)](// https://github.com/patternfly/patternfly-react/pull/7926)

The `react-dropzone` dependency used with FileUpload, MultipleFileUpload, and CodeEditor has been updated from version 9 to version 14.

### remove-removeFindDomNode [(#8371)](https://github.com/patternfly/patternfly-react/pull/8371) [(#8316)](https://github.com/patternfly/patternfly-react/pull/8316)

We've removed the `removeFindDomNode` property as it is now the default behavior. The affected components are as follows: ApplicationLauncher, ClipboardCopy, ContextSelector, Dropdown, NavItem, OptionsMenu, Popover, SearchInput, Select, OverflowTab, Timepicker, Tooltip, Truncate.

#### Examples

In:

```jsx
<ApplicationLauncher removeFindDomNode />
<ClipboardCopy removeFindDomNode />
<ContextSelector removeFindDomNode />
<Dropdown removeFindDomNode />
<NavItem removeFindDomNode />
<OptionsMenu removeFindDomNode />
<Popover removeFindDomNode />
<SearchInput removeFindDomNode />
<Select removeFindDomNode />
<OverflowTab removeFindDomNode />
<Timepicker removeFindDomNode />
<Tooltip removeFindDomNode />
<Truncate removeFindDomNode />
```

Out:

```jsx
<ApplicationLauncher  />
<ClipboardCopy  />
<ContextSelector  />
<Dropdown  />
<NavItem  />
<OptionsMenu  />
<Popover  />
<SearchInput  />
<Select  />
<OverflowTab  />
<Timepicker  />
<Tooltip  />
<Truncate  />
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

### remove-toggleMenuBaseProps [(#8235)](https://github.com/patternfly/patternfly-react/pull/8235)

We've removed the deprecated `ToggleMenuBaseProps` interface.

### resizeObserver-function-param [(#8324)](https://github.com/patternfly/patternfly-react/pull/8324)

We've updated the default value of the `getResizeObserver` helper function's third parameter, `useRequestAnimationFrame`. This rule will only provide two suggestions detailing when to pass which boolean into this parameter.

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

### spinner-svg-default [(#8183)](https://github.com/patternfly/patternfly-react/pull/8183)

We've updated the Spinner to default to an svg, so the `isSVG` property is no longer required.

#### Examples

In:

```jsx
<Spinner isSVG />
```

Out:

```jsx
<Spinner  />
```

### tableComposable-remove-hasSelectableRowCaption [(#8352)](https://github.com/patternfly/patternfly-react/pull/8352)

We've removed the deprecated `hasSelectableRowCaption` prop.

#### Examples

In:

```jsx
<TableComposable hasSelectableRowCaption />
```

Out:

```jsx
<TableComposable  />
```

### tabs-rename-hasBorderBottom [(#8517)](https://github.com/patternfly/patternfly-react/pull/8517)

We've renamed the `hasBorderBottom` prop to `hasNoBorderBottom`.

#### Examples

In:

```jsx
<Tabs hasBorderBottom />
<Tabs hasBorderBottom={true} />
<Tabs hasBorderBottom={false} />
<Tabs hasBorderBottom={someVar} />
```

Out:

```jsx
<Tabs  />
<Tabs  />
<Tabs hasNoBorderBottom />
<Tabs hasNoBorderBottom={!someVar} />
```

### tabs-rename-hasSecondaryBorderBottom [(#8517)](https://github.com/patternfly/patternfly-react/pull/8517)

We've removed the deprecated `hasSecondaryBorderBottom` prop.

#### Examples

In:

```jsx
<Tabs hasSecondaryBorderBottom />
```

Out:

```jsx
<Tabs  />
```

### tabs-warn-children-type-changed [(#8217)](https://github.com/patternfly/patternfly-react/pull/8217)

We've restricted the type of elements that can be passed to the `Tabs` component.

This rule will raise a warning when `Tabs` is imported in a file, even if the children passed to it are already of the appropriate type. It will not make any code changes.

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

### warn-key-codes-removed [(#8174)](https://github.com/patternfly/patternfly-react/pull/8174)

We've removed the `KEY_CODES` constant from our constants file. If your code relies on it we suggest that you refactor to use `KeyTypes` as `KeyboardEvent.keyCode` is deprecated.

This rule will raise a warning when `KEY_CODES` is imported in a file, but it will not make any code changes.

### wizard-warn-button-order [(#8409)](https://github.com/patternfly/patternfly-react/pull/8409)

The order of the "next" and "back" buttons in the Wizard has been updated, with the "next" button now coming after the "back" button. This update has also been made in the Next implementation of the WizardFooter. We recommend updating any tests that may rely on relative selectors and updating any composable implementations to match this new button order.

This rule will raise a warning when Wizard is imported from `@patternfly/react-core` or WizardFooter is imported from `@patternfly/react-core/next`, but it will not make any code changes.
