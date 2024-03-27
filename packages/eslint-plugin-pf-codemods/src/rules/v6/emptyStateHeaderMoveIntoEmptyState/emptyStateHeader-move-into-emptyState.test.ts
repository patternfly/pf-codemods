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
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState. You must manually supply a titleText prop to EmptyState, then you can rerun this codemod.`,
          type: "JSXElement",
        },
      ],
    },
    {
      // without any EmptyStateHeader props but with children as text
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
      // without any EmptyStateHeader props but with children as single JSXElement
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader>
            <h1>Foo bar</h1>
          </EmptyStateHeader>
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState     titleText={<h1>Foo bar</h1>}>
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
      // without any EmptyStateHeader props but with children as single JSXExpressionContainer
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      const title = "Some title";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader>
            {title}
          </EmptyStateHeader>
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      const title = "Some title";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState     titleText={title}>
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
      // without any EmptyStateHeader props but with children consisting of multiple elements
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      const title = "Some title";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader>
            {title} followed by some text
          </EmptyStateHeader>
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      const title = "Some title";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState     titleText={<>
            {title} followed by some text
          </>}>
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
      // without an EmptyStateHeader or titleText
      code: `import { EmptyState } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          Foo bar
        </EmptyState>
      );
      `,
      output: `import { EmptyState } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          Foo bar
        </EmptyState>
      );
      `,
      errors: [
        {
          message: `EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState. You must manually supply a titleText prop to EmptyState.`,
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
    {
      // with a string expression for the heading className prop
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader titleText="foo" className={"class-name"} />
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState headerClassName={"class-name"}    titleText="foo">
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
      // with icon prop value not being wrapped in EmptyStateIcon (default import)
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader
            icon={<CubesIcon />}
            titleText="Empty state"
          />
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState   icon={CubesIcon}  titleText="Empty state">
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
      // with icon prop value not being wrapped in EmptyStateIcon (classic import)
      code: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      import { CubesIcon } from '@patternfly/react-icons';
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState>
          <EmptyStateHeader
            icon={<CubesIcon />}
            titleText="Empty state"
          />
        </EmptyState>
      );
      `,
      output: `import {
        EmptyState,
        EmptyStateHeader,
      } from "@patternfly/react-core";

      import { CubesIcon } from '@patternfly/react-icons';
      
      export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
        <EmptyState   icon={CubesIcon}  titleText="Empty state">
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
  ],
});
