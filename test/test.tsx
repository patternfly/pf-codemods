import {
  Chart,
  ChartLegend,
  getCustomTheme,
  
  LightBlueColorTheme,
} from "@patternfly/react-charts";
import {getResizeObserver} from '@patternfly/react-core';
import { CodeEditor } from "@patternfly/react-code-editor";
import {
  AccordionExpandableContent,
  Alert,
  ApplicationLauncher,
  Button,
  Card,
  DataList,
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
  NumberInput,
  Pagination,
  Popover,
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
const newTheme = getCustomTheme("1", "3");
<>
  <Alert  />
  <Alert component={"h4"}/>
  <Button size="lg" />
  <Button size="sm" />
  <Chart />
  <DataList  />
  <DatePicker />
  <DropdownItem  />
  <DropdownToggle toggleVariant="primary" />
  <MenuItem hasCheckbox />
  <MenuItemAction />
  <Nav flyout={"menu"} />
  <Nav variant='horizontal-subnav' />
  <NotificationBadge variant="read" />
  <NotificationBadge variant="unread" />
  <NotificationBadge variant={isRead ? "read" : "unread"} />
  <NumberInput  />
  <Pagination isLastFullPageShown  titles={{
    currPageAriaLabel: "test",
    paginationAriaLabel: "test",
    toFirstPageAriaLabel: "test",
    toLastPageAriaLabel: "test",
    toNextPageAriaLabel: "test",
    toPreviousPageAriaLabel: "test",
    optionsToggleAriaLabel: "test"
  }} />
  <Popover />
  <SelectOption hasCheckbox />
  <Spinner  />
  <Toggle toggleVariant="primary" />
  <TreeView hasCheckbox />
</>;
