import { UnavailableContent } from "@patternfly/react-component-groups";

export const ComponentGroupsUnavailableContentBodyTextPropsUpdateInput = () => (
  <>
    <UnavailableContent
      bodyText="Visit our custom status page for more info."
      statusPageLinkText="Custom status page"
    />
    <UnavailableContent bodyText="Visit our status page for known outages." />
    <UnavailableContent bodyText="Try refreshing the page. If the problem persists, contact your organization administrator or visit our status page for more info." />
  </>
);
