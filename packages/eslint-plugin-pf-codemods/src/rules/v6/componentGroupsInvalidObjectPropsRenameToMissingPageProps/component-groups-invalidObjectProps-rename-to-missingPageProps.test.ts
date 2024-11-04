const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-invalidObjectProps-rename-to-missingPageProps";

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
      const otherProps = props as InvalidObjectProps;`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups';
      const props: MissingPageProps;
      const otherProps = props as MissingPageProps;`,
        errors: [
          {
            message: `InvalidObjectProps has been renamed to MissingPageProps.`,
            type: "ImportSpecifier",
          },
          {
            message: `InvalidObjectProps has been renamed to MissingPageProps.`,
            type: "TSTypeReference",
          },
          {
            message: `InvalidObjectProps has been renamed to MissingPageProps.`,
            type: "TSTypeReference",
          },
        ],
      },
      // named import with alias
      {
        code: `import { InvalidObjectProps as InvObjProps } from '@patternfly/react-component-groups';`,
        output: `import { MissingPageProps as InvObjProps } from '@patternfly/react-component-groups';`,
        errors: [
          {
            message: `InvalidObjectProps has been renamed to MissingPageProps.`,
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
            message: `InvalidObjectProps has been renamed to MissingPageProps.`,
            type: "ImportSpecifier",
          },
        ],
      },
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/esm/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/esm/InvalidObject';`,
        errors: [
          {
            message: `InvalidObjectProps has been renamed to MissingPageProps.`,
            type: "ImportSpecifier",
          },
        ],
      },
      {
        code: `import { InvalidObjectProps } from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';`,
        output: `import { MissingPageProps } from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';`,
        errors: [
          {
            message: `InvalidObjectProps has been renamed to MissingPageProps.`,
            type: "ImportSpecifier",
          },
        ],
      },
    ],
  }
);
