const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/inputGroup-add-inputGroupItem");

ruleTester.run("inputGroup-add-inputGroupItem", rule, {
  valid: [
    {
      code: `import { InputGroup, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem></InputGroupItem></InputGroup>`,
    },
    // no @patternfly/react-core import
    {
      code: `<InputGroup><input /></InputGroup>`,
    },
  ],
  invalid: [
    // Child that is not input-like or an InputGroupText
    {
      code: `import { InputGroup } from '@patternfly/react-core'; <InputGroup><button /></InputGroup>`,
      output: `import { InputGroup, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem><button /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
    // Child that is input-like, e.g. textarea, input, TextInput, or TextArea
    {
      code: `import { InputGroup } from '@patternfly/react-core'; <InputGroup><input /></InputGroup>`,
      output: `import { InputGroup, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill><input /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { InputGroup } from '@patternfly/react-core'; <InputGroup><textarea /></InputGroup>`,
      output: `import { InputGroup, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill><textarea /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { InputGroup, TextInput } from '@patternfly/react-core'; <InputGroup><TextInput /></InputGroup>`,
      output: `import { InputGroup, TextInput, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill><TextInput /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { InputGroup, TextArea } from '@patternfly/react-core'; <InputGroup><TextArea /></InputGroup>`,
      output: `import { InputGroup, TextArea, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill><TextArea /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
    // Child that is InputGroupText
    {
      code: `import { InputGroup, InputGroupText } from '@patternfly/react-core'; <InputGroup><InputGroupText /></InputGroup>`,
      output: `import { InputGroup, InputGroupText, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isBox><InputGroupText /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
    // Imports from dist
    {
      code: `import { InputGroup } from '@patternfly/react-core/dist/esm/components/InputGroup/index.js'; <InputGroup><button /></InputGroup>`,
      output: `import { InputGroup, InputGroupItem } from '@patternfly/react-core/dist/esm/components/InputGroup/index.js'; <InputGroup><InputGroupItem><button /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
    // Aliased imports
    {
      code: `import { InputGroup as PFInputGroup } from '@patternfly/react-core'; <PFInputGroup><button /></PFInputGroup>`,
      output: `import { InputGroup as PFInputGroup, InputGroupItem } from '@patternfly/react-core'; <PFInputGroup><InputGroupItem><button /></InputGroupItem></PFInputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Each child passed to PFInputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
