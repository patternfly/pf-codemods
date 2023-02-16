// https://github.com/patternfly/patternfly-react/pull/8629
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const TableImport = node.specifiers.find(
          (specifier) =>
            node.source.value === "@patternfly/react-table" &&
            (specifier.imported.name === "Table" || specifier.imported.name === "TableComposable")
        );

        if (TableImport) {
          context.report({
            node,
            message: "The ActionsColumn now uses the Next version of Dropdown. The action toggle should now pass a MenuToggle rather than a DropdownToggle, and direction and position properties are now passed under the new popperProps property.",
          });
        }
      },
    };
  },
};
