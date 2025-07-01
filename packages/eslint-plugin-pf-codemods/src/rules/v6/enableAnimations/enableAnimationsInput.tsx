import { AlertGroup, TreeView, DualListSelector, SearchInput, FormFieldGroupExpandable } from "@patternfly/react-core";
import { Table } from "@patternfly/react-table";

export const EnableAnimationsInput = () => (
  <>
    <AlertGroup isLiveRegion>
      {/* alerts */}
    </AlertGroup>
    <TreeView />
    <DualListSelector />
    <SearchInput />
    <FormFieldGroupExpandable />
    <Table />
  </>
); 