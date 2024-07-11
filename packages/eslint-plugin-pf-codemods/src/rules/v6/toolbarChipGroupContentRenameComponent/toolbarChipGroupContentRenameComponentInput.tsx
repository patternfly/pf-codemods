import { ToolbarChipGroupContent } from "@patternfly/react-core";

const Component = ToolbarChipGroupContent;
export const ToolbarChipGroupContentRenameComponentInput = () => (
  <>
    <ToolbarChipGroupContent></ToolbarChipGroupContent>
    <ToolbarChipGroupContent />
    <Component />
  </>
);

export { ToolbarChipGroupContent as CustomThing };
