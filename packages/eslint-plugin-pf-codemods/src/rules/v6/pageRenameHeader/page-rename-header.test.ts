const ruleTester = require('../../ruletester');
import * as rule from './page-rename-header';

const error = {
  message: `header prop for Page has been renamed to masthead`,
  type: 'JSXOpeningElement',
};

ruleTester.run('page-rename-header', rule, {
  valid: [
    {
      code: `<Page header />`,
    },
    {
      code: `import { Page } from '@patternfly/react-core'; <Page someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { Page } from '@patternfly/react-core'; <Page header={<Masthead />} />`,
      output: `import { Page } from '@patternfly/react-core'; <Page masthead={<Masthead />} />`,
      errors: [error],
    },
    {
      code: `import { Page as CustomPage } from '@patternfly/react-core'; <CustomPage header={<Masthead />} />`,
      output: `import { Page as CustomPage } from '@patternfly/react-core'; <CustomPage masthead={<Masthead />} />`,
      errors: [
        {
          message: `header prop for CustomPage has been renamed to masthead`,
          type: 'JSXOpeningElement',
        },
      ],
    },
    {
      code: `import { Page } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <Page header={<Masthead />} />`,
      output: `import { Page } from '@patternfly/react-core/dist/esm/components/Page/index.js'; <Page masthead={<Masthead />} />`,
      errors: [error],
    },
    {
      code: `import { Page } from '@patternfly/react-core/dist/js/components/Page/index.js'; <Page header={<Masthead />} />`,
      output: `import { Page } from '@patternfly/react-core/dist/js/components/Page/index.js'; <Page masthead={<Masthead />} />`,
      errors: [error],
    },
    {
      code: `import { Page } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <Page header={<Masthead />} />`,
      output: `import { Page } from '@patternfly/react-core/dist/dynamic/components/Page/index.js'; <Page masthead={<Masthead />} />`,
      errors: [error],
    },
  ],
});
