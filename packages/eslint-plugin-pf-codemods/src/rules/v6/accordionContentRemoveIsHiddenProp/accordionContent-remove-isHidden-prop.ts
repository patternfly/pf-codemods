import { renameProps } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/9876
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    AccordionContent: {
      isHidden: {
        newName: "",
        message:
          "The `isHidden` prop has been removed from AccordionContent, as its visibility will now be set automatically based on the `isExpanded` prop on AccordionItem.",
      },
    },
  }),
};
