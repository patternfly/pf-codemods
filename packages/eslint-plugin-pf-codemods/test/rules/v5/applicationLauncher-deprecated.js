const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/applicationLauncher-deprecated");

const specifiersToMove = [
  "ApplicationLauncherText",
  "ApplicationLauncherTextProps",
  "ApplicationLauncherSeparator",
  "ApplicationLauncherItemContext",
  "ApplicationLauncherItemProps",
  "ApplicationLauncherItem",
  "ApplicationLauncherIconProps",
  "ApplicationLauncherIcon",
  "ApplicationLauncherGroup",
  "ApplicationLauncherContext",
  "ApplicationLauncherContentProps",
  "ApplicationLauncherContent",
  "ApplicationLauncherProps",
  "ApplicationLauncher",
];

ruleTester.run("applicationLauncher-deprecated", rule, {
  valid: [
    {
      // No @patternfly/react-core import
      code: `<ApplicationLauncher />`,
    },
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core/deprecated';`,
    },
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core/dist/esm/deprecated/components/Accordion/index.js'`,
    },
    {
      code: `export { ApplicationLauncher as CustomAppLauncher } from '@patternfly/react-core/deprecated';`,
    },
    {
      code: `export { ApplicationLauncher as CustomAppLauncher } from '@patternfly/react-core/dist/esm/deprecated/components/Accordion/index.js'`,
    },
  ],
  invalid: [
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher />`,
      output: `import {\n\tApplicationLauncher\n} from '@patternfly/react-core/deprecated'; <ApplicationLauncher />`,
      errors: [
        {
          message: `ApplicationLauncher has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `export { ApplicationLauncher as CustomAppLauncher } from '@patternfly/react-core';`,
      output: `export {\n\tApplicationLauncher as CustomAppLauncher\n} from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `ApplicationLauncher has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ExportNamedDeclaration",
        },
      ],
    },
    {
      code: `import { ApplicationLauncher as PFLauncher } from '@patternfly/react-core'; <PFLauncher />`,
      output: `import {\n\tApplicationLauncher as PFLauncher\n} from '@patternfly/react-core/deprecated'; <PFLauncher />`,
      errors: [
        {
          message: `ApplicationLauncher has been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Foo, ${specifiersToMove.join(
        ", "
      )}, Bar } from '@patternfly/react-core';`,
      output: `import {\n\tFoo,\n\tBar\n} from '@patternfly/react-core';\nimport {\n\t${specifiersToMove.join(
        ",\n\t"
      )}\n} from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `${specifiersToMove
            .join(", ")
            .replace(
              /, (\w+)$/,
              ", and $1"
            )} have been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Foo, ${specifiersToMove.join(
        ", "
      )}, Bar } from '@patternfly/react-core/dist/esm/components/ApplicationLauncher/index.js';`,
      output: `import {\n\tFoo,\n\tBar\n} from '@patternfly/react-core/dist/esm/components/ApplicationLauncher/index.js';\nimport {\n\t${specifiersToMove.join(
        ",\n\t"
      )}\n} from '@patternfly/react-core/dist/esm/deprecated/components/ApplicationLauncher/index.js';`,
      errors: [
        {
          message: `${specifiersToMove
            .join(", ")
            .replace(
              /, (\w+)$/,
              ", and $1"
            )} have been deprecated. Running the fix flag will update your imports and/or exports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
