const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/various-rename-default");

const baseMessage = "We have renamed option 'default' to 'custom' in";
const alertVariantEnumMessage = `${baseMessage} AlertVariant enum`;

const componentsAttributes = {
  Alert: "variant",
  AlertIcon: "variant",
  Modal: "titleIconVariant",
  ModalContent: "titleIconVariant",
  NotificationDrawerListItemHeader: "variant",
  Popover: "alertSeverityVariant",
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
        ModalContent,
        NotificationDrawerListItemHeader,
        Popover,
      } from "@patternfly/react-core";
      
      const variantOption = "custom";
      const alertVariantOption = AlertVariant.custom;
      
      <>
        <Alert variant={AlertVariant["custom"]}></Alert>
        <Alert variant="custom"></Alert>
        <AlertIcon variant={"custom"}></AlertIcon>
        <Modal titleIconVariant={variantOption}></Modal>
        <ModalContent titleIconVariant="custom"></ModalContent>
        <NotificationDrawerListItemHeader variant="custom"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="custom"></Popover>
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
        <ModalContent titleIconVariant="default"></ModalContent>
        <NotificationDrawerListItemHeader variant="default"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="default"></Popover>
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
        ModalContent,
        NotificationDrawerListItemHeader,
        Popover,
      } from "@patternfly/react-core";
      
      const variantOption = "default";
      const alertVariantOption = AlertVariant.default;
      
      <>
        <Alert variant={AlertVariant["default"]}></Alert>
        <Alert variant="default"></Alert>
        <AlertIcon variant={"default"}></AlertIcon>
        <Modal titleIconVariant={variantOption}></Modal>
        <ModalContent titleIconVariant="default"></ModalContent>
        <NotificationDrawerListItemHeader variant="default"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="default"></Popover>
      </>;`,
      output: `import {
        Alert,
        AlertIcon,
        AlertVariant,
        Modal,
        ModalContent,
        NotificationDrawerListItemHeader,
        Popover,
      } from "@patternfly/react-core";
      
      const variantOption = "custom";
      const alertVariantOption = AlertVariant.custom;
      
      <>
        <Alert variant={AlertVariant["custom"]}></Alert>
        <Alert variant="custom"></Alert>
        <AlertIcon variant={"custom"}></AlertIcon>
        <Modal titleIconVariant={variantOption}></Modal>
        <ModalContent titleIconVariant="custom"></ModalContent>
        <NotificationDrawerListItemHeader variant="custom"></NotificationDrawerListItemHeader>
        <Popover alertSeverityVariant="custom"></Popover>
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
