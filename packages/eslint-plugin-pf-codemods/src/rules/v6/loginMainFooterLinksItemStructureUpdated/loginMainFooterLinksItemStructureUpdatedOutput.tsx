import { LoginMainFooterLinksItem, Button } from "@patternfly/react-core";

export const LoginMainFooterLinksItemStructureUpdatedInput = () => (
  <LoginMainFooterLinksItem data-codemods="true">
    <Button
      variant="link"
      component="a"
      href="https://github.com/login"
      {...{ "aria-label": "Login with Github" }}
    >
      <i>GitHub icon</i>
    </Button>
  </LoginMainFooterLinksItem>
);
