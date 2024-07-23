const ruleTester = require("../../ruletester");
import * as rule from "./logSnippet-rename-leftBorderVariant";

const propError = {
  message: `We've renamed leftBorderVariant prop to variant on LogSnippet component group.`,
  type: "JSXOpeningElement",
};

const enumError = {
  message: `We've replaced LogSnippetBorderVariant enum with PatternFly's AlertVariant enum.`,
  type: "MemberExpression",
};

ruleTester.run("logSnippet-rename-leftBorderVariant", rule, {
  valid: [
    {
      code: `<LogSnippet leftBorderVariant />`,
    },
    {
      code: `import { LogSnippet } from '@patternfly/react-component-groups'; <LogSnippet someOtherProp />`,
    },
    {
      code: `const borderVariant = LogSnippetBorderVariant.success`,
    },
  ],
  invalid: [
    {
      code: `import { LogSnippet } from '@patternfly/react-component-groups'; <LogSnippet leftBorderVariant="success" />`,
      output: `import { LogSnippet } from '@patternfly/react-component-groups'; <LogSnippet variant="success" />`,
      errors: [propError],
    },
    {
      code: `import LogSnippet from '@patternfly/react-component-groups/dist/cjs/LogSnippet/index'; <LogSnippet leftBorderVariant="success" />`,
      output: `import LogSnippet from '@patternfly/react-component-groups/dist/cjs/LogSnippet/index'; <LogSnippet variant="success" />`,
      errors: [propError],
    },
    {
      code: `import LogSnippet from '@patternfly/react-component-groups/dist/esm/LogSnippet/index'; <LogSnippet leftBorderVariant="success" />`,
      output: `import LogSnippet from '@patternfly/react-component-groups/dist/esm/LogSnippet/index'; <LogSnippet variant="success" />`,
      errors: [propError],
    },
    {
      code: `import LogSnippet from '@patternfly/react-component-groups/dist/dynamic/LogSnippet'; <LogSnippet leftBorderVariant="success" />`,
      output: `import LogSnippet from '@patternfly/react-component-groups/dist/dynamic/LogSnippet'; <LogSnippet variant="success" />`,
      errors: [propError],
    },
    {
      code: `import { LogSnippetBorderVariant } from '@patternfly/react-component-groups'; const value = LogSnippetBorderVariant.success`,
      output: `import { LogSnippetBorderVariant } from '@patternfly/react-component-groups'; const value = "success"`,
      errors: [enumError],
    },
    {
      code: `import { LogSnippetBorderVariant } from '@patternfly/react-component-groups'; const value = LogSnippetBorderVariant["success"]`,
      output: `import { LogSnippetBorderVariant } from '@patternfly/react-component-groups'; const value = "success"`,
      errors: [enumError],
    },
    {
      code: `import LogSnippet, { LogSnippetBorderVariant } from '@patternfly/react-component-groups/dist/dynamic/LogSnippet';
      <LogSnippet leftBorderVariant={LogSnippetBorderVariant.success} />`,
      output: `import LogSnippet, { LogSnippetBorderVariant } from '@patternfly/react-component-groups/dist/dynamic/LogSnippet';
      <LogSnippet variant={"success"} />`,
      errors: [propError, enumError],
    },
    {
      code: `import { LogSnippet, LogSnippetBorderVariant } from '@patternfly/react-component-groups';
      <LogSnippet leftBorderVariant={LogSnippetBorderVariant.success} />`,
      output: `import { LogSnippet, LogSnippetBorderVariant } from '@patternfly/react-component-groups';
      <LogSnippet variant={"success"} />`,
      errors: [propError, enumError],
    },
  ],
});
