import {
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  CubesIcon,
  Title,
} from "@patternfly/react-core";

export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState  headingLevel="h4" icon={CubesIcon}  titleText="Empty state">
    </EmptyState>
);

export const EmptyStateWithoutHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState titleText={<Title headingLevel="h4" size="lg">
      Foo
    </Title>} icon={CubesIcon}>
    <EmptyStateBody>Body</EmptyStateBody>
  </EmptyState>
);
