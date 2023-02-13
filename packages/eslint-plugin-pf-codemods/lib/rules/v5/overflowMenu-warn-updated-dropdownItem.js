const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8359
module.exports = {
  meta: {},
  create: function (context) {
    const overflowDropdownItemImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter(
      (specifier) => specifier.imported.name == "OverflowMenuDropdownItem"
    );

    return !overflowDropdownItemImport.length
      ? {}
      : {
          ImportDeclaration(node) {
            if (
              node.specifiers.filter((specifier) =>
                overflowDropdownItemImport
                  .map((imp) => imp.local.name)
                  .includes(specifier.imported.name)
              ).length
            ) {
              context.report({
                node,
                message:
                  "OverflowMenuDropdownItem now uses the Next implementation of DropdownItem and DropdownItemProps internally, and may require updating selectors for tests. Any other Dropdown componments used to build an OverflowMenu should also use the Next Dropdown components.",
              });
            }
          },
        };
  },
};
