import { PageBreadcrumb, PageSection } from "@patternfly/react-core";

export const PageBreadcrumbAndSectionWarnUpdatedWrapperLogicInput = () => (
  <>
    <PageBreadcrumb hasBodyWrapper isWidthLimited />
    <PageBreadcrumb hasBodyWrapper={someVar} isWidthLimited={someVar} />
    <PageBreadcrumb hasBodyWrapper={() => someCallback()} isWidthLimited={() => someCallback()} />
    <PageSection hasBodyWrapper isWidthLimited />
    <PageSection hasBodyWrapper={someVar} isWidthLimited={someVar} />
    <PageSection hasBodyWrapper={() => someCallback()} isWidthLimited={() => someCallback()} />
  </>
);
