const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/various-rename-default");

const baseMessage = "We have renamed option 'default' to 'custom' in";
const alertVariantEnumMessage = `${baseMessage} AlertVariant enum`;

const componentsAttributes = {
  Alert: "variant",
  AlertIcon: "variant",
  Modal: "titleIconVariant",
  ModalBoxTitle: "titleIconVariant",
  ModalContent: "titleIconVariant",
  NotificationDrawerListItemHeader: "variant",
  Popover: "alertSeverityVariant",
  PopoverHeader: "alertSeverityVariant",
};

const errors = Object.keys(componentsAttributes).map((key) => ({
  message: `${baseMessage} ${componentsAttributes[key]} prop of ${key} component`,
  type: "JSXOpeningElement",
}));

ruleTester.run("various-rename-default", rule, {
  valid: [
    {
      code: `import {
        Alert,
        AlertIcon,
        AlertVariant,
        Modal,
        ModalBoxTitle,
        ModalContent,
        NotificationDrawerListItemHeader,
        Popover,
        PopoverHeader,
      } from "@patternfly/react-core";
      
      const variantOption = "custom";
      const alertVariantOption = AlertVariant.custom;
      
      <>
        <Alert variant={AlertVariant["custom"]}></Alert>
        <Alert variant="custom"></Alert>
        <AlertIcon variant={"custom"}></AlertIcon>
        <Modal titleIconVariant={variantOption}></Modal>
        <ModalBoxTitle titleIconVariant="custom"></ModalBoxTitle>
        <ModalContent titleIconVariant="custom"></ModalContent>
        <NotificationDrawerListItemHeader variant="custom"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="custom"></Popover>
        <PopoverHeader alertSeverityVariant="custom"></PopoverHeader>
      </>;`,
    },
    // without import from @patternfly/react-core do not change anything
    {
      code: `const variantOption = "default";
      const alertVariantOption = AlertVariant.default;
      
      <>
        <Alert variant={AlertVariant["default"]}></Alert>
        <Alert variant="default"></Alert>
        <AlertIcon variant={"default"}></AlertIcon>
        <Modal titleIconVariant={variantOption}></Modal>
        <ModalBoxTitle titleIconVariant="default"></ModalBoxTitle>
        <ModalContent titleIconVariant="default"></ModalContent>
        <NotificationDrawerListItemHeader variant="default"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="default"></Popover>
        <PopoverHeader alertSeverityVariant="default"></PopoverHeader>
      </>;`
    }
  ],
  invalid: [
    {
      code: `import {
        Alert,
        AlertIcon,
        AlertVariant,
        Modal,
        ModalBoxTitle,
        ModalContent,
        NotificationDrawerListItemHeader,
        Popover,
        PopoverHeader,
      } from "@patternfly/react-core";
      
      const variantOption = "default";
      const alertVariantOption = AlertVariant.default;
      
      <>
        <Alert variant={AlertVariant["default"]}></Alert>
        <Alert variant="default"></Alert>
        <AlertIcon variant={"default"}></AlertIcon>
        <Modal titleIconVariant={variantOption}></Modal>
        <ModalBoxTitle titleIconVariant="default"></ModalBoxTitle>
        <ModalContent titleIconVariant="default"></ModalContent>
        <NotificationDrawerListItemHeader variant="default"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="default"></Popover>
        <PopoverHeader alertSeverityVariant="default"></PopoverHeader>
      </>;`,
      output: `import {
        Alert,
        AlertIcon,
        AlertVariant,
        Modal,
        ModalBoxTitle,
        ModalContent,
        NotificationDrawerListItemHeader,
        Popover,
        PopoverHeader,
      } from "@patternfly/react-core";
      
      const variantOption = "custom";
      const alertVariantOption = AlertVariant.custom;
      
      <>
        <Alert variant={AlertVariant["custom"]}></Alert>
        <Alert variant="custom"></Alert>
        <AlertIcon variant={"custom"}></AlertIcon>
        <Modal titleIconVariant={variantOption}></Modal>
        <ModalBoxTitle titleIconVariant="custom"></ModalBoxTitle>
        <ModalContent titleIconVariant="custom"></ModalContent>
        <NotificationDrawerListItemHeader variant="custom"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="custom"></Popover>
        <PopoverHeader alertSeverityVariant="custom"></PopoverHeader>
      </>;`,
      errors: [
        {
          message: alertVariantEnumMessage,
          type: "MemberExpression",
        },
        {
          message: alertVariantEnumMessage,
          type: "MemberExpression",
        },
        ...errors,
      ],
    },
  ],
});
