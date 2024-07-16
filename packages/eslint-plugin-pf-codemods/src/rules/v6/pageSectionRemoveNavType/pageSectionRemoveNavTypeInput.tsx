import { PageSection, PageSectionTypes } from "@patternfly/react-core";

const chosenType = PageSectionTypes.nav;

export const PageSectionRemoveNavTypeInput = () => (
  <>
    <PageSection type='nav' />
    <PageSection type={PageSectionTypes.nav} />
    <PageSection type={chosenType} />
  </>
);
