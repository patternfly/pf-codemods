const ruleTester = require("../../ruletester");
import * as rule from "./emptyStateHeader-move-into-emptyState";

ruleTester.run("emptyStateHeader-move-into-emptyState", rule, {
  valid: [
    {
      code: `<EmptyState titleText />`,
    },
    {
      code: `<EmptyState someProp />`,
    },
    {
      code: `<EmptyState><EmptyStateHeader titleText="Empty state" headingLevel="h4" icon={<EmptyStateIcon icon={CubesIcon} />} /></EmptyState>`,
    },
    {
      code: `import { EmptyState } from '@patternfly/react-core'; <EmptyState titleText="foo" icon={CubesIcon} />`,
    },
  ],
  invalid: [
    {
      // with all EmptyStateHeader props
      code: `import {
        EmptyState,
        EmptyStateHeader,
        EmptyStateIcon,
        CubesIcon
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader
            className="custom-empty-state-class"
            headingLevel="h4"
            icon={<EmptyStateIcon icon={CubesIcon} />}
            titleClassName="custom-empty-state-title-class"
            titleText="Empty state"
          />
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
        EmptyStateIcon,
        CubesIcon
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState headerClassName="custom-empty-state-class" headingLevel="h4" icon={CubesIcon} titleClassName="custom-empty-state-title-class" titleText="Empty state">
          </EmptyState>
      );
      `,
      errors: [
        {
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // without any optional EmptyStateHeader props
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader titleText="foo"/>
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState     titleText="foo">
          </EmptyState>
      );
      `,
      errors: [
        {
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // without any EmptyStateHeader props or children
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader />
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader />
        </EmptyState>
      );
      `,
      errors: [
        {
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState. You must manually supply a titleText prop, then you can rerun this codemod.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // without any EmptyStateHeader props but with children
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader>Foo bar</EmptyStateHeader>
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState     titleText="Foo bar">
          </EmptyState>
      );
      `,
      errors: [
        {
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // with both titleText and children
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader titleText="Bar">Foo</EmptyStateHeader>
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader titleText="Bar">Foo</EmptyStateHeader>
        </EmptyState>
      );
      `,
      errors: [
        {
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState. Because the children for EmptyStateHeader are now inaccessible you must remove either the children or the titleText prop, then you can rerun this codemod.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // with the color prop on the EmptyStateIcon
      code: `import {
        EmptyState,
        EmptyStateHeader,
        EmptyStateIcon,
        CubesIcon
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader titleText="Foo bar" icon={<EmptyStateIcon icon={CubesIcon} color="red" />} />
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
        EmptyStateIcon,
        CubesIcon
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState   icon={CubesIcon}  titleText="Foo bar">
          </EmptyState>
      );
      `,
      errors: [
        {
          message: `The color prop on EmptyStateIcon has been removed. We suggest using the new status prop on EmptyState to apply colors to the icon.`,
          type: "JSXElement",
        },
        {
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState.`,
          type: "JSXElement",
        },
      ],
    },
  ],
});
