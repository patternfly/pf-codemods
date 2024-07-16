import { PageBreadcrumb, PageSection } from "@patternfly/react-core";

export const PageBreadcrumbAndSectionWarnUpdatedWrapperLogicInput = () => (
  <>
    <PageBreadcrumb isWidthLimited />
    <PageBreadcrumb isWidthLimited={someVar} />
    <PageBreadcrumb isWidthLimited={() => someCallback()} />
    <PageSection isWidthLimited />
    <PageSection isWidthLimited={someVar} />
    <PageSection isWidthLimited={() => someCallback()} />
  </>
);
