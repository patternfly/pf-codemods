import { ToolbarLabelGroupContent } from "@patternfly/react-core";

const Component = ToolbarLabelGroupContent;
export const ToolbarChipGroupContentRenameComponentInput = () => (
  <>
    <ToolbarLabelGroupContent></ToolbarLabelGroupContent>
    <ToolbarLabelGroupContent />
    <Component />
  </>
);

export { ToolbarLabelGroupContent as CustomThing };
