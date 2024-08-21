const ruleTester = require("../../ruletester");
import * as rule from "./data-codemods-cleanup";

const message = `This rule will remove data-codemods attributes and comments, which were introduced by our codemods in order to work correctly.`;

ruleTester.run("data-codemods-cleanup", rule, {
  valid: [
    {
      code: `import { DualListSelector /* data-codemods */ } from 'somewhereElse';`,
    },
    {
      code: `import { LoginMainFooterLinksItem } from 'somewhereElse'; <LoginMainFooterLinksItem data-codemods="true" />`,
    },
  ],
  invalid: [
    {
      code: `import { DualListSelector /* data-codemods */ } from '@patternfly/react-core';`,
      output: `import { DualListSelector  } from '@patternfly/react-core';`,
      errors: [
        {
          message,
          type: "ImportSpecifier",
        },
      ],
    },
    // aliased import
    {
      code: `import { DualListSelector as DLS /* data-codemods */ } from '@patternfly/react-core';`,
      output: `import { DualListSelector as DLS  } from '@patternfly/react-core';`,
      errors: [
        {
          message,
          type: "ImportSpecifier",
        },
      ],
    },
    {
      code: `import { LoginMainFooterLinksItem } from '@patternfly/react-core'; <LoginMainFooterLinksItem data-codemods="true" />`,
      output: `import { LoginMainFooterLinksItem } from '@patternfly/react-core'; <LoginMainFooterLinksItem  />`,
      errors: [
        {
          message,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MastheadLogo } from '@patternfly/react-core'; <MastheadLogo data-codemods />`,
      output: `import { MastheadLogo } from '@patternfly/react-core'; <MastheadLogo  />`,
      errors: [
        {
          message,
          type: "JSXOpeningElement",
        },
      ],
    },
    // dist imports
    {
      code: `import { MastheadLogo } from '@patternfly/react-core/dist/esm/components/MastheadLogo'; <MastheadLogo data-codemods />`,
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/esm/components/MastheadLogo'; <MastheadLogo  />`,
      errors: [
        {
          message,
          type: "JSXOpeningElement",
        },
      ],
    },
    {
      code: `import { MastheadLogo } from '@patternfly/react-core/dist/js/components/MastheadLogo'; <MastheadLogo data-codemods />`,
      output: `import { MastheadLogo } from '@patternfly/react-core/dist/js/components/MastheadLogo'; <MastheadLogo  />`,
      errors: [
        {
          message,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with alias
    {
      code: `import { MastheadLogo as ML } from '@patternfly/react-core'; <ML data-codemods />`,
      output: `import { MastheadLogo as ML } from '@patternfly/react-core'; <ML  />`,
      errors: [
        {
          message,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
