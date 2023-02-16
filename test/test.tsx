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
  Button,
  Card,
  DatePicker,
  DropdownItem,
  DropdownToggle,
  FileUpload,
  KEY_CODES,
  MenuItem,
  MenuItemAction,
  MultipleFileUpload,
  Nav,
  NotificationBadge,
  Popover,
  Spinner,
  Tabs,
  Toggle,
  Tooltip,
  TreeView,
  Wizard,
} from "@patternfly/react-core";
import { SelectOption, WizardFooter } from "@patternfly/react-core/next";

const isRead = true;
const newTheme = getCustomTheme("1", "2", "3");
<>
  <Alert aria-label='tester' />
  <Alert titleHeadingLevel={"h4"}/>
  <Button isLarge />
  <Button isSmall />
  <Chart themeVariant />
  <DatePicker />
  <DropdownItem isHovered={true} />
  <DropdownToggle isPrimary />
  <MenuItem hasCheck />
  <MenuItemAction />
  <Nav flyout={"menu"} />
  <Nav variant='horizontal-subnav' />
  <NotificationBadge isRead />
  <NotificationBadge isRead={false} />
  <NotificationBadge isRead={isRead} />
  <Popover />
  <SelectOption hasCheck />
  <Spinner isSVG />
  <Toggle isPrimary />
  <TreeView hasCheck />
</>;
