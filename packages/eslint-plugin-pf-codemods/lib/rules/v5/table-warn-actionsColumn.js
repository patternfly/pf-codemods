const { getPackageImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8629
module.exports = {
  create: function (context) {
    return {
      Program(node) {
        const coreImports = getPackageImports(context, '@patternfly/react-core');
        const tableImports = getPackageImports(context, '@patternfly/react-table');
        const imports = [...coreImports, ...tableImports];

        const tableImport = imports.find(
          (specifier) =>
            (specifier.imported.name === "Table" || specifier.imported.name === "TableComposable")
        );

        const dropdownToggleImport = imports.find(
          (specifier) =>
            (specifier.imported.name === "DropdownToggle")
        );

        const actionsColumnImport = imports.find(
          (specifier) =>
            (specifier.imported.name === "ActionsColumn")
        );

        if (tableImport && (dropdownToggleImport || actionsColumnImport)) {
          context.report({
            node,
            message: "The ActionsColumn now uses the Next version of Dropdown. The action toggle should now pass a MenuToggle rather than a DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.",
          });
        }
      },
    };
  },
};
