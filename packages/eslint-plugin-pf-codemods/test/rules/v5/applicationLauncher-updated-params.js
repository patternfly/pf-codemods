const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/applicationLauncher-updated-params");
const propNames = ["onFavorite", "onSearch"];

propNames.forEach((prop) => {
  ruleTester.run("applicationLauncher-updated-params", rule, {
    valid: [
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher />;`,
      },
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher ${prop}={() => handler()} />;`,
      },
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; const handler = () => {}; <ApplicationLauncher ${prop}={handler} />;`,
      },
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; function handler() {}; <ApplicationLauncher ${prop}={handler} />;`,
      },
      {
        // No @patternfly/react-core import
        code: `<ApplicationLauncher ${prop} />;`,
      },
    ],
    invalid: [
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher ${prop}={(id) => handler(id)} />;`,
        output: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher ${prop}={(_event, id) => handler(id)} />;`,
        errors: [
          {
            message: `The "${prop}" prop for ApplicationLauncher has been updated to include the "_event" parameter as its first parameter. "${prop}" handlers may require an update.`,
            type: "JSXOpeningElement",
          },
        ],
      },
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher ${prop}={id => handler(id)} />;`,
        output: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher ${prop}={(_event, id) => handler(id)} />;`,
        errors: [
          {
            message: `The "${prop}" prop for ApplicationLauncher has been updated to include the "_event" parameter as its first parameter. "${prop}" handlers may require an update.`,
            type: "JSXOpeningElement",
          },
        ],
      },
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; const handler = (id) => {}; <ApplicationLauncher ${prop}={handler} />;`,
        output: `import { ApplicationLauncher } from '@patternfly/react-core'; const handler = (_event, id) => {}; <ApplicationLauncher ${prop}={handler} />;`,
        errors: [
          {
            message: `The "${prop}" prop for ApplicationLauncher has been updated to include the "_event" parameter as its first parameter. "${prop}" handlers may require an update.`,
            type: "JSXOpeningElement",
          },
        ],
      },
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; function handler(id) {}; <ApplicationLauncher ${prop}={handler} />;`,
        output: `import { ApplicationLauncher } from '@patternfly/react-core'; function handler(_event, id) {}; <ApplicationLauncher ${prop}={handler} />;`,
        errors: [
          {
            message: `The "${prop}" prop for ApplicationLauncher has been updated to include the "_event" parameter as its first parameter. "${prop}" handlers may require an update.`,
            type: "JSXOpeningElement",
          },
        ],
      },
      {
        code: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher ${prop}={this.handler} />;`,
        output: `import { ApplicationLauncher } from '@patternfly/react-core'; <ApplicationLauncher ${prop}={this.handler} />;`,
        errors: [
          {
            message: `The "${prop}" prop for ApplicationLauncher has been updated to include the "_event" parameter as its first parameter. "${prop}" handlers may require an update.`,
            type: "JSXOpeningElement",
          },
        ],
      },
      {
        code: `import { ApplicationLauncher as PFApplicationLauncher } from '@patternfly/react-core'; <PFApplicationLauncher ${prop}={(id) => handler(id)} />;`,
        output: `import { ApplicationLauncher as PFApplicationLauncher } from '@patternfly/react-core'; <PFApplicationLauncher ${prop}={(_event, id) => handler(id)} />;`,
        errors: [
          {
            message: `The "${prop}" prop for PFApplicationLauncher has been updated to include the "_event" parameter as its first parameter. "${prop}" handlers may require an update.`,
            type: "JSXOpeningElement",
          },
        ],
      },
    ],
  });
});
