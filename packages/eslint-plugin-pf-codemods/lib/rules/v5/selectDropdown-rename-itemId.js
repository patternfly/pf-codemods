const { getFromPackage, renamePropsOnNode } = require("../../helpers");
const renames = {
  SelectOption: {
    itemId: {
      newName: "value",
      message: (node) =>
        `itemId prop for ${node?.name?.name} has been renamed to value`,
    },
  },
  DropdownItem: {
    itemId: {
      newName: "value",
      message: (node) =>
        `itemId prop for ${node?.name?.name} has been renamed to value`,
    },
  },
};

// https://github.com/patternfly/patternfly-react/pull/9175
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const { imports: coreImports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );
    const { imports: nextImports } = getFromPackage(
      context,
      "@patternfly/react-core/next"
    );

    const selectAndDropdownImports = [...coreImports, ...nextImports].filter(
      (imp) => ["SelectOption", "DropdownItem"].includes(imp.imported?.name)
    );

    return !selectAndDropdownImports.length
      ? {}
      : {
          JSXOpeningElement(node) {
            renamePropsOnNode(context, selectAndDropdownImports, node, renames);
          },
        };
  },
};
