import { LoginMainFooterLinksItem } from "@patternfly/react-core";

export const LoginMainFooterLinksItemStructureUpdatedInput = () => (
  <LoginMainFooterLinksItem
    href="https://github.com/login"
    linkComponentProps={{ "aria-label": "Login with Github" }}
  >
    <i>GitHub icon</i>
  </LoginMainFooterLinksItem>
);
