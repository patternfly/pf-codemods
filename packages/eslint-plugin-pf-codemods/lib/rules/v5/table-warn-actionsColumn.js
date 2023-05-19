const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8629
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        if (!/@patternfly\/react-table(\/deprecated)?/.test(node.source.value)) return {};
        const { imports: tableImports }  = getFromPackage(context, '@patternfly/react-table');
        const { imports: deprecatedTableImports } = getFromPackage(context, '@patternfly/react-table/deprecated');
        const { imports: coreImports } = getFromPackage(context, '@patternfly/react-core');
        const { imports: deprecatedImports } = getFromPackage(context, '@patternfly/react-core/deprecated');
        const imports = [...coreImports, ...tableImports, ...deprecatedImports, ...deprecatedTableImports];

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
            message: "The ActionsColumn within Table now uses our new implementation of Dropdown. The action toggle should now pass a MenuToggle rather than the deprecated DropdownToggle, and direction and position properties are now passed under the ActionsColumn new popperProps property.",
          });
        }
      },
    };
  },
};
