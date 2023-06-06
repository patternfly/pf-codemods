import {
  Chart,
  ChartLegend,
  DarkBlueColorTheme,
  getCustomTheme,
  getResizeObserver,
  LightBlueColorTheme,
} from "@patternfly/react-charts";
import { CodeEditor } from "@patternfly/react-code-editor";
import { FrogIcon } from "@patternfly/react-icons";

import {
  AboutModal,
  AccordionExpandableContent,
  Alert,
  AlertIcon,
  AlertVariant,
  ApplicationLauncher,
  BackgroundImage,
  BackgroundImageSrcMap,
  BadgeToggle,
  Banner,
  Button,
  CalendarMonth,
  Card,
  CardActions,
  CardHeader,
  CardHeaderMain,
  Checkbox,
  ClipboardCopy,
  ContextSelector,
  ContextSelectorFooter,
  ContextSelectorItem,
  DataList,
  DataListCheck,
  DatePicker,
  DrawerPanelContent,
  Dropdown,
  DropdownContext,
  DropdownDirection,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  DropdownToggleCheckbox,
  DualListSelector,
  EditableSelectInputCell,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary as ESP,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  ExpandableSection,
  FileUpload,
  FileUploadField,
  FormSelect,
  InputGroup,
  InputGroupItem,
  InputGroupText,
  KebabToggle,
  KEY_CODES,
  Label,
  LoginForm,
  LoginPage,
  MenuItem,
  MenuItemAction,
  Modal,
  ModalContent,
  MultipleFileUpload,
  Nav,
  NotificationBadge,
  NotificationDrawerListItemHeader,
  NumberInput,
  OptionsMenu,
  OptionsMenuGroup,
  OptionsMenuToggle,
  OverflowMenuDropdownItem,
  Page,
  PageGroup,
  PageHeader,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  PageNavigation,
  PageSidebar,
  PageToggleButton,
  Pagination,
  Popover,
  Popper,
  ProgressStep,
  Radio,
  Select,
  SelectGroup,
  SelectMenu,
  SelectOption as SelectOpt,
  SelectToggle,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TextArea,
  TextInput,
  Title,
  Toggle,
  ToggleGroupItem,
  ToggleTemplateProps,
  Tooltip,
  TreeView,
  Wizard,
  WizardStepFunctionType
} from "@patternfly/react-core";
import {
  SelectOption,
  WizardBody as WizardBodyNext,
  WizardFooter,
  DropdownItem as NextDropdownItem,
} from "@patternfly/react-core/next";
import {
  Table,
  TableBody,
  TableHeader,
  TableProps,
  Td,
  Tr,
} from "@patternfly/react-table";
import { TableComposable } from "@patternfly/react-table";
import { TableComposable as PFTable } from "@patternfly/react-table";

const tdSelectTypeObj = { disable: true };
//following type of import was causing errors for rules that checked specifiers before import package
import foo from "Bar";

//eslint-disable-next-line @typescript/foo
const isRead = true;
const myVariant = EmptyStateVariant.small;
const newTheme = getCustomTheme("1", "2", "3");
const backgroundImgSrcObj: BackgroundImageSrcMap = {};
const wizardStepFunType: WizardStepFunctionType = () => {};

const variantOption = "default";
const alertVariantOption = AlertVariant.default;
<>
  <Alert aria-label='tester' className='pf-c-foo' />
  <Alert titleHeadingLevel={"h4"} variant={AlertVariant.default} />
  <AlertIcon variant={"default"}></AlertIcon>
  <ApplicationLauncher
    onToggle={}
    onFavorite={(id, isFavorite) => handler(id, isFavorite)}
    onSearch={(text) => handleText(text)}
  />
  <BackgroundImage filter={<CustomFilter />} src={{ a: 1 }} />
  <BadgeToggle onToggle={} />
  <Banner variant='danger' />
  <Button isLarge />
  <Button isSmall />
  <CalendarMonth
    onChange={(date) => handleChange(date)}
    onMonthChange={(newDate, evt) => handleMonthChange(newDate, evt)}
  />
  <Card
    isSelectableRaised
    isDisabledRaised
    hasSelectableInput
    selectableInputAriaLabel
  />
  <Card onSelectableInputChange={(label, _ev) => handler(label)} />
  <CardHeader>
    <CardHeaderMain>Header content</CardHeaderMain>
    <CardActions className='test' hasNoOffset>
      <Button>Card action</Button>
    </CardActions>
  </CardHeader>
  <Chart themeVariant />
  <Checkbox onChange={(checked, e) => handleCheck(check, e)} />
  <ClipboardCopy onChange={(foo) => handleChange(foo)} />
  <ContextSelector>
    <ContextSelectorItem />
  </ContextSelector>
  <DataList onDragStart itemOrder={["1", "2", "3"]} />
  <DataList onSelectDataListItem={(id, text) => handler(id, text)} />
  <DataList selectableRow={{ onChange = () => {} }} />
  <DataListCheck onChange={(id) => handler} />
  <DatePicker />
  <DrawerPanelContent onResize={(id, width) => {}} />
  <Dropdown
    position={DropdownPosition.right}
    direction={DropdownDirection.up}
  />
  <DropdownContext.Provider />
  <DropdownItem isHovered={true} />
  <DropdownToggle isPrimary onToggle={} />
  <DropdownToggleCheckbox
    onChange={(change, evt) => handleChange(change, evt)}
  />
  <DualListSelector
    onAvailableOptionsSearchInputChanged={(foo, event) => handler(foo, event)}
  />
  <DualListSelector
    onChosenOptionsSearchInputChanged={(foo, event) => handler(foo, event)}
  />
  <DualListSelector onListChange={(foo) => handler(foo)} />
  <EditableSelectInputCell
    onSelect={(foo, event) => onSelectHandler(foo, event)}
    clearSelection={(foo) => clearSelectionHandler(foo, event)}
  />
  <EmptyState variant={EmptyStateVariant.large}>
    <EmptyStateIcon icon={CubesIcon} />
    <Title headingLevel='h5' size='4xl'>
      Empty state
    </Title>
    <EmptyStateBody>Some other content.</EmptyStateBody>
    <ESP>Primary action</ESP>
    <EmptyStateSecondaryActions>Secondary Actions</EmptyStateSecondaryActions>
  </EmptyState>
  <EmptyState variant='small' />
  <EmptyStateIcon />
  <EmptyStateIcon component={Spinner} variant='container' />
  <ExpandableSection onToggle={(foo) => handler(foo)} />
  <FileUpload
    onDataChange={(data) => changeHandler(data)}
    onReadFailed={(error, fileHandle) => readFailedHandler(error, fileHandle)}
    onReadFinished={(fileHandle) => readFinishedHandler(fileHandle)}
    onReadStarted={(fileHandle) => readStartedHandler(fileHandle)}
  />
  <FileUpload onTextChange={(bar) => textHandler(bar)} />
  <FileUploadField onTextChange={(bar) => textHandler(bar)} />
  <FormSelect isIconSprite />
  <FormSelect onChange={(foo, event) => handler(foo, event)} />
  <FrogIcon size='sm' color='green' noVerticalAlign />
  <InputGroup>
    <input />
    <textarea />
    <TextArea />
    <TextInput />
    <InputGroupText>Text</InputGroupText>
    <button />
  </InputGroup>
  <InputGroupText variant />
  <KebabToggle onToggle={} />
  <Label />
  <Label isTruncated />
  <LoginForm
    onChangeUsername={(foo, event) => handler(foo, event)}
    onChangePassword={(foo, event) => handler(foo, event)}
    onChangeRememberMe={(foo, event) => handler(foo, event)}
  />
  <LoginPage backgroundImgAlt='tester' backgroundImgSrc={{ a: 1 }} />
  <Menu aria-label='tester' />
  <MenuItem hasCheck aria-label='tester' />
  <MenuItemAction />
  <Modal titleIconVariant={variantOption}></Modal>
  <ModalContent titleIconVariant='default'></ModalContent>
  <MultipleFileUpload onFileDrop={(foo) => handler(foo)} />
  <Nav flyout={"menu"} />
  <Nav onSelect={(foo) => handler(foo)} onToggle={(foo) => handler(foo)} />
  <Nav variant='horizontal-subnav' />
  <NextDropdownItem itemId='test' />
  <NotificationBadge isRead />
  <NotificationBadge isRead={false} />
  <NotificationBadge isRead={isRead} />
  <NotificationDrawerListItemHeader variant='default'></NotificationDrawerListItemHeader>
  <OptionsMenu></OptionsMenu>
  <NumberInput allowEmptyInput />
  <OverflowMenuDropdownItem index={0} />
  <Page onPageResize={({ obj }) => handler({ obj })} />
  <PageGroup aria-label='tester' />
  <PageHeader />
  <PageHeaderTools />
  <PageHeaderToolsGroup />
  <PageHeaderToolsItem />
  <PageNavigation aria-label='tester' />
  <PageSidebar isNavOpen />
  <PageSidebar nav='Content' />
  <PageToggleButton isNavOpen onNavToggle />
  <Pagination
    defaultToFullPage
    perPageComponent='div'
    titles={{
      currPage: "test",
      paginationTitle: "test",
      toFirstPage: "test",
      toLastPage: "test",
      toNextPage: "test",
      toPreviousPage: "test",
      optionsToggle: "test",
    }}
    toggleTemplate={({ first, second }: ToggleTemplateProps) => <></>}
  />
  <PFTable>Body</PFTable>
  <Popover
    shouldClose={(foo, event) => handler(foo, event)}
    shouldOpen={(fn) => openHandler(fn)}
  />
  <Popover reference alertSeverityVariant='default' />
  <Popper popperMatchesTriggerWidth={false} />
  <ProgressStep />
  <Radio onChange={(foo, event) => handler(foo, event)} />
  <Select onToggle={} />
  <Select variant={SelectVariant.single}>
    <SelectOpt />
  </Select>
  <Select variant='typeahead' />
  <SelectOption hasCheck itemId='test' />
  <SelectToggle onToggle={} />
  <Slider onChange={(foo) => handler(foo)} />
  <Spinner isSVG />
  <Switch onChange={(foo) => handler(foo)} />
  <Table rows={[]} />
  <Table>
    <TableHeader />
    <TableBody />
  </Table>
  <TableComposable hasSelectableRowCaption />
  <Tabs onToggle={(foo) => handler(foo)} />
  <Td select={tdSelectTypeObj} actions={{ disable: false }} />
  <TextArea isReadOnly isIconSprite />
  <TextArea onChange={(foo, event) => handler(foo, event)} />
  <TextInput
    isReadOnly
    isIconSprite
    iconVariant
    customIconUrl
    customIconDimensions
  />
  <TextInput onChange={(foo, event) => handler(foo, event)} />
  <Toggle isPrimary onToggle={} />
  <ToggleGroupItem onChange={(foo, event) => handler(foo, event)} />
  <Tooltip />
  <Tooltip reference />
  <Tooltip triggerRef={ref} />
  <Tr isHoverable />
  <TreeView hasCheck />
  <Wizard />
  <Wizard mainAriaLabel />
  <Wizard mainAriaLabelledBy />
  <WizardBodyNext />
  <WizardBodyNext aria-label />
  <WizardBodyNext aria-labelledby />
</>;

export {
  AccordionExpandedContentBody as CustomAccordion,
  BackgroundImageSrcMap as CustomBackgroundImageSrcMap,
  EmptyStatePrimary as CustomESPrimary,
  EmptyStateSecondaryActions as CustomESSecondaryActions,
  KEY_CODES as CustomKeyCodes,
  MenuInput as CustomMenuInput,
  ApplicationLauncher as CustomAppLauncher,
  ContextSelector as CustomContext,
  Dropdown as CustomDropdown,
  OptionsMenu as CustomOptionsMenu,
  PageHeader as CustomPageHeader,
  Select as CustomSelect,
  Wizard as CustomWizard,
} from "@patternfly/react-core";

export {
  Table as CustomTable,
  TableComposable as CustomComposableTable,
} from "@patternfly/react-table";

export { Select as CustomNextSelect } from "@patternfly/react-core/next";
