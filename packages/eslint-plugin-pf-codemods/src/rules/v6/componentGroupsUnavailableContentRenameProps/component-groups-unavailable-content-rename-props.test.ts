const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-unavailable-content-rename-props";

const errors = [
  {
    message:
      "The unavailableTitleText prop for UnavailableContent has been renamed to titleText.",
    type: "JSXOpeningElement",
  },
];

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
      code: `import { UnavailableContent } from '@patternfly/react-component-groups'; <UnavailableContent unavailableTitleText="foo" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups'; <UnavailableContent titleText="foo" />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups'; const foo = "foo"; <UnavailableContent unavailableTitleText={foo} />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups'; const foo = "foo"; <UnavailableContent titleText={foo} />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/js/UnavailableContent'; <UnavailableContent unavailableTitleText="foo" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/js/UnavailableContent'; <UnavailableContent titleText="foo" />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/esm/UnavailableContent'; <UnavailableContent unavailableTitleText="foo" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/esm/UnavailableContent'; <UnavailableContent titleText="foo" />`,
      errors,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UnavailableContent unavailableTitleText="foo" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UnavailableContent titleText="foo" />`,
      errors,
    },
    {
      code: `import UC from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UC unavailableTitleText="foo" />`,
      output: `import UC from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent'; <UC titleText="foo" />`,
      errors,
    },
  ],
});
