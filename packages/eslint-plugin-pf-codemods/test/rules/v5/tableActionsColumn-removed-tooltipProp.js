const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/tableActionsColumn-removed-tooltipProp");

ruleTester.run("tableActionsColumn-removed-tooltipProp", rule, {
  valid: [
    {
      code: `<ActionsColumn items={[{tooltipProps: {content: "test"}}]} />`,
    },
    // No @patternfly/react-table import
    {
      code: `<ActionsColumn items={[{tooltip: "test"}]} />`,
    },
  ],
  invalid: [
    // No existing tooltipProps prop
    {
      code: `import { ActionsColumn } from '@patternfly/react-table'; <ActionsColumn items={[{tooltip: "test"}]} />`,
      output: `import { ActionsColumn } from '@patternfly/react-table'; <ActionsColumn items={[{tooltipProps: { content: "test" }}]} />`,
      errors: [
        {
          message: `The "tooltip" property has been removed from ActionsColumn's "item" prop interface. Instead a "content" property should be passed into the "tooltipProps" property of the "items" interface.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Pre-existing tooltipProps prop
    {
      code: `import { ActionsColumn } from '@patternfly/react-table'; <ActionsColumn items={[{tooltip: "test", tooltipProps: {direction: "top"}}]} />`,
      output: `import { ActionsColumn } from '@patternfly/react-table'; <ActionsColumn items={[{ tooltipProps: {content: "test", direction: "top"}}]} />`,
      errors: [
        {
          message: `The "tooltip" property has been removed from ActionsColumn's "item" prop interface. Instead a "content" property should be passed into the "tooltipProps" property of the "items" interface.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Variable identifier
    {
      code: `import { ActionsColumn } from '@patternfly/react-table'; const actionItems = [{tooltip: "test"}]; <ActionsColumn items={actionItems} />`,
      output: `import { ActionsColumn } from '@patternfly/react-table'; const actionItems = [{tooltipProps: { content: "test" }}]; <ActionsColumn items={actionItems} />`,
      errors: [
        {
          message: `The "tooltip" property has been removed from ActionsColumn's "item" prop interface. Instead a "content" property should be passed into the "tooltipProps" property of the "items" interface.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Arrow function identifier
    {
      code: `import { ActionsColumn } from '@patternfly/react-table'; const actionItems = () => [{tooltip: "test"}]; <ActionsColumn items={actionItems} />`,
      output: `import { ActionsColumn } from '@patternfly/react-table'; const actionItems = () => [{tooltipProps: { content: "test" }}]; <ActionsColumn items={actionItems} />`,
      errors: [
        {
          message: `The "tooltip" property has been removed from ActionsColumn's "item" prop interface. Instead a "content" property should be passed into the "tooltipProps" property of the "items" interface.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // Variable for tooltip prop value
    {
      code: `import { ActionsColumn } from '@patternfly/react-table'; const tooltipContet = 'test'; <ActionsColumn items={[{tooltip: tooltipContent}]} />`,
      output: `import { ActionsColumn } from '@patternfly/react-table'; const tooltipContet = 'test'; <ActionsColumn items={[{tooltipProps: { content: tooltipContent }}]} />`,
      errors: [
        {
          message: `The "tooltip" property has been removed from ActionsColumn's "item" prop interface. Instead a "content" property should be passed into the "tooltipProps" property of the "items" interface.`,
          type: "JSXOpeningElement",
        },
      ],
    },
    // JSXElement for tooltip prop value
    {
      code: `import { ActionsColumn } from '@patternfly/react-table'; <ActionsColumn items={[{tooltip: <div>Test</div>}]} />`,
      output: `import { ActionsColumn } from '@patternfly/react-table'; <ActionsColumn items={[{tooltipProps: { content: <div>Test</div> }}]} />`,
      errors: [
        {
          message: `The "tooltip" property has been removed from ActionsColumn's "item" prop interface. Instead a "content" property should be passed into the "tooltipProps" property of the "items" interface.`,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
