import {
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  CubesIcon,
  Title,
} from "@patternfly/react-core";

export const EmptyStateHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState>
    <EmptyStateHeader
      titleText="Empty state"
      headingLevel="h4"
      icon={<EmptyStateIcon icon={CubesIcon} />}
    />
  </EmptyState>
);

export const EmptyStateWithoutHeaderMoveIntoEmptyStateInput = () => (
  <EmptyState>
    <Title headingLevel="h4" size="lg">
      Foo
    </Title>
    <EmptyStateIcon icon={CubesIcon} />
    <EmptyStateBody>Body</EmptyStateBody>
  </EmptyState>
);

export const EmptyStateHeaderWithoutTitleTextMoveIntoEmptyStateInput = () => (
  <EmptyState>
    <EmptyStateHeader
      className="some-class"
      icon={<EmptyStateIcon icon={CubesIcon} />}
    />
  </EmptyState>
);

export const EmptyStateWithoutHeaderAndTitleTextMoveIntoEmptyStateInput =
  () => (
    <EmptyState>
      <EmptyStateIcon icon={CubesIcon} />
      <EmptyStateBody>Body</EmptyStateBody>
    </EmptyState>
  );
