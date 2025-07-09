import { AlertGroup, TreeView, DualListSelector, SearchInputExpandable, FormFieldGroupExpandable } from "@patternfly/react-core";
import { Table } from "@patternfly/react-table";

export const EnableAnimationsOutput = () => (
  <>
    <AlertGroup hasAnimations isLiveRegion>
      {/* alerts */}
    </AlertGroup>
    <TreeView hasAnimations />
    <DualListSelector />
    <DualListSelector isTree hasAnimations />
    <DualListSelector isTree={true} hasAnimations />
    <DualListSelector isTree={false} />
    <SearchInputExpandable hasAnimations />
    <FormFieldGroupExpandable hasAnimations />
    <Table hasAnimations />
  </>
); 