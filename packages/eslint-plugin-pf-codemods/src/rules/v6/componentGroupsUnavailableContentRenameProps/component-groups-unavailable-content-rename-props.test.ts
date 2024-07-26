const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-unavailable-content-rename-props";

const renames = [
  { oldName: "unavailableTitleText", newName: "titleText" },
  { oldName: "unavailableBodyPreStatusLinkText", newName: "preLinkBodyText" },
  { oldName: "unavailableBodyPostStatusLinkText", newName: "postLinkBodyText" },
];

const errors = renames.map(
  ({ oldName, newName }: { oldName: string; newName: string }) => ({
    message: `The \`${oldName}\` prop for UnavailableContent has been renamed to \`${newName}\`.`,
    type: "JSXOpeningElement",
  })
);

ruleTester.run("component-groups-unavailable-content-rename-props", rule, {
  valid: [
    {
      code: `<UnavailableContent unavailableTitleText />`,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups'; <UnavailableContent someOtherProp />`,
    },
  ],
  invalid: [
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups'; <UnavailableContent unavailableTitleText="foo" unavailableBodyPreStatusLinkText="bar" unavailableBodyPostStatusLinkText="bash" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups'; <UnavailableContent titleText="foo" preLinkBodyText="bar" postLinkBodyText="bash" />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups'; const foo = "foo"; const bar = "bar"; const bash = "bash"; <UnavailableContent unavailableTitleText={foo} unavailableBodyPreStatusLinkText={bar} unavailableBodyPostStatusLinkText={bash} />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups'; const foo = "foo"; const bar = "bar"; const bash = "bash"; <UnavailableContent titleText={foo} preLinkBodyText={bar} postLinkBodyText={bash} />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/js/UnavailableContent'; <UnavailableContent unavailableTitleText="foo" unavailableBodyPreStatusLinkText="bar" unavailableBodyPostStatusLinkText="bash" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/js/UnavailableContent'; <UnavailableContent titleText="foo" preLinkBodyText="bar" postLinkBodyText="bash" />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/esm/UnavailableContent'; <UnavailableContent unavailableTitleText="foo" unavailableBodyPreStatusLinkText="bar" unavailableBodyPostStatusLinkText="bash" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/esm/UnavailableContent'; <UnavailableContent titleText="foo" preLinkBodyText="bar" postLinkBodyText="bash" />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UnavailableContent unavailableTitleText="foo" unavailableBodyPreStatusLinkText="bar" unavailableBodyPostStatusLinkText="bash" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UnavailableContent titleText="foo" preLinkBodyText="bar" postLinkBodyText="bash" />`,
      errors,
    },
    {
      code: `import UC from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UC unavailableTitleText="foo" unavailableBodyPreStatusLinkText="bar" unavailableBodyPostStatusLinkText="bash" />`,
      output: `import UC from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UC titleText="foo" preLinkBodyText="bar" postLinkBodyText="bash" />`,
      errors,
    },
  ],
});
