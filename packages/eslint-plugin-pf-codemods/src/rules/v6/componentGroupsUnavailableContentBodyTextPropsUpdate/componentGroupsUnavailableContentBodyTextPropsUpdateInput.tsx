import { UnavailableContent } from "@patternfly/react-component-groups";

export const ComponentGroupsUnavailableContentBodyTextPropsUpdateInput = () => (
  <>
    <UnavailableContent
      unavailableBodyPreStatusLinkText="Visit our"
      unavailableBodyPostStatusLinkText="for more info."
      statusPageLinkText="custom status page"
    />
    <UnavailableContent unavailableBodyPreStatusLinkText="Visit our" />
    <UnavailableContent unavailableBodyPostStatusLinkText="for more info." />
  </>
);
