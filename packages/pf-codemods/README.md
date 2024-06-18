# pf-codemods

Hey PatternFly-React devs! `pf-codemods` is an eslint wrapper to update @patternfly/react-core@5.x.x code to 6.x.x.

We hope these rules and their autofixers will help you more quickly adopt our breaking changes. These rules are not designed to fix all build errors, but they can help to fix easy ones as well as point out the more complicated ones and offer suggestions on how you might go about fixing them.

If you have any hardcoded Patternfly class names in your project (i.e. pf-c-button) you also might want to see if our [class-name-updater package](./packages/class-name-updater/README.md) would be helpful for you.

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

Some rules will add either a comment (`/* data-codemods */`) or data attribute (`data-codemods="true"`) in order to prevent certain other rules from applying an unnecessary fix.

### accordionContent-remove-isHidden-prop [(#9876)](https://github.com/patternfly/patternfly-react/pull/9876)

The `isHidden` prop has been removed from AccordionContent, as its visibility will now be set automatically based on the `isExpanded` prop on AccordionItem.

#### Examples

In:

```jsx
import { AccordionContent } from "@patternfly/react-core";

export const AccordionContentRemoveIsHiddenPropInput = () => (
  <AccordionContent isHidden />
);
```

Out:

```jsx
import { AccordionContent } from "@patternfly/react-core";

export const AccordionContentRemoveIsHiddenPropInput = () => (
  <AccordionContent  />
);
```
### accordionItem-warn-update-markup [(#9876)](https://github.com/patternfly/patternfly-react/pull/9876)

The markup for AccordionItem has been updated, and it now renders a `div` element as a wrapper.
### accordionToggle-move-isExpanded-prop [(#9876)](https://github.com/patternfly/patternfly-react/pull/9876)

The `isExpanded` prop for AccordionToggle has been moved to AccordionItem.

#### Examples

In:

```jsx
import { AccordionItem, AccordionToggle } from "@patternfly/react-core";

export const AccordionToggleMoveIsExpandedPropInput = () => (
  <AccordionItem>
    <AccordionToggle isExpanded />
  </AccordionItem>
);
```

Out:

```jsx
import { AccordionItem, AccordionToggle } from "@patternfly/react-core";

export const AccordionToggleMoveIsExpandedPropInput = () => (
  <AccordionItem isExpanded>
    <AccordionToggle  />
  </AccordionItem>
);
```
### avatar-replace-border-for-isBordered

[(#9881)](https://github.com/patternfly/patternfly-react/pull/9881)
[(#9954)](https://github.com/patternfly/patternfly-react/pull/9954)

`border` prop has been removed from Avatar since theming is not longer handled React-side. We recommend using the `isBordered` prop instead to add a border to Avatar.

#### Examples

In:

```jsx
import { Avatar } from '@patternfly/react-core';

export const AvatarReplaceBorderForIsBorderedInput = () => (
  <Avatar border={'dark'} />
);
```

Out:

```jsx
import { Avatar } from '@patternfly/react-core';

export const AvatarReplaceBorderForIsBorderedInput = () => (
  <Avatar isBordered />
);
```
### button-rename-isActive [(#9934)](https://github.com/patternfly/patternfly-react/pull/9934)

isActive prop for Button has been renamed to isClicked

#### Examples

In:

```jsx
import { Button } from "@patternfly/react-core";

export const ButtonRenameIsActiveInput = () => <Button isActive />;
```

Out:

```jsx
import { Button } from "@patternfly/react-core";

export const ButtonRenameIsActiveInput = () => <Button isClicked />;
```

### card-remove-various-props [(#10056)](https://github.com/patternfly/patternfly-react/pull/10056)

The following props have been removed from Card:
- isSelectableRaised
- isDisabledRaised
- hasSelectableInput
- selectableInputAriaLabel
- onSelectableInputChange
- isFlat
- isRounded

#### Examples

In:

```jsx
import { Card } from "@patternfly/react-core";

export const CardRemoveVariousPropsInput = () => (
  <Card
    isSelectableRaised
    isDisabledRaised
    hasSelectableInput
    selectableInputAriaLabel="aria label"
    onSelectableInputChange={() => {}}
  />
);
```

Out:

```jsx
import { Card } from "@patternfly/react-core";

export const CardRemoveVariousPropsInput = () => (
  <Card
    
    
    
    
    
  />
);
```

### checkbox-radio-replace-isLabelBeforeButton [(#10016)](https://github.com/patternfly/patternfly-react/pull/10016)

The `isLabelBeforeButton` prop in Checkbox and Radio has been replaced with `labelPosition="start"`

#### Examples

In:

```jsx
import { Checkbox, Radio } from "@patternfly/react-core";

export const CheckboxReplaceIsLabelBeforeButtonInput = () => (
  <Checkbox isLabelBeforeButton />
);
export const RadioReplaceIsLabelBeforeButtonInput = () => (
  <Radio isLabelBeforeButton />
);
```

Out:

```jsx
import { Checkbox, Radio } from "@patternfly/react-core";

export const CheckboxReplaceIsLabelBeforeButtonInput = () => (
  <Checkbox labelPosition="start" />
);
export const RadioReplaceIsLabelBeforeButtonInput = () => (
  <Radio labelPosition="start" />
);
```
### chip-deprecated [(#)](https://github.com/patternfly/patternfly-react/pull/10049)

Chip has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using Label instead.

#### Examples

In:

```jsx
import { Chip } from '@patternfly/react-core';
```

Out:

```jsx
import { Chip } from '@patternfly/react-core/deprecated';
```
### drawer-remove-props [(#10036)](https://github.com/patternfly/patternfly-react/pull/10036)

The `hasNoPadding` prop has been removed from DrawerHead.

#### Examples

In:

```jsx
import { DrawerHead } from "@patternfly/react-core";

export const DrawerRemovePropsInput = () => <DrawerHead hasNoPadding />;
```

Out:

```jsx
import { DrawerHead } from "@patternfly/react-core";

export const DrawerRemovePropsInput = () => <DrawerHead  />;
```
### drawerHead-warn-updated-markup [(#10036)](https://github.com/patternfly/patternfly-react/pull/10036)

DrawerPanelBody is no longer rendered internally to DrawerHead. We recommend using these components independent of one another and to not pass DrawerPanelBody to DrawerHead.
### drawer-replace-colorVariant-light200 [(#10017)](https://github.com/patternfly/patternfly-react/pull/10017) [(#10036)](https://github.com/patternfly/patternfly-react/pull/10036)

The "light-200" value for the `colorVariant` prop has been replaced with the "secondary" value for DrawerContent, DrawerPanelContent, and DrawerSection components.

Additionally, the `light200` property for the DrawerColorVariant enum has been replaced with the `secondary` property.

#### Examples

In:

```jsx
import { DrawerContent, DrawerColorVariant } from "@patternfly/react-core";

export const DrawerReplaceColorVariantLight200Input = () => (
  <>
    <DrawerContent colorVariant='light-200' />
    <DrawerContent colorVariant={DrawerColorVariant.light200} />
  </>
);
```

Out:

```jsx
import { DrawerContent, DrawerColorVariant } from "@patternfly/react-core";

export const DrawerReplaceColorVariantLight200Input = () => (
  <>
    <DrawerContent colorVariant="secondary" />
    <DrawerContent colorVariant={DrawerColorVariant.secondary} />
  </>
);
```
### emptyStateHeader-move-into-emptyState [(#9947)](https://github.com/patternfly/patternfly-react/pull/9947)

EmptyStateHeader and EmptyStateIcon are now rendered internally within EmptyState and should only be customized using props. Content passed to the `icon` prop on EmptyState will also be wrapped by EmptyStateIcon automatically.

Additionally, the `titleText` prop is now required on EmptyState.

#### Examples

In:

```jsx
import {
  EmptyState,
  EmptyStateHeader,
  EmptyStateIcon,
  CubesIcon
} from "@patternfly/react-core";

export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState>
    <EmptyStateHeader
      titleText="Empty state"
      headingLevel="h4"
      icon={<EmptyStateIcon icon={CubesIcon} />}
    />
  </EmptyState>
);
```

Out:

```jsx
import {
  EmptyState,
  EmptyStateHeader,
  EmptyStateIcon,
  CubesIcon
} from "@patternfly/react-core";

export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState headingLevel="h4" titleText="Empty state" icon={CubesIcon}>
    </EmptyState>
);
```

### formGroup-rename-labelIcon [(#10016)](https://github.com/patternfly/patternfly-react/pull/10016)

The `labelIcon` prop for FormGroup has been renamed to `labelHelp`. We recommend using FormGroupLabelHelp element for the labelHelp prop. The markup has also changed, we now wrap the labelHelp element in `<span className="pf-v6-c-form__group-label-help">`, so there is no need to add `className="pf-v6-c-form__group-label-help"` to the labelHelp element.

#### Examples

In:

```jsx
import { FormGroup } from "@patternfly/react-core";

export const FormGroupRenameLabelIconInput = () => (
  <FormGroup labelIcon={<>Help icon</>} />
);
```

Out:

```jsx
import { FormGroup } from "@patternfly/react-core";

export const FormGroupRenameLabelIconInput = () => (
  <FormGroup labelHelp={<>Help icon</>} />
);
```
### helperTextItem-remove-props [(#10029)](https://github.com/patternfly/patternfly-react/pull/10029)

The `hasIcon` and `isDynamic` props have been removed from HelperTextItem. An icon will now render automatically when the `variant` prop has a value other than "default" or when the `icon` prop is passed in.

#### Examples

In:

```jsx
import { HelperTextItem } from "@patternfly/react-core";

export const HelperTextItemRemovePropsInput = () => (
  <HelperTextItem hasIcon isDynamic />
);
```

Out:

```jsx
import { HelperTextItem } from "@patternfly/react-core";

export const HelperTextItemRemovePropsInput = () => (
  <HelperTextItem   />
);
```
### helperTextItem-warn-screenReaderText-update [(#10029)](https://github.com/patternfly/patternfly-react/pull/10029)

The `screenReaderText` prop on HelperTextItem has been updated, and will now render only when the `variant` prop has a value other than "default". Previously the prop was rendered only when the `isDynamic` prop was true.
### jumpLinksItem-href-required [(#10027)](https://github.com/patternfly/patternfly-react/pull/10027)

The `href` prop on JumpLinksItem is now required.
### jumpLinksItem-warn-markup-change [(#10027)](https://github.com/patternfly/patternfly-react/pull/10027)

The markup for JumpLinksItem has changed, as it now uses our Button component internally. Additionally, the `onClick` prop type has been updated to just `React.MouseEvent` (previously `React.MouseEvent<HTMLAnchorElement>`).
### label-remove-isOverflowLabel [(#10037)](https://github.com/patternfly/patternfly-react/pull/10037)

The `isOverflowLabel` prop for Label has been replaced with `variant="overflow"`. Running the fix for this rule will replace an existing `variant` prop (which had no effect if `isOverflowLabel` was used).

#### Examples

In:

```jsx
import { Label } from "@patternfly/react-core";

export const LabelRemoveIsOverflowLabelInput = () => <Label isOverflowLabel />;
export const LabelRemoveIsOverflowLabelInput2 = () => (
  <Label isOverflowLabel variant="outline" />
);
```

Out:

```jsx
import { Label } from "@patternfly/react-core";

export const LabelRemoveIsOverflowLabelInput = () => (
  <Label variant="overflow" />
);
export const LabelRemoveIsOverflowLabelInput2 = () => (
  <Label variant="overflow" />
);
```
### masthead-remove-background-color [(#9774)](https://github.com/patternfly/patternfly-react/pull/9774)

We've removed the `backgroundColor` prop from Masthead as theming is no longer handled React-side.

#### Examples

In:

```jsx
import { Masthead } from "@patternfly/react-core";

export const MastheadRemoveBackgroundColorInput = () => <Masthead backgroundColor />
```

Out:

```jsx
import { Masthead } from "@patternfly/react-core";

export const MastheadRemoveBackgroundColorInput = () => <Masthead  />
```

### menuItemAction-warn-update-markup [(#10089)](https://github.com/patternfly/patternfly-react/pull/10089)

The markup for MenuItemAction has been updated. It now uses our Button component internally, has a wrapper around the action button, and no longer renders an icon wrapper inside the action button.
### menuToggle-warn-iconOnly-toggle [(#10097)](https://github.com/patternfly/patternfly-react/pull/10097)

We now recommend passing any icon to the `icon` prop instead of passing it as children, such as for plain, icon only toggles. Passing an icon as children will result in incorrect styling.

#### Examples

This rule will not provide a fix, but you can refer to the following code blocks to see what updates would need to be made manually.

Previous recommendation:

```jsx
import { MenuToggle } from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const MenuToggleWarnIconOnlyToggleInput = () => (
  <MenuToggle aria-label='A descriptive aria-label' variant='plain'>
    <EllipsisVIcon />
  </MenuToggle>
);
```

New recommendation:

```jsx
import { MenuToggle } from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const MenuToggleWarnIconOnlyToggleInput = () => (
  <MenuToggle
    icon={EllipsisVIcon}
    aria-label='A descriptive aria-label'
    variant='plain'
  />
);
```
### nav-remove-tertiary-variant [(#9948)](https://github.com/patternfly/patternfly-react/pull/9948)

The "tertiary" Nav variant is no longer supported. Use `variant="horizontal-subnav"` instead.

#### Examples

In:

```jsx
import { Nav } from "@patternfly/react-core";

export const NavRemoveTertiaryVariantInput = () => <Nav variant="tertiary" />;
export const NavRemoveTertiaryVariantInput2 = () => (
  <Nav variant={"tertiary"} />
);
```

Out:

```jsx
import { Nav } from "@patternfly/react-core";

export const NavRemoveTertiaryVariantInput = () => (
  <Nav variant="horizontal-subnav" />
);
export const NavRemoveTertiaryVariantInput2 = () => (
  <Nav variant={"horizontal-subnav"} />
);
```

### nav-remove-theme-prop [(#9948)](https://github.com/patternfly/patternfly-react/pull/9948)

The `theme` prop is no longer supported in Nav. Use light/dark mode theming instead.

#### Examples

In:

```jsx
import { Nav } from "@patternfly/react-core";

export const NavRemoveThemePropInput = () => <Nav theme="dark" />;
export const NavRemoveThemePropInput2 = () => <Nav theme="light" />;
```

Out:

```jsx
import { Nav } from "@patternfly/react-core";

export const NavRemoveThemePropInput = () => <Nav />;
export const NavRemoveThemePropInput2 = () => <Nav />;
```
### notificationBadge-warn-markup-change [(#10020)](https://github.com/patternfly/patternfly-react/pull/10020)

The markup for NotificationBadge has changed, as it now uses stateful button internally.
### pageHeaderToolsItem-remove-isSelected-prop [(#9774)](https://github.com/patternfly/patternfly-react/pull/9774)

The `isSelected` prop has been removed from PageHeaderToolsItem.

#### Examples

In:

```jsx
import { PageHeaderToolsItem } from "@patternfly/react-core/deprecated";

export const PageHeaderToolsItemRemoveIsSelectedPropInput = () => (
  <PageHeaderToolsItem isSelected />
);
```

Out:

```jsx
import { PageHeaderToolsItem } from "@patternfly/react-core/deprecated";

export const PageHeaderToolsItemRemoveIsSelectedPropInput = () => (
  <PageHeaderToolsItem  />
);
```
### page-rename-isTertiaryNavGrouped [(#9948)](https://github.com/patternfly/patternfly-react/pull/9948)

We've renamed the \`isTertiaryNavGrouped\` prop to \`isHorizontalSubnavGrouped\`.

#### Examples

In:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameIsTertiaryNavGroupedInput = () => (
  <Page isTertiaryNavGrouped />
);
```

Out:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameIsTertiaryNavGroupedInput = () => (
  <Page isHorizontalSubnavGrouped />
);
```
### page-rename-isTertiaryNavWidthLimited [(#9948)](https://github.com/patternfly/patternfly-react/pull/9948)

We've renamed the \`isTertiaryNavWidthLimited\` prop to \`isHorizontalSubnavWidthLimited\`.

#### Examples

In:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameIsTertiaryNavWidthLimitedInput = () => (
  <Page isTertiaryNavWidthLimited />
);
```

Out:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameIsTertiaryNavWidthLimitedInput = () => (
  <Page isHorizontalSubnavWidthLimited />
);
```
### page-rename-tertiaryNav [(#9948)](https://github.com/patternfly/patternfly-react/pull/9948)

We've renamed the \`tertiaryNav\` prop to \`horizontalSubnav\`.

#### Examples

In:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameTertiaryNavInput = () => <Page tertiaryNav />;
```

Out:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameTertiaryNavInput = () => <Page horizontalSubnav />;
```
### pageSection-update-variant-values [(#9774)](https://github.com/patternfly/patternfly-react/pull/9774) [(#9848)](https://github.com/patternfly/patternfly-react/pull/9848)

The `variant` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".

#### Examples

In:

```jsx
import { PageSection } from "@patternfly/react-core";

export const PageSectionUpdateVariantValuesInput = () => (
  <PageSection variant='dark' />
);
```

Out:

```jsx
import { PageSection } from "@patternfly/react-core";

export const PageSectionUpdateVariantValuesInput = () => (
  <PageSection  />
);
```
### pageSection-warn-variantClasses-applied [(#9848)](https://github.com/patternfly/patternfly-react/pull/9848)

Classes from the `variant` prop will now only be applied to PageSection when the `type` prop has a value of "default".
### pageSidebar-remove-theme-prop [(#9774)](https://github.com/patternfly/patternfly-react/pull/9774)

The `theme` prop has been removed from PageSidebar as theming is no longer handled React-side.

#### Examples

In:

```jsx
import { PageSidebar } from "@patternfly/react-core";

export const PageSidebarRemoveThemePropInput = () => (
  <PageSidebar theme='dark' />
);
```

Out:

```jsx
import { PageSidebar } from "@patternfly/react-core";

export const PageSidebarRemoveThemePropInput = () => (
  <PageSidebar  />
);
```
### simpleFileUpload-warn-changes [(#10026)](https://github.com/patternfly/patternfly-react/pull/10026)

The `aria-describedby` attribute was removed from the TextInput within the SimpleFileUpload, and the `id` attribute was removed from the "browse" button. Instead use the new `browseButtonAriaDescribedby` prop to provide a description to the browse button.

Additionally, we recommend using our FileUploadHelperText component as a child to the FileUpload, instead of using our FormHelperText (the previous recommendation).
### tabs-renamed-isSecondary-prop [(#10044)](https://github.com/patternfly/patternfly-react/pull/10044)

The `isSecondary` prop for Tabs has been renamed to \`isSubtab\`.

#### Examples

In:

```jsx
import { Tabs } from "@patternfly/react-core";

export const TabsRenamedIsSecondaryPropInput = () => <Tabs isSecondary />;
```

Out:

```jsx
import { Tabs } from "@patternfly/react-core";

export const TabsRenamedIsSecondaryPropInput = () => <Tabs isSubtab />;
```
### tabs-replace-variant-light300 [(#9930)](https://github.com/patternfly/patternfly-react/pull/9930) [(#10044)](https://github.com/patternfly/patternfly-react/pull/10044)

The "light300" value for the `variant` prop on Tabs has been replaced with the "secondary" value.

#### Examples

In:

```jsx
import { Tabs } from "@patternfly/react-core";

export const TabsReplaceVariantLight300Input = () => (
  <Tabs variant='light300' />
);
```

Out:

```jsx
import { Tabs } from "@patternfly/react-core";

export const TabsReplaceVariantLight300Input = () => (
  <Tabs variant="secondary" />
);
```
### tabs-update-markup [(#10044)](https://github.com/patternfly/patternfly-react/pull/10044)

The markup for the Tabs scroll buttons have been updated in the following ways:

- Replaced the native `button` HTML element internally with our Button components
- Added a wrapper `div` around them
- Removed styling when the `isSubtab` (previously `isSecondary`) prop is true
