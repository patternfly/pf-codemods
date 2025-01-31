const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-invalidObjectProps-rename-to-missingPageProps";

const message = `InvalidObjectProps has been renamed to MissingPageProps.`;
const componentMessage = `InvalidObject has been renamed to MissingPage.`;

ruleTester.run(
  "component-groups-invalidObjectProps-rename-to-missingPageProps",
  rule,
  {
    valid: [
      // missing import
      {
        code: `const props: InvalidObjectProps;`,
      },
      // import from wrong package
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-core';`,
      },
      // import of other props
      {
        code: `import { SomeOtherProps } from '@patternfly/react-component-groups';`,
      },
    ],
    invalid: [
      {
        code: `import { InvalidObjectProps, SomethingElse } from '@patternfly/react-component-groups';
      const props: InvalidObjectProps;
      const otherProps = props as InvalidObjectProps;
      interface CustomProps extends InvalidObjectProps {};`,
        output: `import { MissingPageProps, SomethingElse } from '@patternfly/react-component-groups';
      const props: MissingPageProps;
      const otherProps = props as MissingPageProps;
      interface CustomProps extends MissingPageProps {};`,
        errors: [
          {
            message,
            type: "Identifier",
          },
          {
            message,
            type: "Identifier",
          },
          {
            message,
            type: "Identifier",
          },
          {
            message,
            type: "Identifier",
          },
        ],
      },
      // named import with alias
      {
        code: `import { InvalidObjectProps as InvObjProps } from '@patternfly/react-component-groups';
        const props: InvObjProps;`,
        output: `import { MissingPageProps as InvObjProps } from '@patternfly/react-component-groups';
        const props: InvObjProps;`,
        errors: [
          {
            message,
            type: "Identifier",
          },
        ],
      },
      // imports from dist
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/cjs/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/cjs/MissingPage';`,
        errors: [
          {
            message: componentMessage,
            type: "ImportDeclaration",
          },
          {
            message,
            type: "Identifier",
          },
        ],
      },
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/esm/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/esm/MissingPage';`,
        errors: [
          {
            message: componentMessage,
            type: "ImportDeclaration",
          },
          {
            message,
            type: "Identifier",
          },
        ],
      },
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/dynamic/MissingPage';`,
        errors: [
          {
            message: componentMessage,
            type: "ImportDeclaration",
          },
          {
            message,
            type: "Identifier",
          },
        ],
      },
    ],
  }
);
