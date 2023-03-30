const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/applicationLauncher-deprecated");

const importsToMove = [
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
      code: `import { ApplicationLauncher } from '@patternfly/deprecated';`
    }
  ],
  invalid: [
    {
      code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher />`,
      output: `import {\n\tApplicationLauncher\n} from '@patternfly/react-core/deprecated'; <ApplicationLauncher />`,
      errors: [
        {
          message: `ApplicationLauncher has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { ApplicationLauncher as PFLauncher } from '@patternfly/react-core'; <PFLauncher />`,
      output: `import {\n\tApplicationLauncher as PFLauncher\n} from '@patternfly/react-core/deprecated'; <PFLauncher />`,
      errors: [
        {
          message: `ApplicationLauncher has been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { Foo, ${importsToMove.join(', ')}, Bar } from '@patternfly/react-core';`,
      output: `import {\n\tFoo,\n\tBar\n} from '@patternfly/react-core';\nimport {\n\t${importsToMove.join(',\n\t')}\n} from '@patternfly/react-core/deprecated';`,
      errors: [
        {
          message: `${importsToMove.join(', ').replace(/, (\w+)$/, ', and $1')} have been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new Dropdown or Select implementation.`,
          type: "ImportDeclaration",
        },
      ],
    }
  ],
});
