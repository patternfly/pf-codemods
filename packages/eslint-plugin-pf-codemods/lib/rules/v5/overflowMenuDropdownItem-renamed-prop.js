const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8359
module.exports = {
  meta: { fixable: "code" },
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
          JSXOpeningElement(node) {
            if (
              overflowDropdownItemImport
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const indexProp = node.attributes.find(
                (attr) => attr.name && attr.name.name === "index"
              );

              if (indexProp) {
                context.report({
                  node,
                  message:
                    'The "index" prop for OverflowMenuDropdownItem has been renamed to "itemId", and its type has been updated to either a number or string.',
                  fix(fixer) {
                    return [fixer.replaceText(indexProp.name, "itemId")];
                  },
                });
              }
            }
          },
        };
  },
};
