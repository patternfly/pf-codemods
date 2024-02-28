import {
  EmptyState,
  EmptyStateHeader,
  EmptyStateIcon,
  CubesIcon
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
