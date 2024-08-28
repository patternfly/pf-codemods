import {
  DualListSelector /* data-codemods */,
  LoginMainFooterLinksItem,
  MastheadLogo,
} from "@patternfly/react-core";

export const DataCodemodsCleanupInput = () => (
  <>
    <DualListSelector />
    <LoginMainFooterLinksItem data-codemods="true" />
    <MastheadLogo data-codemods />
  </>
);
