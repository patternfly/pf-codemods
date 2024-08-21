const ruleTester = require("../../ruletester");
import * as rule from "./component-groups-unavailableContent-bodyText-props-update";

const renameMessage =
  "In react-component-groups, we have replaced UnavailableContent's props `unavailableBodyPreStatusLinkText` and `unavailableBodyPostStatusLinkText` with one `bodyText` prop.";
const statusPageMessage =
  "In react-component-groups, UnavailableContent's status page link button has changed to a primary button. Consider capitalizing the `statusPageLinkText` prop.";

const defaultPreStatusText =
  "Try refreshing the page. If the problem persists, contact your organization administrator or visit our";
const defaultPostStatusText = "for known outages.";
const defaultStatusText = "status page";

ruleTester.run("componentGroupsUnavailableContentBodyTextPropsUpdate", rule, {
  valid: [
    {
      code: `<UnavailableContent unavailableBodyPreStatusLinkText="Visit our" statusPageLinkText="custom status page" unavailableBodyPostStatusLinkText="for more info." />`,
    },
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups'; <UnavailableContent someOtherProp />`,
    },
    // default import but folder not specified
    {
      code: `import UnavailableContent from '@patternfly/react-component-groups'; <UnavailableContent statusPageLinkText="custom status page" />`,
    },
  ],
  invalid: [
    // with both pre and post status link text, default statusPageLinkText
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent 
        unavailableBodyPreStatusLinkText="Visit our"
        unavailableBodyPostStatusLinkText="for more info."
      />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent 
        bodyText="Visit our ${defaultStatusText} for more info."
        
      />`,
      errors: [
        {
          message: renameMessage,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with only pre status link text, default statusPageLinkText
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent unavailableBodyPreStatusLinkText="Visit our" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent bodyText="Visit our ${defaultStatusText} ${defaultPostStatusText}" />`,
      errors: [
        {
          message: renameMessage,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with only post status link text, default statusPageLinkText
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent unavailableBodyPostStatusLinkText="for more info." />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent bodyText="${defaultPreStatusText} ${defaultStatusText} for more info." />`,
      errors: [
        {
          message: renameMessage,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with custom statusPageLinkText
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent statusPageLinkText="custom status page" />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent statusPageLinkText="Custom status page" />`,
      errors: [
        {
          message: statusPageMessage,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with custom statusPageLinkText in a variable
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups';
      const statusPageLinkText = "custom status page";
      <UnavailableContent statusPageLinkText={statusPageLinkText} />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups';
      const statusPageLinkText = "custom status page";
      <UnavailableContent statusPageLinkText="Custom status page" />`,
      errors: [
        {
          message: statusPageMessage,
          type: "JSXOpeningElement",
        },
      ],
    },
    // with both pre and post status link text, custom statusPageLinkText
    {
      code: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent 
        unavailableBodyPreStatusLinkText="Visit our"
        unavailableBodyPostStatusLinkText="for more info."
        statusPageLinkText="custom status page"
      />`,
      output: `import { UnavailableContent } from '@patternfly/react-component-groups';
      <UnavailableContent 
        bodyText="Visit our custom status page for more info."
        
        statusPageLinkText="Custom status page"
      />`,
      errors: [
        {
          message: statusPageMessage,
          type: "JSXOpeningElement",
        },
        {
          message: renameMessage,
          type: "JSXOpeningElement",
        },
      ],
    },
    // default import
    {
      code: `import UC from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent';
      <UC statusPageLinkText="custom status page" />`,
      output: `import UC from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent';
      <UC statusPageLinkText="Custom status page" />`,
      errors: [
        {
          message: statusPageMessage,
          type: "JSXOpeningElement",
        },
      ],
    },
  ],
});
