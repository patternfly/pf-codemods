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
  Card,
  DataList,
  DatePicker,
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
  Pagination,
  Popover,
  Select,
  SelectToggle,
  Spinner,
  Tabs,
  Toggle,
  Tooltip,
  TreeView,
  Wizard,
} from "@patternfly/react-core";
import { SelectOption, WizardFooter } from "@patternfly/react-core/next";

//following type of import was causing errors for rules that checked specifiers before import package
import foo from Bar;

//eslint-disable-next-line @typescript/foo

const isRead = true;
const newTheme = getCustomTheme("1", "2", "3");
<>
  <Alert aria-label='tester' />
  <Alert titleHeadingLevel={"h4"}/>
  <ApplicationLauncher onToggle={} />
  <BadgeToggle onToggle={} />
  <Button isLarge />
  <Button isSmall />
  <Chart themeVariant />
  <DataList onSelectDataListItem />
  <DatePicker />
  <DropdownItem isHovered={true} />
  <DropdownToggle isPrimary onToggle={} />
  <KebabToggle onToggle={} />
  <Label isTruncated />
  <Label />
  <MenuItem hasCheck />
  <MenuItemAction />
  <Nav flyout={"menu"} />
  <Nav variant='horizontal-subnav' />
  <NotificationBadge isRead />
  <NotificationBadge isRead={false} />
  <NotificationBadge isRead={isRead} />
  <NumberInput allowEmptyInput />
  <Pagination defaultToFullPage perPageComponent="div" titles={{
    currPage: "test",
    paginationTitle: "test",
    toFirstPage: "test",
    toLastPage: "test",
    toNextPage: "test",
    toPreviousPage: "test",
    optionsToggle: "test"
  }} />
  <Popover />
  <Select onToggle={} />
  <SelectOption hasCheck />
  <SelectToggle onToggle={} />
  <Spinner isSVG />
  <Toggle isPrimary onToggle={} />
  <TreeView hasCheck />
</>;
