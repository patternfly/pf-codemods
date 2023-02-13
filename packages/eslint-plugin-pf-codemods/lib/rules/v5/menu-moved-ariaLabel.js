const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8649
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const menuImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) => specifier.imported.name == "Menu");
    const getAriaLabel = (node) =>
      node.openingElement.attributes.find(
        (attr) => attr?.name?.name === "aria-label"
      );

    return menuImports.length === 0
      ? {}
      : {
          JSXElement(node) {
            const menuAriaLabel = getAriaLabel(node);

            if (
              menuImports
                .map((imp) => imp.local.name)
                .includes(node.openingElement.name.name) &&
              menuAriaLabel
            ) {
              const menuLists = node.children.filter(
                (child) => child?.openingElement?.name?.name === "MenuList"
              );

              context.report({
                node,
                message: `The aria-label prop has been removed from Menu and should be passed into MenuList instead. If using MenuGroup with the "label" prop, an aria-label on MenuList is not necessary.`,
                fix(fixer) {
                  const fixes = [];
                  fixes.push(fixer.replaceText(menuAriaLabel, ""));

                  if (
                    menuLists.length === 1 &&
                    !getAriaLabel(menuLists[0]) &&
                    getPackageImports(context, "@patternfly/react-core").filter(
                      (specifier) => specifier.imported.name == "MenuList"
                    ).length
                  ) {
                    const { range, selfClosing } = menuLists[0].openingElement;
                    const rangeToReplace = selfClosing
                      ? range[1] - 2
                      : range[1] - 1;
                    fixes.push(
                      fixer.replaceTextRange(
                        [rangeToReplace, rangeToReplace],
                        ` aria-label="${menuAriaLabel.value.value}"`
                      )
                    );
                  }
                  return fixes;
                },
              });
            }
          },
        };
  },
};
