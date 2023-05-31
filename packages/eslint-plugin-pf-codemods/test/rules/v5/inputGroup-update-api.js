const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/inputGroup-update-api");

ruleTester.run("inputGroup-update-api", rule, {
  valid: [
    {
      code: `import { InputGroup, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem><input /></InputGroupItem></InputGroup>`,
    },
    {
      code: `import { InputGroup, InputGroupText } from '@patternfly/react-core'; <InputGroup><InputGroupText>Some text</InputGroupText></InputGroup>`,
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
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
          type: "JSXElement",
        },
      ],
    },
    // Child that is input-like, e.g. textarea, input, TextInput, or TextArea
    {
      code: `import { InputGroup } from '@patternfly/react-core'; <InputGroup><input /></InputGroup>`,
      output: `import { InputGroup, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill ><input /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { InputGroup } from '@patternfly/react-core'; <InputGroup><textarea /></InputGroup>`,
      output: `import { InputGroup, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill ><textarea /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { InputGroup, TextInput } from '@patternfly/react-core'; <InputGroup><TextInput /></InputGroup>`,
      output: `import { InputGroup, TextInput, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill ><TextInput /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { InputGroup, TextArea } from '@patternfly/react-core'; <InputGroup><TextArea /></InputGroup>`,
      output: `import { InputGroup, TextArea, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill ><TextArea /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
          type: "JSXElement",
        },
      ],
    },
    // InputGroupText child and non-InputGroupText child
    {
      code: `import { InputGroup, InputGroupText } from '@patternfly/react-core'; <InputGroup><InputGroupText>Some text</InputGroupText><button /></InputGroup>`,
      output: `import { InputGroup, InputGroupText, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupText>Some text</InputGroupText><InputGroupItem><button /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
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
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
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
          message: `Any non-InputGroupText child passed to PFInputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
          type: "JSXElement",
        },
      ],
    },
    {
      code: `import { InputGroup, TextArea as PFTA } from '@patternfly/react-core'; <InputGroup><PFTA /></InputGroup>`,
      output: `import { InputGroup, TextArea as PFTA, InputGroupItem } from '@patternfly/react-core'; <InputGroup><InputGroupItem isFill ><PFTA /></InputGroupItem></InputGroup>`,
      errors: [
        {
          message: `add missing import InputGroupItem from @patternfly/react-core`,
          type: "ImportDeclaration",
        },
        {
          message: `Any non-InputGroupText child passed to InputGroup must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
