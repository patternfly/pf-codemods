import {
  LogSnippet,
  LogSnippetBorderVariant,
} from "@patternfly/react-component-groups";

export const LogSnippetRenameLeftBorderVariantInput = () => (
  <LogSnippet
    message="Failure - check logs for details"
    logSnippet="code"
    leftBorderVariant={LogSnippetBorderVariant.success}
  />
);
