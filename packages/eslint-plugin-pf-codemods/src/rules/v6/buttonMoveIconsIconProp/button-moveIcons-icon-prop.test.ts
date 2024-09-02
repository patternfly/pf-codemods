const ruleTester = require("../../ruletester");
import * as rule from "./button-moveIcons-icon-prop";

ruleTester.run("button-moveIcons-icon-prop", rule, {
  valid: [
    {
      code: `<Button variant="plain"><span>Some icon</span></Button>`,
    },
    {
      code: `import { Button } from '@patternfly/react-core'; <Button icon={<span>Some icon</span>} />`,
    },
    // with non PF Icon child
    {
      code: `import { Button } from '@patternfly/react-core'; <Button><Icon>Some icon</Icon></Button>`,
    },
  ],
  invalid: [
    {
      code: `import { Button } from '@patternfly/react-core'; const icon = <span>Some icon</span>; <Button variant="plain">{icon}</Button>`,
      output: `import { Button } from '@patternfly/react-core'; const icon = <span>Some icon</span>; <Button icon={icon} variant="plain" />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Button } from '@patternfly/react-core'; <Button variant="plain"><span>Some icon</span></Button>`,
      output: `import { Button } from '@patternfly/react-core'; <Button icon={<span>Some icon</span>} variant="plain" />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Button, ButtonVariant } from '@patternfly/react-core'; <Button variant={ButtonVariant.plain}><span>Some icon</span></Button>`,
      output: `import { Button, ButtonVariant } from '@patternfly/react-core'; <Button icon={<span>Some icon</span>} variant={ButtonVariant.plain} />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Button as CustomThing } from '@patternfly/react-core'; <CustomThing variant="plain"><span>Some icon</span></CustomThing>`,
      output: `import { Button as CustomThing } from '@patternfly/react-core'; <CustomThing icon={<span>Some icon</span>} variant="plain" />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Button } from '@patternfly/react-core/dist/esm/components/Button/index.js'; <Button variant="plain"><span>Some icon</span></Button>`,
      output: `import { Button } from '@patternfly/react-core/dist/esm/components/Button/index.js'; <Button icon={<span>Some icon</span>} variant="plain" />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Button } from '@patternfly/react-core/dist/js/components/Button/index.js'; <Button variant="plain"><span>Some icon</span></Button>`,
      output: `import { Button } from '@patternfly/react-core/dist/js/components/Button/index.js'; <Button icon={<span>Some icon</span>} variant="plain" />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { Button } from '@patternfly/react-core/dist/dynamic/components/Button/index.js'; <Button variant="plain"><span>Some icon</span></Button>`,
      output: `import { Button } from '@patternfly/react-core/dist/dynamic/components/Button/index.js'; <Button icon={<span>Some icon</span>} variant="plain" />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    // with Icon component child
    {
      code: `import { Button, Icon } from '@patternfly/react-core'; <Button><Icon>Some icon</Icon></Button>`,
      output: `import { Button, Icon } from '@patternfly/react-core'; <Button icon={<Icon>Some icon</Icon>}></Button>`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    // with Icon component child (aliased)
    {
      code: `import { Button, Icon as PFIcon } from '@patternfly/react-core'; <Button><PFIcon>Some icon</PFIcon></Button>`,
      output: `import { Button, Icon as PFIcon } from '@patternfly/react-core'; <Button icon={<PFIcon>Some icon</PFIcon>}></Button>`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    // with react-icons icon child
    {
      code: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button><SomeIcon /></Button>`,
      output: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button icon={<SomeIcon />}></Button>`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    // with react-icons icon child and another child
    {
      code: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button>Text<SomeIcon /></Button>`,
      output: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button icon={<SomeIcon />}>Text</Button>`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    // with children prop
    {
      code: `import { Button } from '@patternfly/react-core'; <Button variant="plain" children={<span>Some icon</span>} />`,
      output: `import { Button } from '@patternfly/react-core'; <Button icon={<span>Some icon</span>} variant="plain"  />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    // with react-icons icon child in children prop (inside JSXFragment)
    {
      code: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button children={<>Text <SomeIcon /></>} />`,
      output: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button icon={<SomeIcon />} children={<>Text </>} />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
    // with react-icons icon child in children prop (inside JSXElement)
    {
      code: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button children={<span>Text <SomeIcon /></span>} />`,
      output: `import { Button } from '@patternfly/react-core'; import { SomeIcon } from "@patternfly/react-icons"; <Button icon={<SomeIcon />} children={<span>Text </span>} />`,
      errors: [
        {
          message: `Icons must now be passed to the \`icon\` prop of Button instead of as children. If you are passing anything other than an icon as children, ignore this rule when running fixes.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
