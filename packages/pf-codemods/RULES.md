## chipgroup-removed-props [(#4246)](https://github.com/patternfly/patternfly-react/pull/4246)
- [ ] **ChipGroup**: `withToolbar` prop has been removed.  Add the `categoryName` prop instead to add a chip group with a category.
- [ ] **ChipGroup**: `headingLevel` prop has been removed.  The category name has internally been switched to a `<span>`
- [ ] **ChipGroupToolbarItem**: This component has been removed.  To Create a ChipGroup with a category, add the `categoryName` prop to `<ChipGroup>`.  All props that were on the `<ChipGroupToolbarItem>` have been added to `<ChipGroup>`.  So to convert to new API, move move all you props up to `<ChipGroup>` and remove `<ChipGroupToolbarItem>`.

## chip-overflow [(#4246)](https://github.com/patternfly/patternfly-react/pull/4246)
- [ ] **Chip**: The overflow chip no longer contains a button.  Th specify a overflow chip as a button do the following `<Chip component='button'  isOverflowChip>`

## nav-list-variant [(#4225)](https://github.com/patternfly/patternfly-react/pull/4225)
- [ ] **Nav:** `variant` prop has been removed from `NavList`. Pass variant={`horizontal` | `tertiary`} to `Nav` instead.

## use-page-header-tools [(#4223)](https://github.com/patternfly/patternfly-react/pull/4223)
- [ ] **PageHeader**: `avatar` prop was removed. Add the avatar to the `PageHeaderTools` component instead (which is passed into `PageHeader` via the `headerTools` prop.
- [ ] **PageHeader**: `toolbar` prop was removed. Use the `headerTools` prop instead. Also, if you previously used the `Toolbar`, `ToolbarGroup`, or `ToolbarItem` components for the header, replace them with the `PageHeaderTools`, `PageHeaderToolsGroup`, and `PageHeaderToolsItem` components.

## pagination-removed-variant [(#4202)](https://github.com/patternfly/patternfly-react/pull/4202)
- [ ] Remove obsolete 'left' and 'right' variants. These should be replaced with 'top' (default) or 'bottom'.

## alert-button [(#4190)](https://github.com/patternfly/patternfly-react/pull/4190)
- [ ] If you were previously using the `action` prop for the close button, use the `actionClose` prop instead
- [ ] If you were previously using the `action` prop for a link button, use the `actionLinks` prop instead

## card-rename-components [(#4170)](https://github.com/patternfly/patternfly-react/pull/4170)
The order of this might be tricky since CardHead should only become CardHeader after existing CardHeaders have become CardTitle. Maybe an in-between temporary name can be used to swap these since we can't control the order in which rules are run.
- [ ] Rename CardHeader to CardTitle
- [ ] Rename CardHeadMain to CardHeaderMain
- [ ] Rename CardHead to CardHeader

## table-removed-transforms [(#4170)](https://github.com/patternfly/patternfly-react/pull/4170)
- [ ] Remove `cellHeightAuto` transformer. It is no longer needed.
- [ ] `cellWidth('max')` has been replaced with `cellWidth(100)`

## feat(Label): refactor for updated design and features [(#4165)](https://github.com/patternfly/patternfly-react/pull/4165)
1. Default color changed to grey. Design also adjusted.

## dropdown-rename-icon [(#4147)](https://github.com/patternfly/patternfly-react/pull/4147)
- [ ] Remove dropdownItemIcon in favor of `<DropdownItem icon={<Icon />} />`
- [ ] Remove variant prop from DropdownItem. If you were using variant="icon" before, use the new icon prop instead. (might need to split this into new rule)

## tab-rename-variant [(#4146)](https://github.com/patternfly/patternfly-react/pull/4146)
- [ ] `variant` prop to `component` 
- [ ] `TabVariant` enum to `TabComponent`

## tab-title [(#4146)](https://github.com/patternfly/patternfly-react/pull/4146)
The title should be wrapped with `<TabTitleText>` for proper styling.  If you would like to place an Icon in the Tab, it should be wrapped with `<TabTitleIcon>` for proper styling.
- [ ] `title="string"` -> `title={<TabTitleText>Users</TabTitleText>}`
- [ ] `title={<SomeReactIcon/>}` -> `title={<TabTitleIcon><SomeReactIcon/></TabTitleIcon>}`

## chore(packages): bump react peer dep to 16.8.0 [(#4144)](https://github.com/patternfly/patternfly-react/pull/4144)
- Our packages now can possibly use hooks, which requires `react@^16.8.0` instead of `react@^16.4.0`. We recommend upgrading your version of React if it is below 16.8.0.

## wizard-remove-props [(#4142)](https://github.com/patternfly/patternfly-react/pull/4142)
- [ ] **WizardNav**: Removed prop `isCompactNav `. This prop is no longer used.
- [ ] **Wizard:** Removed inPage prop. By default the Wizard will be displayed in page, filling its parent container. If the consumer passes a managed `isOpen` flag, then the Wizard will be displayed in a modal.

## wizard-rename-hasBodyPadding [(#4136)](https://github.com/patternfly/patternfly-react/pull/4136)
- [ ] Rename `hasBodyPadding` to `hasNoBodyPadding` for Wizard and WizardBody.

## rename-noPadding [(#4133)](https://github.com/patternfly/patternfly-react/pull/4133)
- [ ] Renamed `noPadding` to `hasNoPadding` for Drawer, DataList and Page components.
  - Added `hasPaddingOn` and `hasNoPaddingOn` properties to PageSection, accounting for page size breakpoints. Breakpoints are defined in the `PageSectionBreakpoints` enum.

## remove-isPseudo-props [(#4116)](https://github.com/patternfly/patternfly-react/pull/4116)
- [ ] **Button:** Remove isHover and isFocus props, all instances of them should be removed from your application.
- [ ] **Chip:** Remove isReadOnly prop, all instances of it should be removed from your application.
- [ ] **Dropdown:** Remove isHover and isFocus props from Toggle, KebabToggle, and DropdownToggle. All instances of them should be removed from your application.
- [ ] **Select:**
  - Remove isFocus prop from SelectOption, all instances of it should be removed from your application.
  - Remove isFocus and isHovered props from SelectToggle, all instances of them should be removed from your application.
- [ ] **Expandable:**
  - Rename component to ExpandableSection, all instances in your application should be renamed.
  - Remove isFocus and isHovered props from ExpandableSection, all instances of them should be removed from your application.
- [ ] **Label:** Remove isCompact prop from Label, all instances of it should be removed from your application.
- [ ] **Options menu:** Remove isFocused and isHovered prop from OptionsMenuToggle and OptionsMenuToggleWithText, all instances of it should be removed from your application.
- [ ] **Context selector:** Remove isHover prop from ContextSelectorItem. Remove isHovered and isFocused props from ContextSelectorToggle. All instances of these should be removed from your application.
- [ ] **Nav:** Change default theme to dark. Use theme="light" if you wish to use the light variant.
- [ ] **Skip to content:** Remove component prop in favor of anchor tag, all instances of it should be removed from your application.
- [ ] **Datatoolbar:** Remove separator variant, all instances of it should be removed from your application.
- [ ] **Wizard:** Remove isFullHeight and isFullWidth props, all instances of them should be removed from your application.
- [ ] **Page:** Change default theme to dark. Use theme="light" if you wish to use the light variant.

## remove-prop-types [(#4076)](https://github.com/patternfly/patternfly-react/pull/4076)
- [ ] Remove `AnyPatternFlyImport.PropTypes` since we no longer define `propTypes` for our components. Consider using our Typescript types under each packages' `dist/js` folder instead.

## empty-state-icon-removed-props [(#4065)](https://github.com/patternfly/patternfly-react/pull/4065)
- [ ] Removed deprecated `size` and `title` from EmptyStateIcon.

## wizard-rename-text [(#4063)](https://github.com/patternfly/patternfly-react/pull/4063)
- [x] `WizardNavItem`: Renamed prop `text` to `content`.  The type of the prop has been changed to React.ReactNode to allow for flexibility.

## dropdown-toggle-icon [(#4038)](https://github.com/patternfly/patternfly-react/pull/4038)
- [ ] `iconComponent` prop in `DropdownToggle` has been renamed to `toggleIndicator`, replace instances of `iconComponent` with `toggleIndicator`.

## no-experimental-imports [(#4029)](https://github.com/patternfly/patternfly-react/pull/4029) [(#4176)](https://github.com/patternfly/patternfly-react/pull/4176)
- [x] `‘import { Divider } from @patternfly/react-core/dist/esm/experimental’;` -> `'import { Divider } from '@patternfly/react-core/dist/esm/components';`

## accordion-remove-noBoxShadow [(#4022)](https://github.com/patternfly/patternfly-react/pull/4022)
- [x] Remove prop `noBoxShadow` per https://github.com/patternfly/patternfly/pull/2760 . If a shadow is needed, the accordion can be placed in a card, or a shadow can be applied either using CSS or a box-shadow utility class.

### global-background-color [(#4022)](https://github.com/patternfly/patternfly-react/pull/4022)
- [x] The tokens `global_BackgroundColor_150`, and `global_BackgroundColor_300` have been removed (see associated [Core PR](https://github.com/patternfly/patternfly/pull/2818)). Consider using `global_BackgroundColor_200` with its new value `#f0f0f0` instead.

## modal-remove-footer-alignment [(#4017)](https://github.com/patternfly/patternfly-react/pull/4017)
- [x] Modal and ModalBoxFooter: Removes prop `isFooterLeftAligned `. This prop is no longer used.

## remove-gutter-size [(#4014)](https://github.com/patternfly/patternfly-react/pull/4014)
- [x] Gallery, Grid, Level, Split, and Stack: Removed prop `gutter`. The prop `hasGutter` should be used instead.

## react-icons-OutlinedFontAwesomeLogoFullIcon [(#3978)](https://github.com/patternfly/patternfly-react/pull/3978)
- [ ] Removed `OutlinedFontAwesomeLogoFullIcon`. Import it from @fortawesome instead.

## form-isValid [(#3975)](https://github.com/patternfly/patternfly-react/pull/3975)
- [ ] TextInput, TextArea and FormSelect: Removed `isValid` prop, `validated` prop should be used instead. To set a the input to invalid, set `validated` prop to `error` or the enum value `ValidatedOptions.error`.
  - See [dtaylor's PR](https://github.com/openshift/console/pull/5081) for a possible default implementation

## select-rename-isExpanded [(#3945)](https://github.com/patternfly/patternfly-react/pull/3945)
- [x] Renames `isExpanded` property to `isOpen`.

## select-rename-checkbox
- [ ] Removes deprecated `CheckboxSelect` and `CheckboxSelectOption` components. Please use the `variant = "checkbox"`.

## empty-state-rename-variant [(#3933)](https://github.com/patternfly/patternfly-react/pull/3933)
- [ ] Variant `small` has been updated to `sm` and variant `large` has been updated to `lg`

## application-launcher-rename-dropdownItems [(#3929)](https://github.com/patternfly/patternfly-react/pull/3929)
- [x] Removes deprecated prop `dropdownItems`.  the prop `items` should be used instead

## aria-props [(#3924)](https://github.com/patternfly/patternfly-react/pull/3924)
- [x] **AboutModalContainer**: Removes prop `ariaLabelledbyId`. The prop `aboutModalBoxHeaderId` should be used instead.
- [x] **AboutModalContainer**: Removes prop `ariaDescribedById`. The prop `aboutModalBoxContentId` should be used instead.
- [x] **ChipButton**: Removes prop `ariaLabel`. The prop `aria-label` should be used instead.
- [x] **DropdownToggle**: Removes prop `ariaHasPopup`. The prop `aria-haspopup` should be used instead.
- [x] **Toggle**: Removes prop `ariaHasPopup`. The prop `aria-haspopup` should be used instead.
- [x] **LoginForm**: Removes prop `rememberMeAriaLabel`. This prop is no longer used.
- [x] **Modal**: Removes prop `ariaDescribedById`. The prop `modalContentAriaDescribedById` should be used instead.
- [x] **ModalContent**: Removes prop `ariaDescribedById`. The prop `modalBoxAriaDescribedById` should be used instead.
- [x] **OptionsMenu**: Removes prop `ariaLabelMenu`. This prop is no longer used.
- [x] **OptionsMenuItemGroup**: Removes prop `ariaLabel`. The prop `aria-label` should be used instead.
- [x] **OptionsMenuToggleWithText**: Removes prop `ariaHasPopup`. The prop `aria-haspopup` should be used instead.
- [x] **ProgressBar**: Removes prop `ariaProps`. The prop `progressBarAriaProps` should be used instead.
- [x] **ProgressContainer**: Removes prop `ariaProps`. The prop `progressBarAriaProps` should be used instead.
- [x] **Select**: Removes prop `ariaLabelledBy`. The prop `aria-labelledby` should be used instead.
- [x] **Select**: Removes prop `ariaLabelTypeAhead`. The prop `typeAheadAriaLabel` should be used instead.
- [x] **Select**: Removes prop `ariaLabelClear`. The prop `clearSelectionsAriaLabel` should be used instead.
- [x] **Select**: Removes prop `ariaLabelToggle`. The prop `toggleAriaLabel` should be used instead.
- [x] **Select**: Removes prop `ariaLabelRemove`. The prop `removeSelectionAriaLabel` should be used instead.
- [x] **SelectToggle**: Removes prop `ariaLabelledBy`. The prop `aria-labelledby` should be used instead.
- [x] **SelectToggle**: Removes prop `ariaLabelToggle`. The prop `aria-label` should be used instead.
- [x] **Wizard**: Removes prop `ariaLabelNav`. The prop `navAriaLabel` should be used instead.
- [x] **Wizard**: Removes prop `ariaLabelCloseButton`. The prop `closeButtonAriaLabel` should be used instead.
- [x] **WizardHeader**: Removes prop `ariaLabelCloseButton`. The prop `closeButtonAriaLabel` should be used instead.
- [x] **WizardNav**: Removes prop `ariaLabel`. The prop `aria-label` should be used instead.

### title-size [(#3922)](https://github.com/patternfly/patternfly-react/pull/3922)
- [x] replace `size={ TitleSize | [xs|sm|md|lg|xl|2xl|3xl|4xl] }` with strings `md|lg|xl|2xl|3xl|4xl`

### title-require-heading-level
- [x] `headingLevel` is now a required prop. Update any existing usage of `Title` to supply a string value for headingLevel of h1-h6.

### modal-variant
- [x] Collapsed the `isLarge` and `isSmall` properties into a single `variant="small"` or `variant="large"` property. [(#3920)](https://github.com/patternfly/patternfly-react/pull/3920)
  - To maintain the current behavior, set the `variant` property to `large` or `small`, or use the newly added `ModalVariant` enum as `ModalVariant.large` or `ModalVariant.small`.

### page-mainContainerId [(#3904)](https://github.com/patternfly/patternfly-react/pull/3904)
- [ ] require `mainContainerId` prop for Page and set sensible default

### react-styles-remove-emotion [(#3886)](https://github.com/patternfly/patternfly-react/pull/3886)
- [ ] remove all non `css` imports from '@patternfly/react-styles' 

### background-image-src-enum [(#3886)](https://github.com/patternfly/patternfly-react/pull/3886) 
- [ ] replace `[BackgroundImageSrc.{sm,xs2x,sm,sm2x,lg}]` with strings `'sm' | 'xs2x' | 'sm' | 'sm2x' | 'lg'`
- [ ] remove always ignored `[BackgroundImageSrc.filter]` prop. suggest to use new `filter` prop of type `ReactNode`

### progress-remove-info-variant [(#3886)](https://github.com/patternfly/patternfly-react/pull/3886)
- [x] removed deprecated `ProgressVariant.info` that adds no styling. Do not pass this prop or pass `null` instead.
