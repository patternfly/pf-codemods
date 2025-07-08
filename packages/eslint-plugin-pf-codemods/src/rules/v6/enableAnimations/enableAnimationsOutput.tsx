import { AlertGroup, TreeView, DualListSelector, SearchInput, FormFieldGroupExpandable } from "@patternfly/react-core";
import { Table } from "@patternfly/react-table";

export const EnableAnimationsOutput = () => (
  <>
    <AlertGroup hasAnimations isLiveRegion>
      {/* alerts */}
    </AlertGroup>
    <TreeView hasAnimations />
    <DualListSelector hasAnimations />
    <SearchInput hasAnimations />
    <FormFieldGroupExpandable hasAnimations />
    <Table hasAnimations />
  </>
); 