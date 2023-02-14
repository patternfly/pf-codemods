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
  TreeView,
  Wizard,
} from "@patternfly/react-core";
import { SelectOption, WizardFooter } from "@patternfly/react-core/next";

const isRead = true;
<>
  <Alert aria-label='tester' />
  <Button isLarge />
  <Button isSmall />
  <DatePicker />
  <DropdownItem isHovered={true} />
  <DropdownToggle isPrimary />
  <MenuItem hasCheck />
  <MenuItemAction />
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
