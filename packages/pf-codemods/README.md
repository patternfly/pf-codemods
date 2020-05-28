# pf-codemods

**We have not officially released this package yet. It will officially be released with 4.x.x.**

Hey PatternFly-React devs! `pf-codemods` is an eslint wrapper to update @patternfly/react-core@3.x.x code to 4.x.x. I hope these rules and their autofixers will help you more quickly adopt our breaking changes. These rules are not designed to fix all build errors, but they can help to fix easy ones.

## Rules

These rules are based off the breaking change notes for React. Each rule links the breaking change patternfly-react PR in case you want to better understand the change. Also, each rule makes sure you're using a PatternFly component before running.

### accordion-remove-noBoxShadow [(#4022)](https://github.com/patternfly/patternfly-react/pull/4022)
Removed prop `noBoxShadow` per https://github.com/patternfly/patternfly/pull/2760. If a shadow is needed, the accordion can be placed in a card, or a shadow can be applied either using CSS or a box-shadow utility class.

#### Examples
In:
```jsx
<Accordion noBoxShadow />
```
Out:
```jsx
<Accordion  />
```

### alert-new-action [(#4190)](https://github.com/patternfly/patternfly-react/pull/4190)
We've replaced the `action` prop with `actionClose` or `actionLinks` for better styling.

#### Examples
In:
```jsx
<Alert action={<AlertActionCloseButton>Close</AlertActionCloseButton>
<Alert action={<SomethingThatIncludesLink>Close</SomethingThatIncludesLink>} />
```
Out:
```jsx
<Alert actionClose={<AlertActionCloseButton>Close</AlertActionCloseButton>
<Alert actionLinks={<AlertActionLink>Close</AlertActionLink>} />
```

### application-launcher-rename-dropdownItems [(#3929)](https://github.com/patternfly/patternfly-react/pull/3929)
We've removed the deprecated `dropdownItems` prop in favor of `items`.

#### Examples
In:
```jsx
<ApplicationLauncher dropdownItems={[1,2,3]} />
```
Out:
```jsx
<ApplicationLauncher items={[1,2,3]} />
```

### aria-props [(#3924)](https://github.com/patternfly/patternfly-react/pull/3924)
We've renamed and removed many of our aria labels.
- AboutModalContainer: {
  'ariaLabelledbyId': 'aboutModalBoxHeaderId',
  'ariaDescribedById': 'aboutModalBoxContentId'
},
- ChipButton: {
  'ariaLabel': 'aria-label'
},
- DropdownToggle: {
  'ariaHasPopup': 'aria-haspopup'
},
- LoginForm: {
  'rememberMeAriaLabel': ''
},
- Modal: {
  'ariaDescribedById': 'modalContentAriaDescribedById'
},
- ModalContent: {
  'ariaDescribedById': 'modalBoxAriaDescribedById'
},
- OptionsMenu: {
  'ariaLabelMenu': ''
},
- OptionsMenuItemGroup: {
  'ariaLabel': 'aria-label'
},
- OptionsMenuToggleWithText: {
  'ariaHasPopup': 'aria-haspopup'
},
- ProgressBar: {
  'ariaProps': 'progressBarAriaProps'
},
- ProgressContainer: {
  'ariaProps': 'progressBarAriaProps'
},
- Select: {
  'ariaLabelledBy': 'aria-labelledby',
  'ariaLabelTypeAhead': 'typeAheadAriaLabel',
  'ariaLabelClear': 'clearSelectionsAriaLabel',
  'ariaLabelToggle': 'toggleAriaLabel',
  'ariaLabelRemove': 'removeSelectionAriaLabel'
},
- SelectToggle: {
  'ariaLabelledBy': 'aria-labelledby',
  'ariaLabelToggle': 'aria-label'
},
- Wizard: {
  'ariaLabelNav': 'navAriaLabel',
  'ariaLabelCloseButton': 'closeButtonAriaLabel'
},
- WizardHeader: {
  'ariaLabelCloseButton': 'closeButtonAriaLabel'
},
- WizardNav: {
  'ariaLabel': 'aria-label'
}


#### Examples
In:
```jsx
<AboutModalContainer ariaLabelledbyId="123" />
<WizardNav ariaLabel="123" />
<LoginForm rememberMeAriaLabel="123" />
```
Out:
```jsx
<AboutModalContainer aboutModalBoxHeaderId="123" />
<WizardNav aria-label="123" />
<LoginForm  />
```

### background-image-src-enum [(#3886)](https://github.com/patternfly/patternfly-react/pull/3886) 
We've replaced `[BackgroundImageSrc.{sm,xs2x,sm,sm2x,lg}]` with strings `'sm' | 'xs2x' | 'sm' | 'sm2x' | 'lg'` for better readability. The always ignored `[BackgroundImageSrc.filter]` attribute has been removed. To add a filter, use the new prop `filter?: ReactNode`.

#### Examples
In:
```jsx
const images = {
  [BackgroundImageSrc.lg]: '/assets/images/pfbg_1200.jpg',
  [BackgroundImageSrc.sm]: '/assets/images/pfbg_768.jpg',
  [BackgroundImageSrc.sm2x]: '/assets/images/pfbg_768@2x.jpg',
  [BackgroundImageSrc.xs]: '/assets/images/pfbg_576.jpg',
  [BackgroundImageSrc.xs2x]: '/assets/images/pfbg_576@2x.jpg',
  [BackgroundImageSrc.filter]: '/assets/images/background-filter.svg' ,
};
<BackgroundImage src={images} />
```
Out:
```jsx
const images = {
  lg: '/assets/images/pfbg_1200.jpg',
  sm: '/assets/images/pfbg_768.jpg',
  sm2x: '/assets/images/pfbg_768@2x.jpg',
  xs: '/assets/images/pfbg_576.jpg',
  xs2x: '/assets/images/pfbg_576@2x.jpg',
   
};
<BackgroundImage src={images} />
```

### card-rename-components [(#4170)](https://github.com/patternfly/patternfly-react/pull/4170)
The order of this might be tricky since CardHead should only become CardHeader after existing CardHeaders have become CardTitle. Maybe an in-between temporary name can be used to swap these since we can't control the order in which rules are run.
- Rename CardHeader to CardTitle
- Rename CardHeadMain to CardHeaderMain
- Rename CardHead to CardHeader

#### Examples
We add an extra `data-codemods="true"` attribute since `CardHeader` is a valid element before and after the rename. This can safely be removed but running the rule again will transform `CardHeader` -> `CardTitle` which is not intended.
In:
```jsx
<Card>
  <CardHead>
    <CardHeadMain>Header</CardHeadMain>
  </CardHead>
  <CardHeader>
    Title
  </CardHeader>
</Card>
```
Out:
```jsx
<Card>
  <CardHeader data-codemods="true">
    <CardHeaderMain>Header</CardHeaderMain>
  </CardHeader>
  <CardTitle>
    Title
  </CardTitle>
</Card>
```

### chipgroup-remove-chipbutton [(#4246)](https://github.com/patternfly/patternfly-react/pull/4246)
This component has been removed. Use a normal Button instead.

#### Examples
In:
```jsx
<ChipButton>button</ChipButton>
```
Out:
```jsx
<Button>button</Button>
```

### chipgroup-remove-chipgrouptoolbaritem [(#4246)](https://github.com/patternfly/patternfly-react/pull/4246)
This component has been removed. To Create a ChipGroup with a category, add the `categoryName` prop to `<ChipGroup>`. All props that were on the `<ChipGroupToolbarItem>` have been added to `<ChipGroup>`. So to convert to new API, move move all you props up to `<ChipGroup>` and remove `<ChipGroupToolbarItem>`.

#### Examples
In:
```jsx
<ChipGroup>
  <ChipGroupToolbarItem prop1="ab" prop2="bc">
    Item
    <Chip>
      Another item
    </Chip>
  </ChipGroupToolbarItem>
</ChipGroup>
```
Out:
```jsx
<ChipGroup prop1="ab" prop2="bc">
  
    Item
    <Chip>
      Another item
    </Chip>
  
</ChipGroup>
```

### chipgroup-remove-props [(#4246)](https://github.com/patternfly/patternfly-react/pull/4246)
- **ChipGroup**: `withToolbar` prop has been removed. Add the `categoryName` prop instead to add a chip group with a category.
- **ChipGroup**: `headingLevel` prop has been removed. The category name has internally been switched to a `<span>`

#### Examples
In:
```jsx
<ChipGroup withToolbar>button</ChipGroup>
<ChipGroup headingLevel="123">button</ChipGroup>
```
Out:
```jsx
<ChipGroup categoryName="pf-codemod-category">button</ChipGroup>
<ChipGroup >button</ChipGroup>
```

### dropdown-rename-icon [(#4147)](https://github.com/patternfly/patternfly-react/pull/4147)
- Removed dropdownItemIcon in favor of `<DropdownItem icon={<Icon />} />`
- Removed variant prop from DropdownItem. If you were using variant="icon" before, use the new icon prop instead. (might need to split this into new rule)

#### Examples
In:
```jsx
<DropdownItem icon={<CogIcon />} key="action" component="button" />
```
Out:
```jsx
<DropdownItem key="action" component="button" variant="icon">
  <DropdownItemIcon>
    <CogIcon />
  </DropdownItemIcon>
</DropdownItem>
```

### dropdown-toggle-rename-iconComponent [(#4038)](https://github.com/patternfly/patternfly-react/pull/4038)
We've renamed the `iconComponent` prop in `DropdownToggle` to `toggleIndicator`.

#### Examples
In:
```jsx
<DropdownToggle iconComponent={CaretDownIcon} />
```
Out:
```jsx
<DropdownToggle toggleIndicator={CaretDownIcon} />
```

### empty-state-icon-removed-props [(#4065)](https://github.com/patternfly/patternfly-react/pull/4065)
We've removed the deprecated `size` and `title` props from EmptyStateIcon.

#### Examples
In:
```jsx
<EmptyStateIcon size="sm" title="title" />
```
Out:
```jsx
<EmptyStateIcon   />
```

### form-fix-isValid [(#3975)](https://github.com/patternfly/patternfly-react/pull/3975)
We've removed the `isValid?: boolean` prop from 'TextInput', 'TextArea', 'FormSelect', 'FormGroup' in favor of a new `validated?: string` prop.  To set a the input to invalid, set `validated` prop to `'default' | 'error' | 'success'`.

#### Examples
In:
```jsx
<FormGroup isValid={true} />
<FormGroup isValid={false} />
<FormGroup isValid={condition} />
```
Out:
```jsx
<FormGroup validated="default" />
<FormGroup validated="error" />
<FormGroup validated={(cond) ? 'default' : 'error'} />
```

### global-background-color [(#4022)](https://github.com/patternfly/patternfly-react/pull/4022)
The tokens `global_BackgroundColor_150` and `global_BackgroundColor_300` have been removed (see associated [Core PR](https://github.com/patternfly/patternfly/pull/2818)). Consider using `global_BackgroundColor_200` with its new value `#f0f0f0` instead.

#### Examples
In:
```jsx
import { global_background_color_300 } from '@patternfly/react-tokens'
```
Out:
```jsx
import { global_background_color_200 as global_background_color_300 } from '@patternfly/react-tokens'
```

In:
```jsx
import { global_background_color_150 } from '@patternfly/react-tokens'
```
Out:
```jsx
import { global_background_color_200 as global_background_color_150 } from '@patternfly/react-tokens'
```

### label-remove-isCompact [(#4116)](https://github.com/patternfly/patternfly-react/pull/4116)
We've redone label styling and labels are now compact by default.

#### Examples
In:
```jsx
<Label isCompact>Label</Label>
```
Out:
```jsx
<Label >Label</Label>
```

### modal-remove-footer-alignment [(#4017)](https://github.com/patternfly/patternfly-react/pull/4017)
- Modal and ModalBoxFooter: Removes prop `isFooterLeftAligned`. This prop is no longer used.

#### Examples
In:
```jsx
<Modal isFooterLeftAligned />
```
Out:
```jsx
<Modal  />
```

### modal-variant [(#3920)](https://github.com/patternfly/patternfly-react/pull/3920)
We've collapsed the `isLarge` and `isSmall` properties into a single `variant="small"` or `variant="large"` property. To maintain the current behavior, set the `variant` property to `"large"` or `"small"`.

#### Examples
**Note:** This rule will produce broken fixes if you set `isLarge={condition}` and/or `isSmall={condition}`.
In:
```jsx
<Modal isLarge />
```
Out:
```jsx
<Modal variant="large" />
```

### nav-list-variant [(#4225)](https://github.com/patternfly/patternfly-react/pull/4225)
- **Nav:** `variant` prop has been removed from `NavList`. Pass variant={`horizontal` | `tertiary`} to `Nav` instead.

#### Examples
In:
```jsx
<Accordion noBoxShadow />
```
Out:
```jsx
<Accordion  />
```

### no-experimental-imports [(#4029)](https://github.com/patternfly/patternfly-react/pull/4029) [(#4176)](https://github.com/patternfly/patternfly-react/pull/4176)
We've done away with `@patternfly/react-core/dist/esm/experimental`. Import from just `@patternfly/react-core` instead.

#### Examples
In:
```jsx
import { Divider } from '@patternfly/react-core/dist/esm/experimental';
```
Out:
```jsx
import { Divider } from '@patternfly/react-core';
```

### pagination-removed-variant [(#4202)](https://github.com/patternfly/patternfly-react/pull/4202)
Removed obsolete 'left' and 'right' variants. These can be replaced with 'top' (default) or 'bottom' if needed.

#### Examples
In:
```jsx
<Pagination variant="left" />
<Pagination variant={PaginationVariant.right} />
```
Out:
```jsx
<Pagination  />
<Pagination  />
```

### progress-remove-info-variant [(#3886)](https://github.com/patternfly/patternfly-react/pull/3886)
Removed deprecated `ProgressVariant.info` that adds no styling. Do not pass this prop or pass `null` instead.

#### Examples
In:
```jsx
<Progress variant={ProgressVariant.info} />
```
Out:
```jsx
<Progress  />
```
In:
```jsx
<Progress variant="info" />
```
Out:
```jsx
<Progress  />
```

### remove-gutter-size [(#4014)](https://github.com/patternfly/patternfly-react/pull/4014)
Gallery, Grid, Level, Split, and Stack: Removed prop `gutter` (it has effectively been a boolean value for over a year). The prop `hasGutter` should be used instead.

#### Examples
In:
```jsx
<Gallery gutter="sm" />
```
Out:
```jsx
<Gallery hasGutter  />
```

### remove-isPseudo-props [(#4116)](https://github.com/patternfly/patternfly-react/pull/4116)
- **Button:** Removed isHover and isFocus props
- **Chip:** Removed isReadOnly prop
- **Dropdown:** Removed isHover and isFocus props from Toggle, KebabToggle, and DropdownToggle
- **Select:**
  - Removed isFocus prop from SelectOption
  - Removed isFocus and isHovered props from SelectToggle
- **Expandable:**
  - Removed isFocus and isHovered props from ExpandableSection
- **Label:** Removed isCompact prop from Label
- **Options menu:** Removed isFocused and isHovered prop from OptionsMenuToggle and OptionsMenuToggleWithText
- **Context selector:** Removed isHover prop from ContextSelectorItem. Removed isHovered and isFocused props from ContextSelectorToggle

#### Examples
In:
```jsx
<Button isHover isFocus />
<Chip isReadOnly />
```
Out:
```jsx
<Button   />
<Chip  />
```

### remove-prop-types [(#4076)](https://github.com/patternfly/patternfly-react/pull/4076)
- Removed `AnyPatternFlyImport.PropTypes` since we no longer define `propTypes` for our components. Consider using our Typescript types under each packages' `dist/js` folder instead.

#### Examples
In:
```jsx
```
Out:
```jsx
```

### remove-unused-imports
This rule cleans up the following removed imports:
- 'NavVariants', Use the variant prop on the Nav component with one of these values: 'default' | 'horizontal' | 'tertiary'
- 'CardHead', See card-rename-components rule for more info
- 'CardHeadMain', See card-rename-components rule for more info
- 'BackgroundImgSrc', See background-image-src-enum rule for more info
- 'ChipButton', See chipgroup-remove-chipbutton rule for more info
- 'ChipGroupToolbarItem' See chipgroup-remove-chipgrouptoolbaritem rule for more info

### rename-noPadding [(#4133)](https://github.com/patternfly/patternfly-react/pull/4133)
We've renamed `noPadding` to `hasNoPadding` for DataListContent, DrawerHead, DrawerPanelBody, and PageSection components.

If you wish to add padding at different breakpoints, we added props `hasPaddingOn` and `hasNoPaddingOn` to PageSection.

#### Examples
In:
```jsx
<DataListContent noPadding />
<DrawerHead noPadding />
<DrawerPanelBody noPadding />
<PageSection noPadding />
```
Out:
```jsx
<DataListContent hasNoPadding />
<DrawerHead hasNoPadding />
<DrawerPanelBody hasNoPadding />
<PageSection hasNoPadding />
```

### react-icons-remove-icon [(#3978)](https://github.com/patternfly/patternfly-react/pull/3978)
- Removed `OutlinedFontAwesomeLogoFullIcon`. Import it from @fortawesome instead.

#### Examples
In:
```jsx
<Accordion noBoxShadow />
```
Out:
```jsx
<Accordion  />
```

### react-styles-remove-emotion [(#3886)](https://github.com/patternfly/patternfly-react/pull/3886)
- Removed all non `css` imports from '@patternfly/react-styles'

#### Examples
In:
```jsx
```
Out:
```jsx
```

### select-rename-checkbox [(#3945)](https://github.com/patternfly/patternfly-react/pull/3945)
We've removed the deprecated `CheckboxSelect` and `CheckboxSelectOption` components in favor of `Select variant="checkbox"` and `SelectOption`.

#### Examples
In:
```jsx
<CheckboxSelect>
  <CheckboxSelectOption>option1</CheckboxSelectOption>
  <CheckboxSelectOption>option2</CheckboxSelectOption>
</CheckboxSelect>
```
Out:
```jsx
<Select variant="checkbox">
  <SelectOption>option1</SelectOption>
  <SelectOption>option2</SelectOption>
</Select>
```

### select-rename-isExpanded [(#3945)](https://github.com/patternfly/patternfly-react/pull/3945)
We've renamed the `isExpanded` prop to `isOpen`.

#### Examples
In:
```jsx
<Select isExpanded />
```
Out:
```jsx
<Select isOpen />
```

### skip-to-content-remove-component [(#4116)](https://github.com/patternfly/patternfly-react/pull/4116)
We've removed the `component` prop in favor of always using an anchor tag.

#### Examples
In:
```jsx
<SkipToContent component="h1" />
```
Out:
```jsx
<SkipToContent  />
```

### tab-rename-variant [(#4146)](https://github.com/patternfly/patternfly-react/pull/4146)
We've renamed the `variant` prop to `component` and the `TabVariant` enum to `TabComponent`

#### Examples
In:
```jsx
<Tabs variant={TabsVariant.nav} />
```
Out:
```jsx
<Tabs component={TabsComponent.nav} />
```

### tab-title-text [(#4146)](https://github.com/patternfly/patternfly-react/pull/4146)
The title should be wrapped with `<TabTitleText>` for proper styling.  If you would like to place an Icon in the Tab, it should be wrapped with `<TabTitleIcon>` for proper styling.
- `title="string"` -> `title={<TabTitleText>Users</TabTitleText>}`
- `title={<SomeReactIcon/>}` -> `title={<TabTitleIcon><SomeReactIcon/></TabTitleIcon>}`

#### Examples
In:
```jsx
<Tab title="Title">Content</Tab>
```
Out:
```jsx
<Tab title={<TabTitleText>Title</TabTitleText>}>Content</Tab>
```

In:
```jsx
<Tab title={<SomethingThatIncludesIcon />}>Content</Tab>
```
Out:
```jsx
<Tab title={<TabTitleIcon><SomethingThatIncludesIcon /></TabTitleIcon>}>Content</Tab>
```

In:
```jsx
<Tab title={<div>a title</div>}>Content</Tab>
```
Out:
```jsx
<Tab title={<TabTitleText><div>a title</div></TabTitleText>}>Content</Tab>
```

### table-removed-transforms [(#4170)](https://github.com/patternfly/patternfly-react/pull/4170)
- Removed `cellHeightAuto` transformer. It is no longer needed.
- `cellWidth('max')` has been replaced with `cellWidth(100)`

#### Examples
In:
```jsx
<Table rows={['Row 1']} cells={[{
  title: 'Last Commit',
  transforms: [cellWidth('max'), cellHeightAuto()]
}]}>
  <TableHeader />
  <TableBody />
</Table>
```
Out:
```jsx
<Table rows={['Row 1']} cells={[{
  title: 'Last Commit',
  transforms: [cellWidth(100)]
}]}>
  <TableHeader />
  <TableBody />
</Table>
```

### title-require-heading-level [(#3922)](https://github.com/patternfly/patternfly-react/pull/3922)
- `headingLevel` is now a required prop. Update any existing usage of `Title` to supply a string value for headingLevel of h1-h6.

#### Examples
In:
```jsx
<Title size="lg">MyTitle</Title>
```
Out:
```jsx
<Title headingLevel="h2" size="lg">MyTitle</Title>
```

### title-size [(#3922)](https://github.com/patternfly/patternfly-react/pull/3922)
Replace `size={ TitleSize | [xs|sm|md|lg|xl|2xl|3xl|4xl] }` with strings `md|lg|xl|2xl|3xl|4xl`. Sizes `xs|sm` are no longer supported by Core.

#### Examples
In:
```jsx
<Title size={TitleSize.xl}>MyTitle</Title>
```
Out:
```jsx
<Title size="xl">MyTitle</Title>
```

In:
```jsx
<Title size="sm">MyTitle</Title>
```
Out:
```jsx
<Title size="md">MyTitle</Title>
```

### upgrade-react [(#4144)](https://github.com/patternfly/patternfly-react/pull/4144)
- Our packages now can possibly use hooks, which requires `react@^16.8.0` instead of `react@^16.4.0`. We recommend upgrading your version of React if it is below 16.8.0. (I think our parser works on package.json files to do this)

#### Examples
In:
```jsx
```
Out:
```jsx
```

### use-page-header-tools [(#4223)](https://github.com/patternfly/patternfly-react/pull/4223)
- **PageHeader**: `avatar` prop was removed. Add the avatar to the `PageHeaderTools` component instead (which is passed into `PageHeader` via the `headerTools` prop.
- **PageHeader**: `toolbar` prop was removed. Use the `headerTools` prop instead. Also, if you previously used the `Toolbar`, `ToolbarGroup`, or `ToolbarItem` components for the header, replace them with the `PageHeaderTools`, `PageHeaderToolsGroup`, and `PageHeaderToolsItem` components.

#### Examples
In:
```jsx
```
Out:
```jsx
```

### wizard-remove-props [(#4142)](https://github.com/patternfly/patternfly-react/pull/4142)
- **WizardNav**: Removed prop `isCompactNav`. This prop is no longer used.
- **Wizard:** Removed inPage prop. By default the Wizard will be displayed in page, filling its parent container. If the consumer passes a managed `isOpen` flag, then the Wizard will be displayed in a modal.
- **Wizard:** Removed isFullHeight and isFullWidth props, [(#4116)](https://github.com/patternfly/patternfly-react/pull/4116)

#### Examples
In:
```jsx
<Wizard isCompactNav={false} inPage={true} isFullHeight isFullWidth />
```
Out:
```jsx
<Wizard     />
```

### wizard-rename-hasBodyPadding [(#4136)](https://github.com/patternfly/patternfly-react/pull/4136)
Rename `hasBodyPadding` to `hasNoBodyPadding` for Wizard and WizardBody.

#### Examples
In:
```jsx
<Wizard hasBodyPadding />
```
Out:
```jsx
<Wizard  />
```
(The default is `hasNoBodyPadding = false`)

In:
```jsx
<Wizard hasBodyPadding={false} />
```
Out:
```jsx
<Wizard hasNoBodyPadding />
```

### wizard-rename-text [(#4063)](https://github.com/patternfly/patternfly-react/pull/4063)
`WizardNavItem`: Renamed prop `text` to `content`.  The type of the prop has been changed to React.ReactNode to allow for flexibility.

#### Examples
In:
```jsx
<WizardNavItem text="sm" />
```
Out:
```jsx
<WizardNavItem content="sm" />
```
