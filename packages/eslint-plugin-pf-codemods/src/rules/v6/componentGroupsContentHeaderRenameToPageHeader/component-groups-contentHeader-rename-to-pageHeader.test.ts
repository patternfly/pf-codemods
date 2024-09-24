const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-contentHeader-rename-to-pageHeader";

const errors = [
  {
    message: `ContentHeader has been renamed to PageHeader.`,
    type: "JSXOpeningElement",
  },
];

ruleTester.run("component-groups-contentHeader-rename-to-pageHeader", rule, {
  valid: [
    // missing import
    {
      code: `<ContentHeader />`,
    },
    // import from wrong package
    {
      code: `import { ContentHeader } from '@patternfly/react-core'; <ContentHeader />`,
    },
  ],
  invalid: [
    {
      code: `import { ContentHeader } from '@patternfly/react-component-groups'; <ContentHeader />`,
      output: `import { PageHeader } from '@patternfly/react-component-groups'; <PageHeader data-codemods />`,
      errors,
    },
    // named import with alias
    {
      code: `import { ContentHeader as Header } from '@patternfly/react-component-groups'; <Header />`,
      output: `import { PageHeader as Header } from '@patternfly/react-component-groups'; <Header />`,
      errors,
    },
    // default imports
    {
      code: `import ContentHeader from '@patternfly/react-component-groups/dist/cjs/ContentHeader/index'; <ContentHeader />`,
      output: `import PageHeader from '@patternfly/react-component-groups/dist/cjs/PageHeader/index'; <PageHeader data-codemods />`,
      errors,
    },
    {
      code: `import ContentHeader from '@patternfly/react-component-groups/dist/esm/ContentHeader/index'; <ContentHeader />`,
      output: `import PageHeader from '@patternfly/react-component-groups/dist/esm/PageHeader/index'; <PageHeader data-codemods />`,
      errors,
    },
    {
      code: `import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader'; <ContentHeader />`,
      output: `import PageHeader from '@patternfly/react-component-groups/dist/dynamic/PageHeader'; <PageHeader data-codemods />`,
      errors,
    },
    // default import with name not matching the component name
    {
      code: `import Header from '@patternfly/react-component-groups/dist/dynamic/ContentHeader'; <Header />`,
      output: `import Header from '@patternfly/react-component-groups/dist/dynamic/PageHeader'; <Header />`,
      errors,
    },
  ],
});
