import { AlertGroup, TreeView, DualListSelector, SearchInputExpandable, FormFieldGroupExpandable } from "@patternfly/react-core";
import { Table } from "@patternfly/react-table";

export const EnableAnimationsInput = () => (
  <>
    <AlertGroup isLiveRegion>
      {/* alerts */}
    </AlertGroup>
    <TreeView />
    <DualListSelector />
    <DualListSelector isTree />
    <DualListSelector isTree={true} />
    <DualListSelector isTree={false} />
    <SearchInputExpandable />
    <FormFieldGroupExpandable />
    <Table />
  </>
); 