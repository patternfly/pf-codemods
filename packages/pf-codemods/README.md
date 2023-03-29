# pf-codemods

Hey PatternFly-React devs! `pf-codemods` is an eslint wrapper to update @patternfly/react-core@4.x.x code to 5.x.x.

We hope these rules and their autofixers will help you more quickly adopt our breaking changes. These rules are not designed to fix all build errors, but they can help to fix easy ones as well as point out the more complicated ones and offer suggestions on how you might go about fixing them.

## Usage

### Simple case

Requires Node.js >= 10.

```sh
npx @patternfly/pf-codemods ./path-to-src
```

Giving node more RAM can help for large codebases.

```sh
NODE_OPTIONS=--max-old-space-size=4096 npx @patternfly/pf-codemods ./path-to-src
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

### alert-remove-ariaLabel [(#8649)](https://github.com/patternfly/patternfly-react/pull/8649)

We've removed the `aria-label` prop from Alert. This prop should not be used on an Alert as it is not well supported by assistive technologies on `<div>` elements.

#### Examples

In:

```jsx
<Alert aria-label="Error alert" />
```

Out:

```jsx
<Alert  />
```

### alert-replace-titleHeadingLevel [(#8518)](https://github.com/patternfly/patternfly-react/pull/8518)

We've removed the `titleHeadlingLevel` prop and replaced it with the `component` prop.

In:

```jsx
<Alert titleHeadingLevel="h4" />
```

Out:

```jsx
<Alert component="h4" />
```

### applicationLauncher-updated-params [(#8756)](https://github.com/patternfly/patternfly-react/pull/8756)

We've updated the `onFavorite` and `onSearch` props for ApplicationLauncher to include the `event` as their first parameter. Handlers may require an update.

#### Examples

In:

```jsx
<ApplicationLauncher onFavorite={(id) => handler(id)} onSearch={(text) => searchHandler(text)}/>
const handler1 = (id) => {};
const searchHandler1 = (text) => {};
<ApplicationLauncher onFavorite={handler1} onSearch={searchHandler1}>
function handler2(id) {};
function searchHandler2(text) {};
<ApplicationLauncher onFavorite={handler2} onSearch={searchHandler2}>
```

Out:

```jsx
<ApplicationLauncher onFavorite={(_event, id) => handler(id)} onSearch={(_event, text) => searchHandler(text)}/>
const handler1 = (_event, id) => {};
const searchHandler1 = (_event, text) => {};
<ApplicationLauncher onFavorite={handler1} onSearch={searchHandler1}>
function handler2(_event, id) {};
function searchHandler2(_event, text) {};
<ApplicationLauncher onFavorite={handler2} onSearch={searchHandler2}>
```


### applicationLauncher-warn-input [(#8293)](https://github.com/patternfly/patternfly-react/pull/8293)

We've updated the internal input in ApplicationLauncher to the PatternFly SearchInput. Any relative selectors, such as in unit tests, may need to be updated.

### banner-update-variant [(#8204)](https://github.com/patternfly/patternfly-react/issues/8204)

We've updated the `variant` prop type for Banner. `"default"` is still a valid value, but the following status values have been replaced with color values:

| Old status value | New color value |
| - | - |
| info | blue |
| danger | red |
| success | green |
| warning | gold |

#### Examples

In:

```jsx
<Banner variant="danger" />
```

Out:

```jsx
<Banner variant="red" />
```

### button-remove-isSmallisLarge [(#8144)](https://github.com/patternfly/patternfly-react/pull/8144)

We've removed the `isSmall` and `isLarge` props for Button and replaced them with the `size` prop using the values `"sm"` and `"lg"`, respectively.

#### Examples

In:

```jsx
<Button isSmall />
<Button isLarge />
```

Out:

```jsx
<Button size="sm" />
<Button size="lg" />
```

### calendarMonth-update-onChange-onMonthChange-params [(#8753)](https://github.com/patternfly/patternfly-react/pull/8753)

We've updated the `onMonthChange` prop for CalendarMonth to include the `event` as its first parameter. Handlers may require an update.

#### Examples

In:

```jsx
<CalendarMonth onChange={(date) => handler(date)} onMonthChange={(newDate) => handler(newDate)} />
<CalendarMonth onMonthChange={(newDate, event) => handler(newDate, event)} />
const changeHandler1 = (date) => {};
const handler1 = (newDate, event) => {};
<CalendarMonth onChange={changeHandler1} onMonthChange={handler1}>
function changeHandler2(date) {};
function handler2(newDate, event) {};
<CalendarMonth onChange={changeHandler2} onMonthChange={handler2}>
```

Out:

```jsx
<CalendarMonth onChange={(_event, date) => handler(date)} onMonthChange={(_event, newDate) => handler(newDate)} />
<CalendarMonth onMonthChange={(event, newDate) => handler(newDate, event)} />
const changeHandler1 = (_event, date) => {};
const handler1 = (_event, newDate) => {};
<CalendarMonth onMonthChange={handler1}>
function changeHandler2(_event, date) {};
function handler2(_event, newDate) {};
<CalendarMonth onChange={changeHandler2} onMonthChange={handler2}>
```

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

### card-reorder-onSelectableInputChange-props [(#8752)](https://github.com/patternfly/patternfly-react/pull/8752)

We've updated the `onSelectableInputChange` prop for Card to include the `event` as its first parameter. Handlers may require an update.

#### Examples

In:

```jsx
<Card onSelectableInputChange={(id) => handler(id)} />
const handler1 = (id) => {};
<Card onSelectableInputChange={handler1}>
function handler2(id) {};
<Card onSelectableInputChange={handler2}>
```

Out:

```jsx
<Card onSelectableInputChange={(_event, id) => handler(id)} />
const handler1 = (_event, id) => {};
<Card onSelectableInputChange={handler1}>
function handler2(_event, id) {};
<Card onSelectableInputChange={handler2}>
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

### charts-lightThemeObjects [(#8590)](https://github.com/patternfly/patternfly-react/pull/8590)

We've renamed all light theme objects to remove `Light` from their name. Additionally, these theme objects have been marked `@private` and should not be used directly. Instead you should use the `getTheme` function from react-charts.

This rule will throw an error, but will not make any changes.

### charts-remove-darkThemeObjects [(#8590)](https://github.com/patternfly/patternfly-react/pull/8590)

We've removed all dark theme objects from react-charts.

#### Examples

In:
```jsx
import { DarkBlueColorTheme, DarkCyanColorTheme, DarkGoldColorTheme, DarkGrayColorTheme, DarkGreenColorTheme, DarkMultiColorOrderedTheme, DarkMultiColorUnorderedTheme,
DarkOrangeColorTheme, DarkPurpleColorTheme, ChartLegend } from '@patternfly/react-charts'
```

Out:
```jsx
import { ChartLegend } from '@patternfly/react-charts'
```

### charts-remove-ChartThemeVariant [(#8590)](https://github.com/patternfly/patternfly-react/pull/8590)

We've removed `ChartThemeVariant` from react-charts.

#### Examples

In:

```jsx
import { Chart, ChartThemeVariant } from '@patternfly/react-charts';
```

Out:

```jsx
import { Chart } from '@patternfly/react-charts';
```

### charts-remove-themeVariant [(#8590)](https://github.com/patternfly/patternfly-react/pull/8590)

We've removed the deprecated `themeVariant` properties from all react-charts components and the react-charts `getCustomTheme` function. This functionality was previously a noop and replaced by PatternFly core's dark theme support.

#### Examples

In:

```jsx
import { Chart, ChartThemeColor, getCustomTheme } from '@patternfly/react-charts';

const customTheme = {...};
const newTheme = getCustomTheme(ChartThemeColor.default, 'light', customTheme);

return (
  <Chart themeVariant='light' theme={newTheme}/>
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

### charts-warn-tooltip [(#8592)](https://github.com/patternfly/patternfly-react/pull/8592)

When using the `react-core` Tooltip component inside of a `react-charts` component, the Tooltip should be wrapped inside a `foreignObject`. The Tooltip may not render properly otherwise due to it outputting a `<div>` element inside an `<svg>` element.

This rule will raise a warning when Tooltip is imported from `@patternfly/react-core` and at least one other import is from `@patternfly/react-charts`, but will not update any code.

### checkbox-reorder-onChange-params [(#8750)](https://github.com/patternfly/patternfly-react/pull/8750)

We've updated the `onChange` prop for Checkbox to include the `event` as its first parameter. Handlers may require an update.

#### Examples

In:

```jsx
<Checkbox onChange={(id) => handler(id)} />
<Checkbox onChange={(id, event) => handler(id, event)} />
const handler1 = (id, event) => {};
<Checkbox onChange={handler1}>
function handler2(id, event) {};
<Checkbox onChange={handler2}>
```

Out:

```jsx
<Checkbox onChange={(_event, id) => handler(id)} />
<Checkbox onChange={(event, id) => handler(id, event)} />
const handler1 = (_event, id) => {};
<Checkbox onChange={handler1}>
function handler2(_event, id) {};
<Checkbox onChange={handler2}>
```

### clipboardCopy-onChange-event-added [(#8747)](https://github.com/patternfly/patternfly-react/pull/8747)

The `onChange` prop for ClipboardCopy has been updated to include the `event` as its first parameter. `onChange` handlers may require an update.

#### Examples

In:

```jsx
<ClipboardCopy onChange={(text) => handleChange(text)} />
const handleChange1 = (text) => {};
<ClipboardCopy onChange={toggle1}>
function handleChange2(text) {};
<ClipboardCopy onChange={toggle2}>
```

Out:

```jsx
<ClipboardCopy onChange={(_event, text) => handleChange(text)} />
const handleChange1 = (_event, text) => {};
<ClipboardCopy onChange={toggle1}>
function handleChange2(_event, text) {};
<ClipboardCopy onChange={toggle2}>
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

### clipboardCopy-remove-switchDelay [(#8619)](https://github.com/patternfly/patternfly-react/pull/8619)

We've removed the switchDelay prop from the `ClipBoardCopy` component.

#### Examples

In:

```jsx
<ClipboardCopy switchDelay="500" />
```

Out:

```jsx
<ClipboardCopy  />
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

### conditional-aria [(#8649)](https://github.com/patternfly/patternfly-react/pull/8649)

We've updated several ARIA related props so that they will now only be conditionally applied when passed in for the following components:

| Component | Prop | Condition |
| -- | -- | -- |
| `Wizard` | `mainAriaLabel`, `mainAriaLabelledBy` | Only when the Wizard's body contents overflows and causes a scrollbar. A tabindex of "0" will also be applied when the contents oveflows. |
| `WizardBody` (Next implementation) | `aria-label`, `aria-labelledby` | Only when the WizardBody contents overflows and causes a scrollbar. A tabindex of "0" will also be applied when the contents oveflows. |
| `MenuItem` | `aria-label` | When `hasCheckbox` is also passed, the prop is applied to the internal `<li>` element. Otherwise it is applied to the element passed into the `component` prop. |
| `PageGroup`, `PageNavigation` | `aria-label` | Only when `hasOverflowScroll` is true. |

Additionally, the internal `aria-labelledby` for ProgressStep will only be applied when the `popoverRender` prop is also passed.

This rule will raise a warning, but will not make any code changes.

### datalist-remove-props [(#8388)](https://github.com/patternfly/patternfly-react/pull/8388)

We've removed the deprecated `onDragFinish`, `onDragStart`, `onDragMove`, `onDragCancel`, and `itemOrder` props from DataList.

In addition to removing these props, this rule will suggest using the DragDrop component instead of the `onDrag...` props.

#### Examples

In:

```jsx
<DataList onDragFinish onDragStart onDragMove onDragCancel itemOrder />
```

Out:

```jsx
<DataList      />
```

### dataList-updated-callback [(#8723)](https://github.com/patternfly/patternfly-react/pull/8723)

We've updated the `onSelectDataListItem` prop for DataList to include the `event` as its first parameter. Handlers may require an update.

#### Examples

In:

```jsx
<DataList onSelectDataListItem={(id) => onSelect(id)} />

const toggle1 = (id) => {};
<DataList onSelectDataListItem={toggle1}>

function toggle2(id) {};
<DataList onSelectDataListItem={toggle2}>
```

Out:

```jsx
<DataList onSelectDataListItem={(_event, id) => onSelect(id)} />

const toggle1 = (_event, id) => {};
<DataList onSelectDataListItem={toggle1}>

function toggle2(_event, id) {};
<DataList onSelectDataListItem={toggle2}>
```

### dataListCheck-warn-updated-callback [(#8735)](https://github.com/patternfly/patternfly-react/pull/8735)

We've updated the `onChange` prop for DataListCheck so that the `event` parameter is the first parameter. Handlers may require an update.

#### Examples

In:

```jsx
<DataListCheck onChange={(checked) => onChange(checked)} />

const onChange1 = (checked) => {};
<DataListCheck onChange={onChange1}>

function onChange2(checked) {};
<DataListCheck onChange={onChange2}>
```

Out:

```jsx
<DataListCheck onChange={(_event, checked) => onChange(checked)} />

const onChange1 = (_event, checked) => {};
<DataListCheck onChange={onChange1}>

function onChange2(_event, checked) {};
<DataListCheck onChange={onChange2}>
```


### datePicker-warn-appendTo-default-value-changed [(#8636)](https://github.com/patternfly/patternfly-react/pull/8636)

The default value of the `appendTo` prop on DatePicker has been updated, which may cause markup changes that require updating selectors in tests. This rule will raise a warning, but will not make any changes.

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

### drawerPanelContent-warn-updated-callback [(#8736)](https://github.com/patternfly/patternfly-react/pull/8736)

We've updated the `onResize` prop for DrawerPanelContent to include the `event` as its first parameter. Handlers may require an update.

#### Examples

In:

```jsx
<DrawerPanelContent onResize={(width, id) => onChange(checked)} />

const onResize1 = (width, id) => {};
<DrawerPanelContent onResize={onResize1}>

function onResize2(width, id) {};
<DrawerPanelContent onResize={onResize2}>
```

Out:

```jsx
<DrawerPanelContent onResize={(_event, width, id) => onChange(checked)} />

const onResize1 = (_event, width, id) => {};
<DrawerPanelContent onResize={onResize1}>

function onResize2(_event, width, id) {};
<DrawerPanelContent onResize={onResize2}>
```

### dropdown-update-deprecatedPath [(#8835)](https://github.com/patternfly/patternfly-react/pull/8835)

We've deprecated the current implementation of Dropdown. In order to continue using this deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased. However, we suggest updating to our newer implementation of Dropdown.

The following imports will be affected by this deprecation:

- BadgeToggle
- Dropdown
- DropdownPosition
- DropdownDirection
- DropdownContext
- DropdownArrowContext
- DropdownGroup
- DropdownItem
- DropdownMenu
- DropdownSeparator
- DropdownToggle
- DropdownToggleAction
- DropdownToggleCheckbox
- DropdownWithContext
- KebabToggle

#### Examples

In:

```jsx
import { Dropdown, DropdownPosition Button } from '@patternfly/react-core';

<Dropdown position={DropdownPosition.right} />
```

Out:

```jsx
import { Button } from '@patternfly/react-core';
import { Dropdown as DropdownDeprecated, DropdownPosition as DropdownPositionDeprecated } from '@patternfly/react-core/deprecated';

<DropdownDeprecated position={DropdownPositionDeprecated.right}  />
```

### dropdownItem-remove-isHovered [(#8179)](https://github.com/patternfly/patternfly-react/pull/8179)

We've removed the `isHovered` prop for the `DropdownItem`.

#### Examples

In:

```jsx
<DropdownItem isHovered={isHovered} />
```

Out:
```jsx
<DropdownItem  />
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

### emptyStateIcon-icon-required [(#8737)](https://github.com/patternfly/patternfly-react/pull/8737)

We've made the `icon` prop required on EmptyStateIcon.

This rule will throw an error, but will not make any changes.

### emptyStateIcon-remove-props [(#8737)](https://github.com/patternfly/patternfly-react/pull/8737)

We've removed the `variant` prop from EmptyStateIcon.
We've removed the `component` prop from EmptyStateIcon and replaced it with the `icon` prop.

#### Examples

In:

```jsx
<EmptyStateIcon icon={CubesIcon} variant="icon"/>
<EmptyStateIcon component={Spinner} variant="container"/>
```

Out:

```jsx
<EmptyStateIcon icon={CubesIcon} />
<EmptyStateIcon icon={Spinner} />
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

### hasCheck-prop-rename [(#8403)](https://github.com/patternfly/patternfly-react/pull/8403)

We've renamed the `hasCheck` prop for TreeView, MenuItem, and the Next implementation of SelectOption to `hasCheckbox`.

#### Examples

In:

```jsx
<SelectOption hasCheck />
<TreeView hasCheck />
<MenuItem hasCheck />
```

Out:

```jsx
<SelectOption hasCheckbox />
<TreeView hasCheckbox />
<MenuItem hasCheckbox />
```

### horizontalSubnav-warn-ariaLabel [(#8213)](https://github.com/patternfly/patternfly-react/pull/8213)

We've updated the default value of the `aria-label` attribute for Nav with a `horizontal-subnav` variant to "local" (previously the default value was "Global").

### key-codes-removed [(#8174)](https://github.com/patternfly/patternfly-react/pull/8174)

We've removed the `KEY_CODES` constant from our constants file. If your code relies on it we suggest that you refactor to use `KeyTypes` as `KeyboardEvent.keyCode` is deprecated.

This rule will raise an error when `KEY_CODES` is imported in a file, but it will not make any code changes.

### label-remove-isTruncated [(#8771)](https://github.com/patternfly/patternfly-react/pull/8771)

We've removed the `isTruncated` property from Label. This is now the default behavior. In addition, you can limit the text width using the new `textMaxWidth` property.

#### Examples

In:

```jsx
<Label isTruncated />
```

Out:

```jsx
<Label  />
```

### masthead-update-component [(#8655)](https://github.com/patternfly/patternfly-react/pull/8655)

We've updated `MastheadBrand` to only be an anchor if an `href` is specified, otherwise it will be a `span`. Explicitly declared `component` properties will remain unchanged, but if it is not specified a default will be added.

#### Examples

In:

```jsx
<MastheadBrand />
<MastheadBrand component="div" />
```

Out:

```jsx
<MastheadBrand component="a" />
<MastheadBrand component="div" />
```

### menu-moved-ariaLabel [(#8649)](https://github.com/patternfly/patternfly-react/pull/8649)

We've removed the `aria-label` prop on Menu as it should be passed to MenuList instead. If you are also using MenuGroup with a `label` prop passed to it, an `aria-label` on MenuList is not necessary.

#### Examples

In:

```jsx
<Menu aria-label="tester">
  <MenuList>
    ...menu items placed here
  </MenuList>
</Menu>

<Menu aria-label="tester">
  <MenuList>
    ...menu items placed here
  </MenuList>
  <MenuList>
    ...menu items placed here
  </MenuList>
</Menu>

<Menu aria-label="tester">
  <MenuGroup>
    <MenuList>
      ...menu items placed here
    </MenuList>
  </MenuGroup>
</Menu>
```

Out:

```jsx
<Menu >
  <MenuList aria-label="tester">
    ...menu items placed here
  </MenuList>
</Menu>

<Menu >
  <MenuList>
    ...menu items placed here
  </MenuList>
  <MenuList>
    ...menu items placed here
  </MenuList>
</Menu>

<Menu >
  <MenuGroup>
    <MenuList>
      ...menu items placed here
    </MenuList>
  </MenuGroup>
</Menu>
```

### menuItemAction-ariaLabel-required [(#8617)](https://github.com/patternfly/patternfly-react/pull/8617)

We've update the `aria-label` prop on MenuItemAction, making it required instead of optional.

### menu-search-rename [(#8820)](https://github.com/patternfly/patternfly-react/pull/8820)

`MenuInput` has been renamed to `MenuSearchInput` and `MenuSearch` has been added as a wrapper.

In:

```jsx
  <MenuInput><SearchInput /></MenuInput>
```

Out:

```jsx
    <MenuSearch><MenuSearchInput><SearchInput /></MenuSearchInput></MenuSearch>
```

### nav-warn-flyouts-now-inline [(#8628)](https://github.com/patternfly/patternfly-react/pull/8628)

The placement Nav flyouts in the DOM has been changed, if you have Nav elements with flyouts you may need to update some selectors or snapshots in your test suites. This rule will raise a warning, but will not make any changes.

### notificationBadge-remove-isRead [(#8626)](https://github.com/patternfly/patternfly-react/pull/8626)

We've removed the `isRead` prop from NotificationBadge, use "read" or "unread" on the `variant` prop instead.

#### Examples

In:

```jsx
  <NotificationBadge isRead />
  <NotificationBadge isRead={false} />
  <NotificationBadge isRead={isRead} />
  <NotificationBadge isRead={isRead || markedRead} />
```

Out:

```jsx
  <NotificationBadge variant="read" />
  <NotificationBadge variant="unread" />
  <NotificationBadge variant={isRead ? "read" : "unread"} />
  <NotificationBadge variant={(isRead || markedRead) ? "read" : "unread"} />
```

### numberInput-remove-allowEmptyInput [(#8715)](https://github.com/patternfly/patternfly-react/pull/8715)

We've removed the `allowEmptyInput` prop from NumberInput.

#### Examples

In:

```jsx
<NumberInput allowEmptyInput />
```

Out:

```jsx
<NumberInput  />
```

### optionsMenu-deprecate [(8798)](https://github.com/patternfly/patternfly-react/pull/8798)

We've deprecated the `OptionsMenu` compoenents. A fix will update code to point to the new deprecated import, but we recommend replacing with `Dropdown` or `Select`

#### Examples

In:

```jsx
import { OptionsMenu, OptionsMenuToggle } from '@patternfly/react-core';
```

Out:

```jsx
import { OptionsMenu as OptionsMenuDeprecated, OptionsMenuToggle as OptionsMenuToggleDeprecated } from '@patternfly/react-core/deprecated';
```

### onToggle-updated-parameters [(#8667)](https://github.com/patternfly/patternfly-react/pull/8667)

We've updated the `onToggle` function to include the `event` as its first parameter for the following components: `ApplicationLauncher`, `BadgeToggle`, `DropdownToggle`, `KebabToggle`, `Toggle`, `Select`, and `SelectToggle`. Handlers for these components may require an update.

#### Examples

In:

```jsx
<Toggle onToggle={(isOpen) => onToggle(isOpen)} />

const toggleBadge = (isOpen) => {};
<BadgeToggle onToggle={toggleBadge}>

function toggleDropdown(isOpen) {};
<DropdownToggle onToggle={toggleDropdown}>
```

Out:

```jsx
<Toggle onToggle={(_event, isOpen) => onToggle(isOpen)} />

const toggleBadge = (_event, isOpen) => {};
<BadgeToggle onToggle={toggleBadge}>

function toggleDropdown(_event, isOpen) {};
<DropdownToggle onToggle={toggleDropdown}>
```

### overflowMenu-warn-updated-dropdownItem [(#8359)](https://github.com/patternfly/patternfly-react/pull/8359)

OverflowMenuDropdownItem now uses the Next implementation of DropdownItem and DropdownItemProps internally, and may require updating selectors for tests. Any other Dropdown componments used to build an OverflowMenu should also use the Next Dropdown components.

This rule will raise a warning when OverflowMenuDropdownItem is imported, but will not update any code.

### overflowMenuDropdownItem-renamed-prop [(#8359)](https://github.com/patternfly/patternfly-react/pull/8359)

We've renamed the `index` prop for OverflowMenuDropdownItem to `itemId`, and updated its type to `string | number`.

#### Examples

In:

```jsx
<OverflowMenuDropdownItem index={0}>
```

Out:

```jsx
<OverflowMenuDropdownItem itemId={0}>
```

### pageheader-update-logoComponent [(#8655)](https://github.com/patternfly/patternfly-react/pull/8655)

We've updated `PageHeader`'s logo to only be an anchor if an `href` is specified, otherwise it will be a `span`. Explicitly declared `logoComponent` properties will remain unchanged, but if it is not specified a default will be added.

#### Examples

In:

```jsx
<PageHeader />
<PageHeader logoComponent="div" />
```

Out:

```jsx
<PageHeader logoComponent="a" />
<PageHeader logoComponent="div" />
```

### pagination-optionsToggle [(#8319)](https://github.com/patternfly/patternfly-react/pull/8319)

We've removed the `OptionsToggle` used by `Pagination` and replaced it with `Menu` and `MenuToggle`.

### pagination-rename-props [(#8319)](https://github.com/patternfly/patternfly-react/pull/8319)

We've renamed and/or removed several props for Pagination:

- `defaultToFullPage`: `isLastFullPageShown`,
- `perPageComponenet`: removed

We've also renamed several sub-props of Pagination's "title" prop:

- `currPage`: `currPageAriaLabel`,
- `paginationTitle`: `paginationAriaLabel`,
- `toFirstPage`: `toFirstPageAriaLabel`,
- `toLastPage`: `toLastPageAriaLabel`,
- `toNextPage`: `toNextPageAriaLabel`,
- `toPreviousPage`: `toPreviousPageAriaLabel`,
- `optionsToggle`: `optionsToggleAriaLabel`,


#### Examples

In:

```jsx
<Pagination
  perPageComponenet="div"
  defaultToFullPage
  titles={{
    currPage: "text"
    paginationTitle: "text"
    toFirstPage: "text"
    toLastPage: "text"
    toNextPage: "text"
    toPreviousPage: "text"
    optionsToggle: "text"
  }}
/>
```

Out:

```jsx
<Pagination
  isLastFullPageShown
  titles={{
    currPageAriaLabel: "text"
    paginationAriaLabel: "text"
    toFirstPageAriaLabel: "text"
    toLastPageAriaLabel: "text"
    toNextPageAriaLabel: "text"
    toPreviousPageAriaLabel: "text"
    optionsToggleAriaLabel: "text"
  }}
/>
```

### pagination-rename-toggleTemplateProps [(#8134)](https://github.com/patternfly/patternfly-react/pull/8134)

We've renamed `ToggleTemplateProps` to `PaginationToggleTemplateProps`.

#### Examples

In:

```jsx
import { Pagination, ToggleTemplateProps } from '@patternfly/react-core';
<Pagination toggleTemplate={({firstIndex, lastIndex} : ToggleTemplateProps) => <div />} />
```

Out:

```jsx
import { Pagination, PaginationToggleTemplateProps } from '@patternfly/react-core';
<Pagination toggleTemplate={({firstIndex, lastIndex} : PaginationToggleTemplateProps) => <div />} />
```

### popper-remove-popperMatchesTriggerWidth [(#8724)](https://github.com/patternfly/patternfly-react/pull/8724)

We've removed the `popperMatchesTriggerWidth` prop from Popper. `minWidth`, `maxWidth`, and `width` props can instead be used to modify the Popper width.

#### Examples

In:

```jsx
<Popper popperMatchesTriggerWidth />
```

Out:

```jsx
<Popper  />
```

### popover-appendTo-default [(#8621)](https://github.com/patternfly/patternfly-react/pull/8621)

The default value of the `appendTo` prop on Popover has been updated, which may cause markup changes that require updating selectors in tests. This rule will raise a warning, but will not make any changes.

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

### popover-warn-appendTo-default [(#8621)](https://github.com/patternfly/patternfly-react/pull/8621)

The default value of the `appendTo` prop on Popover has been updated, which may cause markup changes that require updating selectors in tests. This rule will raise a warning, but will not make any changes.

### react-dropzone-warn-upgrade [(#7926)](// https://github.com/patternfly/patternfly-react/pull/7926)

The `react-dropzone` dependency used with FileUpload, MultipleFileUpload, and CodeEditor has been updated from version 9 to version 14. As part of this upgrade, FileUpload has had type changes to its `onFileInputChange` and `dropzoneProps` props, and MultipleFileUpload has had a type change to its `dropzoneProps` prop.

This rule will raise a warning when any of these three components are imported, but will not make any code changes.

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

### spinner-remove-isSvg [(#8616)](https://github.com/patternfly/patternfly-react/pull/8616)

We've updated the Spinner to exclusively use an SVG, and have removed the isSVG prop.

#### Examples

In:

```jsx
<Spinner isSVG />
```

Out:

```jsx
<Spinner  />
```

### table-warn-actionsColumn [(#8629)](https://github.com/patternfly/patternfly-react/pull/8629)

Table and TableComposable's `ActionsColumn` has been updated to use the newer 'next' version of Dropdown. The toggle passed to the actions column should now be a `MenuToggle` instead of a `DropdownToggle`. The `dropdownPosition`, `dropdownDirection` and `menuAppendTo` properties are removed and `Popper` properties can be passed in using `popperProps` instead (via `direction`, `position`, `appendTo`, etc.).

### table-warn-thExpandType [(#8634)](https://github.com/patternfly/patternfly-react/pull/8634)

`collapseAllAriaLabel` on `ThExpandType` has been updated to a `string` from `''`. Workarounds casting this property to an empty string are no longer required.

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

### toolbarVarious-remove-alignment [(#8563)](https://github.com/patternfly/patternfly-react/pull/8563)

We've removed the `alignment` prop from `ToolbarContent`, `ToolbarGroup`, and `ToolbarItem`. For `ToolbarGroup` and `ToolbarItem` it has been replaced with `align`.

#### Examples

In:

```jsx
<ToolbarContent alignment={{ default: 'alignLeft' }} />
<ToolbarGroup alignment={{ default: 'alignLeft' }} />
<ToolbarItem alignment={{ default: 'alignLeft' }} />
```

Out:

```jsx
<ToolbarContent  />
<ToolbarGroup align={{ default: 'alignLeft' }} />
<ToolbarItem align={{ default: 'alignLeft' }} />
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

### various-rename-reference [(#8733)](https://github.com/patternfly/patternfly-react/pull/8733)

We've renamed the `reference` property to `triggerRef` in Popover and Tooltip components.

#### Examples

In:

```jsx
<Popover reference={componentRef} />
<Tooltip reference={componentRef} />
```

Out:

```jsx
<Popover triggerRef={componentRef} />
<Tooltip triggerRef={componentRef} />
```

### wizard-warn-button-order [(#8409)](https://github.com/patternfly/patternfly-react/pull/8409)

The order of the "next" and "back" buttons in the Wizard has been updated, with the "next" button now coming after the "back" button. This update has also been made in the Next implementation of the WizardFooter. We recommend updating any tests that may rely on relative selectors and updating any composable implementations to match this new button order.

This rule will raise a warning when Wizard is imported from `@patternfly/react-core` or WizardFooter is imported from `@patternfly/react-core/next`, but it will not make any code changes.
