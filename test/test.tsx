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
  KebabToggle,
  KEY_CODES,
  Label,
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
  SelectOption as SelectOpt,
  SelectMenu,
  SelectGroup,
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
} from "@patternfly/react-core";
import {
  SelectOption,
  WizardBody as WizardBodyNext,
  WizardFooter,
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

const variantOption = "default";
const alertVariantOption = AlertVariant.default;
<>
  <Alert aria-label='tester' />
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
  <ContextSelector />
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
  <DualListSelector onAvailableOptionsSearchInputChanged={(foo, event) => handler(foo, event)} />
  <DualListSelector onChosenOptionsSearchInputChanged={(foo, event) => handler(foo, event)} />
  <DualListSelector onListChange={foo => handler(foo)} />
  <EmptyState variant={EmptyStateVariant.large}>
    <EmptyStateIcon icon={CubesIcon} />
    <Title headingLevel='h5' size='4xl'>
      Empty state
    </Title>
    <EmptyStateBody>Some other content.</EmptyStateBody>
    <ESP>Primary action</ESP>
    <EmptyStateSecondaryActions>Secondary Actions</EmptyStateSecondaryActions>
  </EmptyState>
  <EmptyStateIcon />
  <EmptyStateIcon component={Spinner} variant='container' />
  <ExpandableSection onToggle={(foo) => handler(foo)} />
  <FileUpload
    onDataChange={(data) => changeHandler(data)}
    onReadFailed={(error, fileHandle) => readFailedHandler(error, fileHandle)}
    onReadFinished={(fileHandle) => readFinishedHandler(fileHandle)}
    onReadStarted={(fileHandle) => readStartedHandler(fileHandle)}
  />
  <FileUploadField onTextChange={(bar) => textHandler(bar)} />
  <FormSelect onChange={(foo, event) => handler(foo, event)} />
  <FrogIcon size='sm' color='green' noVerticalAlign />
  <InputGroup>
    <input />
    <textarea />
    <TextArea />
    <TextInput />
    <InputGroupText />
    <button />
  </InputGroup>
  <KebabToggle onToggle={} />
  <Label />
  <Label isTruncated />
  <LoginPage backgroundImgAlt='tester' backgroundImgSrc={{ a: 1 }} />
  <Menu aria-label='tester' />
  <MenuItem hasCheck aria-label='tester' />
  <MenuItemAction />
  <Modal titleIconVariant={variantOption}></Modal>
  <ModalContent titleIconVariant='default'></ModalContent>
  <MultipleFileUpload onFileDrop={(foo) => handler(foo)} />
  <Nav flyout={"menu"} />
  <Nav variant='horizontal-subnav' />
  <Nav onSelect={(foo) => handler(foo)} onToggle={(foo) => handler(foo)} />
  <NotificationBadge isRead />
  <NotificationBadge isRead={false} />
  <NotificationBadge isRead={isRead} />
  <NotificationDrawerListItemHeader variant='default'></NotificationDrawerListItemHeader>
  <OptionsMenu></OptionsMenu>
  <NumberInput allowEmptyInput />
  <OverflowMenuDropdownItem index={0} />
  <Page onPageResize={({ obj }) => handler({ obj })} />
  <PageGroup aria-label="tester" />
  <PageHeader />
  <PageHeaderTools />
  <PageHeaderToolsGroup />
  <PageHeaderToolsItem />
  <PageNavigation aria-label="tester" />
  <PageSidebar isNavOpen />
  <PageSidebar nav="Content" />
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
  <Popover reference alertSeverityVariant='default' />
  <Popover
    shouldClose={(foo, event) => handler(foo, event)}
    shouldOpen={(fn) => openHandler(fn)}
  />
  <Popper popperMatchesTriggerWidth={false} />
  <ProgressStep />
  <Radio onChange={(foo, event) => handler(foo, event)} />
  <Select onToggle={} />
  <SelectOption hasCheck />
  <SelectToggle onToggle={} />
  <Slider onChange={(foo) => handler(foo)} />
  <Spinner isSVG />
  <Switch onChange={(foo) => handler(foo)} />
  <Table />
  <Table rows={[]} />
  <TableBody />
  <TableComposable />
  <TableHeader />
  <Td select={tdSelectTypeObj} actions={{ disable: false }} />
  <Td select={tdSelectTypeObj} actions={{disable: false}} />
  <TextArea onChange={(foo, event) => handler(foo, event)} />
  <TextInput onChange={(foo, event) => handler(foo, event)} />
  <Toggle isPrimary onToggle={} />
  <ToggleGroupItem onChange={(foo, event) => handler(foo, event)} />
  <Tooltip reference />
  <Tr isHoverable />
  <TreeView hasCheck />
  <Wizard />
  <Wizard mainAriaLabel />
  <Wizard mainAriaLabelledBy />
  <WizardBodyNext />
  <WizardBodyNext aria-label />
  <WizardBodyNext aria-labelledby />
</>;
