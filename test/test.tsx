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
  AccordionExpandableContent,
  Alert,
  ApplicationLauncher,
  BadgeToggle,
  Button,
  CalendarMonth,
  Card,
  Checkbox,
  ClipboardCopy,
  DataList,
  DataListCheck,
  DatePicker,
  DrawerPanelContent,
  DropdownItem,
  DropdownToggle,
  FileUpload,
  KebabToggle,
  KEY_CODES,
  Label,
  MenuItem,
  MenuItemAction,
  MultipleFileUpload,
  Nav,
  NotificationBadge,
  NumberInput,
  OverflowMenuDropdownItem,
  PageGroup,
  PageNavigation,
  Pagination,
  Popper,
  Popover,
  ProgressStep,
  Select,
  SelectToggle,
  Spinner,
  Tabs,
  Toggle,
  Tooltip,
  TreeView,
  Wizard,
} from "@patternfly/react-core";
import { SelectOption, WizardBody, WizardFooter } from "@patternfly/react-core/next";

//following type of import was causing errors for rules that checked specifiers before import package
import foo from Bar;

//eslint-disable-next-line @typescript/foo

const isRead = true;
const newTheme = getCustomTheme("1", "2", "3");
<>
  <Alert aria-label='tester' />
  <Alert titleHeadingLevel={"h4"}/>
  <ApplicationLauncher onToggle={} onFavorite={(id, isFavorite) => handler(id, isFavorite)} onSearch={text => handleText(text)}/>
  <BadgeToggle onToggle={} />
  <Button isLarge />
  <Button isSmall />
  <CalendarMonth onChange={date => handleChange(date)} onMonthChange={(newDate, evt) => handleMonthChange(newDate, evt)} />
  <Card onSelectableInputChange={(label, _ev) => handler(label)} />
  <Chart themeVariant />
  <Checkbox onChange={(checked, e) => handleCheck(check, e)} />
  <ClipboardCopy onChange={(foo) => handleChange(foo)} />
  <DataList onDragStart itemOrder={['1', '2', '3']} />
  <DataList onSelectDataListItem={(id, text) => handler(id, text)} />;
  <DataListCheck onChange={(id) => handler} />
  <DatePicker />
  <DrawerPanelContent onResize={(id, width) => {}} />
  <DropdownItem isHovered={true} />
  <DropdownToggle isPrimary onToggle={} />
  <KebabToggle onToggle={} />
  <Label isTruncated />
  <Label />
  <Menu aria-label='tester' />
  <MenuItem hasCheck aria-label="tester" />
  <MenuItemAction />
  <Nav flyout={"menu"} />
  <Nav variant='horizontal-subnav' />
  <NotificationBadge isRead />
  <NotificationBadge isRead={false} />
  <NotificationBadge isRead={isRead} />
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
  }} />
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
  <WizardBody />
  <WizardBody aria-label />
  <WizardBody aria-labelledby />
</>;
