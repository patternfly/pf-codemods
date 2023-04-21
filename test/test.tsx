import {
  Chart,
  ChartLegend,
  DarkBlueColorTheme,
  getCustomTheme,
  getResizeObserver,
  LightBlueColorTheme,
} from "@patternfly/react-charts";
import { CodeEditor } from "@patternfly/react-code-editor";

import {
  AboutModal,
  AccordionExpandableContent,
  Alert,
  ApplicationLauncher,
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
  DropdownDirection,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary as ESP,
  EmptyStateSecondaryActions,
  EmptyStateVariant,
  ExpandableSection,
  FileUpload,
  FileUploadField,
  KebabToggle,
  KEY_CODES,
  Label,
  MenuItem,
  MenuItemAction,
  MultipleFileUpload,
  Nav,
  NotificationBadge,
  NumberInput,
  OptionsMenu,
  OptionsMenuGroup,
  OptionsMenuToggle,
  OverflowMenuDropdownItem,
  PageGroup,
  PageNavigation,
  Pagination,
  Popover,
  Popper,
  ProgressStep,
  Select,
  SelectToggle,
  Spinner,
  Tabs,
  Title,
  Toggle,
  ToggleTemplateProps,
  Tooltip,
  TreeView,
  Wizard
} from "@patternfly/react-core";
import { SelectOption, WizardBody as WizardBodyNext, WizardFooter } from "@patternfly/react-core/next";

//following type of import was causing errors for rules that checked specifiers before import package
import foo from Bar;

//eslint-disable-next-line @typescript/foo

const isRead = true;
const newTheme = getCustomTheme("1", "2", "3");
const myVariant = EmptyStateVariant.small;
<>
  <Alert aria-label='tester' />
  <Alert titleHeadingLevel={"h4"}/>
  <ApplicationLauncher onToggle={} onFavorite={(id, isFavorite) => handler(id, isFavorite)} onSearch={text => handleText(text)}/>
  <BadgeToggle onToggle={} />
  <Banner variant="danger" />
  <Button isLarge />
  <Button isSmall />
  <CalendarMonth onChange={date => handleChange(date)} onMonthChange={(newDate, evt) => handleMonthChange(newDate, evt)} />
  <Card onSelectableInputChange={(label, _ev) => handler(label)} />
  <CardHeader>
    <CardHeaderMain>Header content</CardHeaderMain>
    <CardActions className="test" hasNoOffset><Button>Card action</Button></CardActions>
  </CardHeader>
  <Chart themeVariant />
  <Checkbox onChange={(checked, e) => handleCheck(check, e)} />
  <ClipboardCopy onChange={(foo) => handleChange(foo)} />
  <ContextSelector />
  <DataList onDragStart itemOrder={['1', '2', '3']} />
  <DataList onSelectDataListItem={(id, text) => handler(id, text)} />
  <DataList selectableRow={{onChange=() => {}}} />
  <DataListCheck onChange={(id) => handler} />
  <DatePicker />
  <DrawerPanelContent onResize={(id, width) => {}} />
  <Dropdown position={DropdownPosition.right} direction={DropdownDirection.up} />
  <DropdownItem isHovered={true} />
  <DropdownToggle isPrimary onToggle={} />
  <EmptyState variant={EmptyStateVariant.large}>
    <EmptyStateIcon icon={CubesIcon} />
    <Title headingLevel="h5" size="4xl">
      Empty state
    </Title>
    <EmptyStateBody>
      Some other content.
    </EmptyStateBody>
    <ESP>
      Primary action
    </ESP>
    <EmptyStateSecondaryActions>
      Secondary Actions
    </EmptyStateSecondaryActions>
  </EmptyState>
  <EmptyStateIcon />
  <EmptyStateIcon component={Spinner} variant="container"/>
  <ExpandableSection onToggle={foo => handler(foo)} />
  <FileUploadField onTextChange={bar => textHandler(bar)} />
  <KebabToggle onToggle={} />
  <Label />
  <Label isTruncated />
  <Menu aria-label='tester' />
  <MenuItem hasCheck aria-label="tester" />
  <MenuItemAction />
  <Nav flyout={"menu"} />
  <Nav variant='horizontal-subnav' />
  <NotificationBadge isRead />
  <NotificationBadge isRead={false} />
  <NotificationBadge isRead={isRead} />
  <OptionsMenu></OptionsMenu>
  <NumberInput allowEmptyInput />
  <OverflowMenuDropdownItem index={0} />
  <PageGroup aria-label="tester" />
  <PageNavigation aria-label="tester" />
  <Pagination defaultToFullPage perPageComponent="div" titles={{
    currPage: "test",
    paginationTitle: "test",
    toFirstPage: "test",
    toLastPage: "test",
    toNextPage: "test",
    toPreviousPage: "test",
    optionsToggle: "test"
  }}
    toggleTemplate={({first, second} : ToggleTemplateProps) => <></>}
  />
  <Popover reference />
  <Popper popperMatchesTriggerWidth={false}/>
  <ProgressStep />
  <Select onToggle={} />
  <SelectOption hasCheck />
  <SelectToggle onToggle={} />
  <Spinner isSVG />
  <Toggle isPrimary onToggle={} />
  <Tooltip reference />
  <TreeView hasCheck />
  <Wizard />
  <Wizard mainAriaLabel />
  <Wizard mainAriaLabelledBy />
  <WizardBodyNext />
  <WizardBodyNext aria-label />
  <WizardBodyNext aria-labelledby />
</>
