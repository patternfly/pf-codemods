const ruleTester = require("../../ruletester");
import * as rule from "./kebabToggle-replace-with-menuToggle";

const message =
  "KebabToggle has been removed from PatternFly. Running the fix for this rule will update to our MenuToggle, but additional manual updates may be required.";
const menuToggleImportMessage =
  'MenuToggle must be imported from the "@patternfly/react-core" package in order to update KebabToggle.';

ruleTester.run("kebabToggle-replace-with-menuToggle", rule, {
  valid: [
    {
      code: `<KebabToggle />`,
    },
    {
      code: `import { KebabToggle } from '@patternfly/someOtherPackage'; <KebabToggle />`,
    },
    {
      code: `import { KebabToggle } from '@patternfly/someOtherPackage'; const Component = KebabToggle;`,
    },
    {
      code: `export { KebabToggle } from '@patternfly/someOtherPackage';`,
    },
    {
      code: `export { KebabToggle };`,
    },
    {
      code: `export default KebabToggle;`,
    },
  ],
  invalid: [
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated";`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; import { MenuToggle } from "@patternfly/react-core";`,
      output: `\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"; import { MenuToggle } from "@patternfly/react-core";`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; import { MenuToggle } from "@patternfly/react-core"; import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";`,
      output: ` import { MenuToggle } from "@patternfly/react-core"; import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { KebabToggle, Select } from "@patternfly/react-core/deprecated";`,
      output: `import { Select } from "@patternfly/react-core/deprecated";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";\nimport { MenuToggle } from "@patternfly/react-core";`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; <KebabToggle />`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"; <MenuToggle icon={<EllipsisVIcon aria-hidden="true" />} />`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
        {
          message,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; <KebabToggle></KebabToggle>`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"; <MenuToggle icon={<EllipsisVIcon aria-hidden="true" />}></MenuToggle>`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
        {
          message,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; <KebabToggle onToggle={someCallback} />`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"; <MenuToggle icon={<EllipsisVIcon aria-hidden="true" />} onClick={someCallback} />`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
        {
          message,
          type: "JSXElement",
        },
      ],
    },
    // The EllipsisVIcon import will be removed by no-unused-imports rule
    // Possible TODO of only importing this icon if the KebabToggle does not have an icon prop already
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; <KebabToggle icon={<SomeIcon />} />`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"; <MenuToggle icon={<SomeIcon />} />`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
        {
          message,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; const Component = KebabToggle;`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"; const Component = MenuToggle;`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
        {
          message,
          type: "Identifier",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/dist/esm/deprecated/components/Dropdown/index.js";`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/dist/js/deprecated/components/Dropdown/index.js";`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/dist/dynamic/deprecated/components/Dropdown/index.js";`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { KebabToggle } from "@patternfly/react-core/deprecated"; <Dropdown toggle={<KebabToggle onToggle={() => {}} />} />`,
      output: `import { MenuToggle } from "@patternfly/react-core";\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"; <Dropdown toggle={<MenuToggle icon={<EllipsisVIcon aria-hidden="true" />} onClick={() => {}} />} />`,
      errors: [
        {
          message,
          type: "ImportDeclaration",
        },
        {
          message,
          type: "JSXElement",
        },
      ],
    },
  ],
});
