import { PageNavigation } from "@patternfly/react-core";

export const PageNavigationRemoveComponentInput = () => (
  <div>
    <PageNavigation />
    <div>Some adjacent content</div>
    <PageNavigation>
      <div>Some internal content</div>
    </PageNavigation>
  </div>
);

export { PageNavigation } from "@patternfly/react-core";
export { PageNavigation as CustomNav };
export default PageNavigation;
