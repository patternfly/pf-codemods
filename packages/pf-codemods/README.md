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

Note: when updating from PatternFly 5 to 6, add the `--v6` flag.

```sh
npx @patternfly/pf-codemods --v6 ./path-to-src
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
  --no-cache         Disables eslint caching
  --v4               Run v3 to v4 codemods
  --v6               Run v5 to v6 codemods
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

### banner-replace-variantProp [(#9891)](https://github.com/patternfly/patternfly-react/pull/9891)

The `variant` property has been removed from Banner. We recommend using our new `color` or `status` properties, depending on the original intent of the `variant` property.

Running the fix for this rule will either replace the `variant` property with the `color` property, or remove the `variant` property entirely, but additional updates may need to be made.

#### Examples

In:

```jsx
import { Banner } from "@patternfly/react-core";

export const BannerReplaceVariantPropInput = () => (
  <>
    <Banner variant='default' />
    <Banner variant='red' />
  </>
);
```

Out:

```jsx
import { Banner } from "@patternfly/react-core";

export const BannerReplaceVariantPropInput = () => (
  <>
    <Banner  />
    <Banner color='red' />
  </>
);
```

### button-moveIcons-icon-prop [(#10663)](https://github.com/patternfly/patternfly-react/pull/10663)

Icons must now be passed to the `icon` prop of Button instead of as children. This rule will only update instances of a Button with `variant="plain"` passed in, but you must ensure you are only passing an icon in such instances before running the fix.

#### Examples

In:

```jsx
import { Button } from "@patternfly/react-core";

export const ButtonMoveIconsIconPropInput = () => (
  <Button variant='plain'>
    <span>Icon</span>
  </Button>
);
```

Out:

```jsx
import { Button } from "@patternfly/react-core";

export const ButtonMoveIconsIconPropInput = () => (
  <Button icon={<span>Icon</span>} variant='plain'></Button>
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

### chip-replace-with-label [(#10049)](https://github.com/patternfly/patternfly-react/pull/10049)

Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.

#### Examples

In:

```jsx
import { Chip } from '@patternfly/react-core/deprecated';

export const ChipReplaceWithLabelInput = () => (
  <Chip onClick={handleClick} badge={badge}>
    This is a chip
  </Chip>
);
```

Out:

```jsx
import { Label } from '@patternfly/react-core';

export const ChipReplaceWithLabelInput = () => (
  <Label variant="outline" onClose={handleClick}>
    This is a chip
    {badge}
  </Label>
);
```


### colorProps-replaced-colors [(#10661)](https://github.com/patternfly/patternfly-react/pull/10661)

The `color` prop on Banner and Label has been updated to replace "cyan" with "teal" and "gold" with "yellow".

#### Examples

In:

```jsx
import { Banner, Label } from "@patternfly/react-core";

export const ColorPropsReplacedColorsInput = () => (
  <>
    <Banner color='gold' />
    <Banner color='cyan' />
    <Label color='gold' />
    <Label color='cyan' />
  </>
);
```

Out:

```jsx
import { Banner, Label } from "@patternfly/react-core";

export const ColorPropsReplacedColorsInput = () => (
  <>
    <Banner color="yellow" />
    <Banner color="teal" />
    <Label color="yellow" />
    <Label color="teal" />
  </>
);
```

### dragDrop-deprecated [(#10181)](https://github.com/patternfly/patternfly-react/pull/10181)

DragDrop has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new drag and drop implementation (DragDropSort component), that lives in '@patternfly/react-drag-drop' package.

#### Examples

In:

```jsx
import { DragDrop, Droppable, Draggable } from '@patternfly/react-core';

export const DragDropDeprecatedInput = () => (
  <DragDrop onDrop={onDrop}>
    <Droppable>
      <Draggable key={1}>Item 1</Draggable>
      <Draggable key={2}>Item 2</Draggable>
    </Droppable>
  </DragDrop>
);
```

Out:

```jsx
import {
  DragDrop,
  Droppable,
  Draggable,
} from '@patternfly/react-core/deprecated';

export const DragDropDeprecatedInput = () => (
  <DragDrop onDrop={onDrop}>
    <Droppable>
      <Draggable key={1}>Item 1</Draggable>
      <Draggable key={2}>Item 2</Draggable>
    </Droppable>
  </DragDrop>
);
```


### drawerContent-replace-noBackground-colorVariant [(#10211)](https://github.com/patternfly/patternfly-react/pull/10211)

The "no-background" value of the `colorVariant` prop on DrawerContent has been removed, and a new "primary" value has been added.

Additionally, a new DrawerContentColorVariant enum has been added and should be used instead of the DrawerColorVariant enum. The fix when the DrawerColorVariant enum is being used will replace the `colorVariant` prop value with a string.

#### Examples

In:

```jsx
import { DrawerContent, DrawerColorVariant } from "@patternfly/react-core";

export const DrawerContentReplaceNoBackgroundColorVariantInput = () => {
  const stringColor = "no-background";
  const enumColor = DrawerColorVariant.default;

  return (
    <>
      <DrawerContent colorVariant='no-background' />
      <DrawerContent colorVariant={DrawerColorVariant.default} />
      <DrawerContent colorVariant={stringColor} />
      <DrawerContent colorVariant={enumColor} />
    </>
  );
};
```

Out:

```jsx
import { DrawerContent, DrawerColorVariant } from "@patternfly/react-core";

export const DrawerContentReplaceNoBackgroundColorVariantInput = () => {
  const stringColor = "no-background";
  const enumColor = DrawerColorVariant.default;

  return (
    <>
      <DrawerContent  />
      <DrawerContent colorVariant="default" />
      <DrawerContent  />
      <DrawerContent colorVariant="default" />
    </>
  );
};
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

### dualListSelector-deprecated [(#10359)](https://github.com/patternfly/patternfly-react/pull/10359)

Our previous implementation of DualListSelector has been deprecated. This rule will update import paths to our deprecated directory, but we recommend using our newly promoted implementation.

#### Examples

In:

```jsx
import { DualListSelector } from "@patternfly/react-core";
```

Out:

```jsx
import {
	DualListSelector
} from '@patternfly/react-core/deprecated';
```

### dualListSelectorNext-promoted [(#10359)](https://github.com/patternfly/patternfly-react/pull/10359)

Our Next implementation of DualListSelector has been promoted as our recommended implementation. This rule will update import paths.

#### Examples

In:

```jsx
import { DualListSelector } from "@patternfly/react-core/next";
```

Out:

```jsx
import {
	DualListSelector /* data-codemods */
} from '@patternfly/react-core';
```

### emptyStateHeader-move-into-emptyState [(#9947)](https://github.com/patternfly/patternfly-react/pull/9947)

EmptyStateHeader and EmptyStateIcon are now rendered internally within EmptyState and should only be customized using props. Content passed to the `icon` prop on EmptyState will also be wrapped by EmptyStateIcon automatically.

Additionally, the `titleText` prop is now required on EmptyState.

#### Examples

In:

```jsx
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  CubesIcon,
  Title,
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

export const EmptyStateWithoutHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState>
    <Title headingLevel="h4" size="lg">
      Foo
    </Title>
    <EmptyStateIcon icon={CubesIcon} />
    <EmptyStateBody>Body</EmptyStateBody>
  </EmptyState>
);
```

Out:

```jsx
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  CubesIcon,
  Title,
} from "@patternfly/react-core";

export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState  headingLevel="h4" icon={CubesIcon}  titleText="Empty state">
    </EmptyState>
);

export const EmptyStateWithoutHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState titleText={<Title headingLevel="h4" size="lg">
      Foo
    </Title>} icon={CubesIcon}>
    <EmptyStateBody>Body</EmptyStateBody>
  </EmptyState>
);
```


### emptyState-nonExported-components [(#10364)](https://github.com/patternfly/patternfly-react/pull/10364)

EmptyStateHeader and EmptyStateIcon are no longer exported by PatternFly. This rule will only apply fixes for exports of these components, as our rule for unused imports will handle applying fixes for imports.

#### Examples

In:

```jsx
import { EmptyStateHeader, EmptyStateIcon } from "@patternfly/react-core";

export { EmptyStateHeader, EmptyStateIcon };
export {
  EmptyStateHeader as CustomESHeader,
  EmptyStateIcon as CustomESIcon,
} from "@patternfly/react-core";
```

Out:

```jsx
import { EmptyStateHeader, EmptyStateIcon } from "@patternfly/react-core";
```

### formFiledGroupHeaderTitleTextObject-renamed [(#10016)](https://github.com/patternfly/patternfly-react/pull/10016)

There was a typo in FormFiledGroupHeaderTitleTextObject interface. It was renamed to the intended FormFieldGroupHeaderTitleTextObject.

#### Examples

In:

```jsx
import { FormFiledGroupHeaderTitleTextObject } from "@patternfly/react-core";
export { FormFiledGroupHeaderTitleTextObject as HeaderTitleObject } from "@patternfly/react-core";

interface MyExtension extends FormFiledGroupHeaderTitleTextObject {}

const titleTextObject: FormFiledGroupHeaderTitleTextObject = {
  text: "Some title",
  id: "form-field-group-header-title-text",
};
```

Out:

```jsx
import { FormFieldGroupHeaderTitleTextObject } from "@patternfly/react-core";
export { FormFieldGroupHeaderTitleTextObject as HeaderTitleObject } from "@patternfly/react-core";

interface MyExtension extends FormFieldGroupHeaderTitleTextObject {}

const titleTextObject: FormFieldGroupHeaderTitleTextObject = {
  text: "Some title",
  id: "form-field-group-header-title-text",
};
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

### kebabToggle-removed [(#10345)](https://github.com/patternfly/patternfly-react/pull/10345)

KebabToggle has been removed from PatternFly. We recommend using our MenuToggle component instead. Running the fix for this rule will replace most KebabToggle usage with a MenuToggle. Depending on the use-case, however, additional manual updates may be necessary, such as upgrading from our deprecated Dropdown implementation to our current one.

#### Examples

In:

```jsx
import { KebabToggle } from "@patternfly/react-core/deprecated";

export const KebabToggleRemovedInput = () => (
  <>
    <KebabToggle onToggle={() => {}} />
    <Dropdown toggle={<KebabToggle onToggle={() => {}} />} />
  </>
);
```

Out:

```jsx
import { MenuToggle } from "@patternfly/react-core";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const KebabToggleRemovedInput = () => (
  <>
    <MenuToggle variant="plain" icon={<EllipsisVIcon aria-hidden="true" />} onClick={() => {}} />
    <Dropdown toggle={<MenuToggle variant="plain" icon={<EllipsisVIcon aria-hidden="true" />} onClick={() => {}} />} />
  </>
);
```

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

### loginMainFooterLinksItem-structure-updated [(#10107)](https://github.com/patternfly/patternfly-react/pull/10107)

LoginMainFooterLinksItem structure has changed. Instead of passing it many properties, everything is now passed in a children component directly.

#### Examples

In:

```jsx
import { LoginMainFooterLinksItem } from "@patternfly/react-core";

export const LoginMainFooterLinksItemStructureUpdatedInput = () => (
  <LoginMainFooterLinksItem
    href="https://github.com/login"
    linkComponentProps={{ "aria-label": "Login with Github" }}
  >
    <i>GitHub icon</i>
  </LoginMainFooterLinksItem>
);
```

Out:

```jsx
import { LoginMainFooterLinksItem, Button } from "@patternfly/react-core";

export const LoginMainFooterLinksItemStructureUpdatedInput = () => (
  <LoginMainFooterLinksItem data-codemods="true">
    <Button
      variant="link"
      component="a"
      href="https://github.com/login"
      {...{ "aria-label": "Login with Github" }}
    >
      <i>GitHub icon</i>
    </Button>
  </LoginMainFooterLinksItem>
);
```

### logViewer-moved-styles [(#70)](https://github.com/patternfly/react-log-viewer/pull/70)

The stylesheet for LogViewer has been moved out of the PatternFly package and into LogViewer itself. You may need to update stylesheet imports or import the stylesheet manually.

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

### modal-deprecated [(#10358)](https://github.com/patternfly/patternfly-react/pull/10358)

Our previous implementation of Modal has been deprecated. This rule will update import paths to our deprecated directory, but we recommend using our newly promoted implementation.

#### Examples

In:

```jsx
import { Modal } from "@patternfly/react-core";
```

Out:

```jsx
import {
	Modal
} from '@patternfly/react-core/deprecated';
```

### modalNext-promoted [(#10358)](https://github.com/patternfly/patternfly-react/pull/10358)

Our Next implementation of Modal has been promoted as our recommended implementation. This rule will update import paths.

#### Examples

In:

```jsx
import { Modal } from "@patternfly/react-core/next";
```

Out:

```jsx
import {
	Modal /* data-codemods */
} from '@patternfly/react-core';
```

### navItem-remove-hasNavLinkWrapper-prop [(#10687)](https://github.com/patternfly/patternfly-react/pull/10687)

The `hasNavLinkWrapper` prop has been removed from NavItem. Additionally, any icons for a NavItem should be passed to its new `icon` prop.

#### Examples

In:

```jsx
import { NavItem } from "@patternfly/react-core";

export const NavItemRemoveHasNavLinkWrapperPropInput = () => <NavItem hasNavLinkWrapper />
```

Out:

```jsx
import { NavItem } from "@patternfly/react-core";

export const NavItemRemoveHasNavLinkWrapperPropInput = () => <NavItem  />
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

### notificationDrawerHeader-warn-update-markup [(#10378)](https://github.com/patternfly/patternfly-react/pull/10378)

NotificationDrawerHeader no longer uses our Text component internally, and instead renders a native `h1` element.

### no-unused-imports-v6

PatternFly imports that are unused imports should be removed.

#### Examples

In:

```jsx
import { Foo, Bar } from "@patternfly/react-core";

export const NoUnusedImportsInput = () => <Bar />;
```

Out:

```jsx
import { Bar } from "@patternfly/react-core";

export const NoUnusedImportsInput = () => <Bar />;
```


### pageBreadcrumbAndSection-warn-updated-wrapperLogic [(#10650)](https://github.com/patternfly/patternfly-react/pull/10650)

The `isWidthLimited` prop on PageBreadcrumb and PageSection will no longer determine whether the children of either component are wrapped in a PageBody. Instead the new `hasBodyWrapper` prop must be used. By default this new prop is set to true. Running the fix for this rule will apply `hasBodyWrapper` with the same value as the `isWidthLimited` prop or false if `isWidthLimited` is not passed.

#### Examples

In:

```jsx
import { PageBreadcrumb, PageSection } from "@patternfly/react-core";

export const PageBreadcrumbAndSectionWarnUpdatedWrapperLogicInput = () => (
  <>
    <PageBreadcrumb isWidthLimited />
    <PageBreadcrumb isWidthLimited={someVar} />
    <PageBreadcrumb isWidthLimited={() => someCallback()} />
    <PageSection isWidthLimited />
    <PageSection isWidthLimited={someVar} />
    <PageSection isWidthLimited={() => someCallback()} />
  </>
);
```

Out:

```jsx
import { PageBreadcrumb, PageSection } from "@patternfly/react-core";

export const PageBreadcrumbAndSectionWarnUpdatedWrapperLogicInput = () => (
  <>
    <PageBreadcrumb hasBodyWrapper isWidthLimited />
    <PageBreadcrumb hasBodyWrapper={someVar} isWidthLimited={someVar} />
    <PageBreadcrumb hasBodyWrapper={() => someCallback()} isWidthLimited={() => someCallback()} />
    <PageSection hasBodyWrapper isWidthLimited />
    <PageSection hasBodyWrapper={someVar} isWidthLimited={someVar} />
    <PageSection hasBodyWrapper={() => someCallback()} isWidthLimited={() => someCallback()} />
  </>
);
```

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

### pageNavigation-remove-component [(#10650)](https://github.com/patternfly/patternfly-react/pull/10650)

The PageNavigation component has been removed from PatternFly.

#### Examples

In:

```jsx
import { PageNavigation } from "@patternfly/react-core";

export const PageNavigationRemoveComponentInput = () => (
  <div>
    <PageNavigation />
    <div>Some adjacent content</div>
    <PageNavigation>
      <div>Some internal content</div>
    </PageNavigation>
  </div>
);

export { PageNavigation } from "@patternfly/react-core";
export { PageNavigation as CustomNav };
export default PageNavigation;
```

Out:

```jsx
import { PageNavigation } from "@patternfly/react-core";

export const PageNavigationRemoveComponentInput = () => (
  <div>
    
    <div>Some adjacent content</div>
    
      <div>Some internal content</div>
    
  </div>
);
```


### page-rename-header [(#10454)](https://github.com/patternfly/patternfly-react/pull/10454)

We've renamed the `header` prop for Page to `masthead`.

#### Examples

In:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameHeaderInput = () => <Page header={<Masthead />} />;
```

Out:

```jsx
import { Page } from '@patternfly/react-core';

export const PageRenameHeaderInput = () => <Page masthead={<Masthead />} />;
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

### pageSection-remove-nav-type [(#10650)](https://github.com/patternfly/patternfly-react/pull/10650)

The "nav" type for PageSection has been removed.

#### Examples

In:

```jsx
import { PageSection, PageSectionTypes } from "@patternfly/react-core";

const chosenType = PageSectionTypes.nav;

export const PageSectionRemoveNavTypeInput = () => (
  <>
    <PageSection type='nav' />
    <PageSection type={PageSectionTypes.nav} />
    <PageSection type={chosenType} />
  </>
);
```

Out:

```jsx
import { PageSection, PageSectionTypes } from "@patternfly/react-core";

const chosenType = PageSectionTypes.nav;

export const PageSectionRemoveNavTypeInput = () => (
  <>
    <PageSection  />
    <PageSection  />
    <PageSection  />
  </>
);
```


### pageSection-update-variant-values [(#9774)](https://github.com/patternfly/patternfly-react/pull/9774) [(#9848)](https://github.com/patternfly/patternfly-react/pull/9848)

The `variant` prop for PageSection now only accepts a value of "default" or "secondary". Running the fix for this rule will remove the prop so it uses the default value of "default".

#### Examples

In:

```jsx
import { PageSection, PageSectionVariants } from "@patternfly/react-core";

export const PageSectionUpdateVariantValuesInput = () => (
  <>
    <PageSection variant='dark' />
    <PageSection variant={PageSectionVariants.dark} />
  </>
);
```

Out:

```jsx
import { PageSection, PageSectionVariants } from "@patternfly/react-core";

export const PageSectionUpdateVariantValuesInput = () => (
  <>
    <PageSection  />
    <PageSection  />
  </>
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

### page-warn-updated-markup [(#10650)](https://github.com/patternfly/patternfly-react/pull/10650)

The markup for Page has changed. When either the `horizontalSubnav` or `breadcrumb` props are passed, a PageBody component will always wrap the contents.

### pagination-warn-markup-changed [(#10662)](https://github.com/patternfly/patternfly-react/pull/10662)

The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle. This rule does not provide a fixer, but will throw a warning.

### popper-update-appendTo-default [(#10675)](https://github.com/patternfly/patternfly-react/pull/10675)

The default value of appendTo on Dropdown, Select, and Popper has been updated to `document.body`.

### remove-deprecated-components [(#10345)](https://github.com/patternfly/patternfly-react/pull/10345)

The following deprecated components have been removed from PatternFly, and must be updated accordingly:

- Application Launcher: we recommmend using our [custom menu application launcher example](https://staging-v6.patternfly.org/components/menus/custom-menus#application-launcher-menu)
- Context Selector: we recommmend using our [custom menu context selector example](https://staging-v6.patternfly.org/components/menus/custom-menus#context-selector-menu)
- Dropdown: we recommend using either our current composable Dropdown or our Dropdown template implementation
- Options Menu: we recommend using either our current composable Select or our Select template implementation
- Page Header: we recommend using our Masthead and Toolbar components to build a page header
- Select: we recommend using either our current composable Select or our Select template implementation

Note that this rule will not provide any fixers.

### simpleFileUpload-warn-changes [(#10026)](https://github.com/patternfly/patternfly-react/pull/10026)

The `aria-describedby` attribute was removed from the TextInput within the SimpleFileUpload, and the `id` attribute was removed from the "browse" button. Instead use the new `browseButtonAriaDescribedby` prop to provide a description to the browse button.

Additionally, we recommend using our FileUploadHelperText component as a child to the FileUpload, instead of using our FormHelperText (the previous recommendation).

### sliderStep-warn-update-markup [(#10378)](https://github.com/patternfly/patternfly-react/pull/10378)

The `--pf-v6-c-slider__step--Left` CSS variable applied as an inline style has been updated to the `--pf-v6-c-slider__step--InsetInlineStart` CSS variable.

### switch-remove-labelOff [(#10646)](https://github.com/patternfly/patternfly-react/pull/10646)

The `labelOff` prop has been removed from Switch. The label for a Switch should not dynamically update based on the on/off state.

#### Examples

In:

```jsx
import { Switch } from "@patternfly/react-core";

export const SwitchRemoveLabelOffInput = () => <Switch labelOff='Some label' />;
```

Out:

```jsx
import { Switch } from "@patternfly/react-core";

export const SwitchRemoveLabelOffInput = () => <Switch  />
```

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

### text-replace-with-content [(#10643)](https://github.com/patternfly/patternfly-react/pull/10643)

We have replaced Text, TextContent, TextList and TextListItem with one Content component. Running this fix will change all of those components names to Content and add a "component" prop where necessary.

#### Examples

In:

```jsx
import {
  Text,
  TextContent,
  TextList,
  TextListItem,
} from "@patternfly/react-core";

export const TextReplaceWithContentInput = () => (
  <>
    <Text component="h3">Abc</Text>
    <Text>Abc</Text>
    <TextContent>Abc</TextContent>
    <TextContent isVisited>Abc</TextContent>
    <TextList>Abc</TextList>
    <TextList isPlain>Abc</TextList>
    <TextList component="ol">Abc</TextList>
    <TextListItem>Abc</TextListItem>
    <TextListItem component="dt">Abc</TextListItem>
    <TextList>
      <TextListItem>A</TextListItem>
      <TextListItem>B</TextListItem>
      <TextListItem>C</TextListItem>
    </TextList>
  </>
);
```

Out:

```jsx
import {
  Content,
  Content,
  Content,
  Content,
} from "@patternfly/react-core";

export const TextReplaceWithContentInput = () => (
  <>
    <Content component="h3">Abc</Content>
    <Content component="p">Abc</Content>
    <Content>Abc</Content>
    <Content isVisitedLink>Abc</Content>
    <Content component="ul">Abc</Content>
    <Content component="ul" isPlainList>Abc</Content>
    <Content component="ol">Abc</Content>
    <Content component="li">Abc</Content>
    <Content component="dt">Abc</Content>
    <Content component="ul">
      <Content component="li">A</Content>
      <Content component="li">B</Content>
      <Content component="li">C</Content>
    </Content>
  </>
);
```


### Th-Td-warn-update-markup [(#10378)](https://github.com/patternfly/patternfly-react/pull/10378)

The `--pf-v6-c-table__sticky-cell--Left` and `--pf-v6-c-table__sticky-cell--Right` CSS variables applied as inline styles when `isStickyColumn` is true have been updated to `--pf-v6-c-table__sticky-cell--InsetInlineStart` and `--pf-v6-c-table__sticky-cell--InsetInlineEnd`, respectively.

### toolbarChipGroupContent-rename-component [(#10649)](https://github.com/patternfly/patternfly-react/pull/10649)

The ToolbarChipGroupContent component has been renamed to ToolbarLabelGroupContent.

#### Examples

In:

```jsx
import { ToolbarChipGroupContent } from "@patternfly/react-core";

const Component = ToolbarChipGroupContent;
export const ToolbarChipGroupContentRenameComponentInput = () => (
  <>
    <ToolbarChipGroupContent></ToolbarChipGroupContent>
    <ToolbarChipGroupContent />
    <Component />
  </>
);

export { ToolbarChipGroupContent as CustomThing };
```

Out:

```jsx
import { ToolbarLabelGroupContent } from "@patternfly/react-core";

const Component = ToolbarLabelGroupContent;
export const ToolbarChipGroupContentRenameComponentInput = () => (
  <>
    <ToolbarLabelGroupContent></ToolbarLabelGroupContent>
    <ToolbarLabelGroupContent />
    <Component />
  </>
);

export { ToolbarLabelGroupContent as CustomThing };
```

### toolbarGroup-updated-iconButtonGroup-variant [(#10674)](https://github.com/patternfly/patternfly-react/pull/10674)

The `icon-button-group` variant of ToolbarGroup and ToolbarToggleGroup has been renamed to `action-group-plain`.

#### Examples

In:

```jsx
import {
  ToolbarGroup,
  ToolbarToggleGroup,
  ToolbarGroupVariant,
} from "@patternfly/react-core";

export const ToolbarGroupUpdatedIconButtonGroupVariantInput = () => (
  <>
    <ToolbarGroup variant='icon-button-group' />
    <ToolbarGroup variant={ToolbarGroupVariant["icon-button-group"]} />
    <ToolbarToggleGroup variant='icon-button-group' />
    <ToolbarToggleGroup variant={ToolbarGroupVariant["icon-button-group"]} />
  </>
);
```

Out:

```jsx
import {
  ToolbarGroup,
  ToolbarToggleGroup,
  ToolbarGroupVariant,
} from "@patternfly/react-core";

export const ToolbarGroupUpdatedIconButtonGroupVariantInput = () => (
  <>
    <ToolbarGroup variant="action-group-plain" />
    <ToolbarGroup variant={ToolbarGroupVariant["action-group-plain"]} />
    <ToolbarToggleGroup variant="action-group-plain" />
    <ToolbarToggleGroup variant={ToolbarGroupVariant["action-group-plain"]} />
  </>
);
```

### toolbarItem-replace-chipGroup-variant [(#10649)](https://github.com/patternfly/patternfly-react/pull/10649)

The "chip-group" variant for ToolbarItem has been replaced with "label-group".

#### Examples

In:

```jsx
import { ToolbarItem } from "@patternfly/react-core";

export const ToolbarItemReplaceChipGroupVariantInput = () => (
  <ToolbarItem variant='chip-group' />
);
```

Out:

```jsx
import { ToolbarItem } from "@patternfly/react-core";

export const ToolbarItemReplaceChipGroupVariantInput = () => (
  <ToolbarItem variant="label-group" />
);
```

### toolbarLabelGroupContent-updated-markup [(#10674)](https://github.com/patternfly/patternfly-react/pull/10674)

The markup for ToolbarLabelGruopContent (formerly ToolbarChipGroupContent) has changed when the `numberOfFilters` value is greater than 0, when the `showClearFiltersButton` prop is true, or when the `customLabelGroupContent` prop is passed. This rule will not provide a fix, but will throw a warning.

### toolbar-remove-props [(#10674)](https://github.com/patternfly/patternfly-react/pull/10674)

The following props have been removed from Toolbar components:

| Component          | Prop removed    |
| ------------------ | --------------- |
| Toolbar            | `usePageInsets` |
| ToolbarContent     | `alignSelf`     |
| ToolbarToggleGroup | `alignment`     |

#### Examples

In:

```jsx
import {
  Toolbar,
  ToolbarContent,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarRemovePropsInput = () => (
  <>
    <Toolbar usePageInsets />
    <ToolbarContent alignSelf={{}} />
    <ToolbarToggleGroup alignment={{}} />
  </>
);
```

Out:

```jsx
import {
  Toolbar,
  ToolbarContent,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarRemovePropsInput = () => (
  <>
    <Toolbar  />
    <ToolbarContent  />
    <ToolbarToggleGroup  />
  </>
);
```

### toolbar-replace-chip-instances [(#10649)](https://github.com/patternfly/patternfly-react/pull/10649)

Several Chip-based props have been renamed on our Toolbar components:

| Component/Location of change | Description of update |
| -- | -- | -- |
| `<Toolbar>` | The `customChipGroupContent` prop has been renamed to `customLabelGroupContent` |
| `<ToolbarExpandableContent>` | The `chipContainerRef` prop has been renamed to `labelContainerRef` |
| `<ToolbarFilter>` | The `chips` prop has been renamed to `labels` |
| `<ToolbarFilter>` | The `deleteChipGroup` prop has been renamed to `deleteLabelGroup` |
| `<ToolbarFilter>` | The `deleteChip` prop has been renamed to `deleteLabel` |
| `<ToolbarFilter>` | The `chipGroupExpandedText` prop has been renamed to `labelGroupExpandedText` |
| `<ToolbarFilter>` | The `chipGroupCollapsedText` prop has been renamed to `labelGroupCollapsedText` |
| `<ToolbarFilter>` | The `expandableChipContainerRef` prop has been renamed to `expandableLabelContainerRef` |
| `<ToolbarChipGroupContent>` | The `chipGroupContentRef` prop has been renamed to `labelGroupContentRef` |
| `<ToolbarChipGroupContent>` | The `customChipGroupContent` prop has been renamed to `customLabelGroupContent` |
| `<ToolbarToggleGroup>` | The `chipContainerRef` prop has been renamed to `labelContainerRef` |


#### Examples

In:

```jsx
import {
  Toolbar,
  ToolbarExpandableContent,
  ToolbarFilter,
  ToolbarChipGroupContent,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarReplaceChipInstancesInput = () => (
  <>
    <Toolbar customChipGroupContent />
    <ToolbarExpandableContent chipContainerRef />
    <ToolbarFilter
      chips
      deleteChipGroup
      deleteChip
      chipGroupExpandedText
      chipGroupCollapsedText
      expandableChipContainerRef
    />
    <ToolbarChipGroupContent chipGroupContentRef customChipGroupContent />
    <ToolbarToggleGroup chipContainerRef />
  </>
);
```

Out:

```jsx
import {
  Toolbar,
  ToolbarExpandableContent,
  ToolbarFilter,
  ToolbarChipGroupContent,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarReplaceChipInstancesInput = () => (
  <>
    <Toolbar customLabelGroupContent />
    <ToolbarExpandableContent labelContainerRef />
    <ToolbarFilter
      labels
      deleteLabelGroup
      deleteLabel
      labelGroupExpandedText
      labelGroupCollapsedText
      expandableLabelContainerRef
    />
    <ToolbarChipGroupContent labelGroupContentRef customLabelGroupContent />
    <ToolbarToggleGroup labelContainerRef />
  </>
);
```


### toolbar-rename-interfaces [(#10649)](https://github.com/patternfly/patternfly-react/pull/10649)

The following Toolbar interfaces have been renamed:

| Old interface name | New interface name |
| -- | -- | -- |
| `ToolbarChipGroupContentProps` | `ToolbarLabelGroupContentProps` |
| `ToolbarChipGroup` | `ToolbarLabelGroup` |
| `ToolbarChip` | `ToolbarLabel` |

#### Examples

In:

```jsx
import {
  ToolbarChipGroup,
  ToolbarChipGroupContentProps as CustomGroupContent,
  ToolbarChip,
} from "@patternfly/react-core";

interface MyInterface extends ToolbarChip {}
let typedThing: ToolbarChipGroup;

export {
  ToolbarChipGroup as CustomGroup,
  CustomGroupContent,
  ToolbarChip as CustomThing,
};
```

Out:

```jsx
import {
  ToolbarLabelGroup,
  ToolbarLabelGroupContentProps as CustomGroupContent,
  ToolbarLabel,
} from "@patternfly/react-core";

interface MyInterface extends ToolbarLabel {}
let typedThing: ToolbarLabelGroup;

export {
  ToolbarLabelGroup as CustomGroup,
  CustomGroupContent,
  ToolbarLabel as CustomThing,
};
```


### toolbar-replaced-spacer-spaceItems [(#10418)](https://github.com/patternfly/patternfly-react/pull/10418)

The `spacer` property has been removed from ToolbarGroup, ToolbarItem, and ToolbarToggleGroup. We recommend instead using our new `gap`, `columnGap`, or `rowGap` properties.

Additionally, the `spaceItems` property has been removed from ToolbarGroup and ToolbarToggleGroup.

#### Examples

In:

```jsx
import {
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarReplacedSpacerSpaceItemsInput = () => (
  <>
    <ToolbarGroup
      spacer={{ default: "spacerNone", md: "spacerSm", lg: "spacerMd" }}
      spaceItems={{
        default: "spaceItemsNone",
        md: "spaceItemsSm",
        lg: "spaceItemsMd",
      }}
    />
    <ToolbarItem
      spacer={{ default: "spacerNone", md: "spacerSm", lg: "spacerMd" }}
    />
    <ToolbarToggleGroup
      spacer={{ default: "spacerNone", md: "spacerSm", lg: "spacerMd" }}
      spaceItems={{
        default: "spaceItemsNone",
        md: "spaceItemsSm",
        lg: "spaceItemsMd",
      }}
    />
  </>
);
```

Out:

```jsx
import {
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarReplacedSpacerSpaceItemsInput = () => (
  <>
    <ToolbarGroup
      gap={{ default: "gapNone", md: "gapSm", lg: "gapMd" }}
      
    />
    <ToolbarItem
      gap={{ default: "gapNone", md: "gapSm", lg: "gapMd" }}
    />
    <ToolbarToggleGroup
      gap={{ default: "gapNone", md: "gapSm", lg: "gapMd" }}
      
    />
  </>
);
```

### toolbar-update-align-values [(#10366)](https://github.com/patternfly/patternfly-react/pull/10366)

The values for the `align` property on ToolbarGroup and ToolbarItem, and the `alignment` property on ToolbarToggleGroup, have been updated from "alignLeft" and "alignRight" to "alignStart" and "alignEnd", respectively.

#### Examples

In:

```jsx
import {
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarUpdateAlignValuesInput = () => (
  <>
    <ToolbarGroup
      align={{
        default: "alignLeft",
        md: "alignRight",
        lg: "alignLeft",
        xl: "alignRight",
        "2xl": "alignLeft",
      }}
    />
    <ToolbarItem
      align={{
        default: "alignLeft",
        md: "alignRight",
        lg: "alignLeft",
        xl: "alignRight",
        "2xl": "alignLeft",
      }}
    />
    <ToolbarToggleGroup
      alignment={{
        default: "alignLeft",
        md: "alignRight",
        lg: "alignLeft",
        xl: "alignRight",
        "2xl": "alignLeft",
      }}
    />
  </>
);
```

Out:

```jsx
import {
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const ToolbarUpdateAlignValuesInput = () => (
  <>
    <ToolbarGroup
      align={{
        default: "alignStart",
        md: "alignEnd",
        lg: "alignStart",
        xl: "alignEnd",
        "2xl": "alignStart",
      }}
    />
    <ToolbarItem
      align={{
        default: "alignStart",
        md: "alignEnd",
        lg: "alignStart",
        xl: "alignEnd",
        "2xl": "alignStart",
      }}
    />
    <ToolbarToggleGroup
      alignment={{
        default: "alignStart",
        md: "alignEnd",
        lg: "alignStart",
        xl: "alignEnd",
        "2xl": "alignStart",
      }}
    />
  </>
);
```

### treeView-warn-selectable-styling-modifier-removed [(#10101)](https://github.com/patternfly/patternfly-react/pull/10101)

Selectable styling attribute (`pf-m-selectable`) has been removed on the list items of the TreeView component. You should update selectors, tests and snapshot tests which are relying on the `pf-m-selectable` class.

### wizardFooter-warn-update-markup [(#10378)](https://github.com/patternfly/patternfly-react/pull/10378)

The default WizardFooter now uses an ActionList wrapped around our Button components, rather than just our Button components.

### wizardNavItem-warn-update-markup [(#10378)](https://github.com/patternfly/patternfly-react/pull/10378)

There is now a wrapper element with class `pf-v6-c-wizard__nav-link-main` rendered around the nav item content. Additionally, when the nav item has a status of "error" the icon will be rendered before the item content, and the WizardToggle will also now render an error icon.

### wizardStep-updated-body-typing [(#10637)](https://github.com/patternfly/patternfly-react/pull/10637)

The `body` prop on WizardStep no longer accepts a value of "null".

#### Examples

In:

```jsx
import { WizardStep } from "@patternfly/react-core";

export const WizardStepUpdatedBodyTypingInput = () => (
  <WizardStep body={null} />
);
```

Out:

```jsx
import { WizardStep } from "@patternfly/react-core";

export const WizardStepUpdatedBodyTypingInput = () => (
  <WizardStep  />
);
```

