const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-invalidObjectProps-rename-to-missingPageProps";

const message = `InvalidObjectProps has been renamed to MissingPageProps.`;

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
    ],
    invalid: [
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups';
      const props: InvalidObjectProps;
      const otherProps = props as InvalidObjectProps;
      interface CustomProps extends InvalidObjectProps {};`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups';
      const props: MissingPageProps;
      const otherProps = props as MissingPageProps;
      interface CustomProps extends MissingPageProps {};`,
        errors: [
          {
            message,
            type: "ImportSpecifier",
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
            type: "ImportSpecifier",
          },
        ],
      },
      // imports from dist
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/cjs/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/cjs/InvalidObject';`,
        errors: [
          {
            message,
            type: "ImportSpecifier",
          },
        ],
      },
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/esm/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/esm/InvalidObject';`,
        errors: [
          {
            message,
            type: "ImportSpecifier",
          },
        ],
      },
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';`,
        errors: [
          {
            message,
            type: "ImportSpecifier",
          },
        ],
      },
    ],
  }
);
