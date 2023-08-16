const { getFromPackage, findAncestor } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9493
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");
    const chipImport = imports.find(
      (specifier) => specifier.imported.name === "Chip"
    );
    const badgeImport = imports.find(
      (specifier) => specifier.imported.name === "Badge"
    );

    return !chipImport || !badgeImport
      ? {}
      : {
          JSXElement(node) {
            if (badgeImport.local.name !== node.openingElement.name.name) {
              return;
            }

            const chipAncestor = findAncestor(
              node,
              (current) =>
                current?.openingElement?.name?.name === chipImport.local.name
            );
            const existingBadgeProp =
              chipAncestor?.openingElement?.attributes?.find(
                (attr) => attr?.name?.name === "badge"
              );

            if (chipAncestor && !existingBadgeProp) {
              context.report({
                node,
                message: `Badge components should now be passed to the "badge" prop on Chip instead of passed as children.`,
                fix(fixer) {
                  return [
                    fixer.insertTextAfter(
                      chipAncestor.openingElement.name,
                      ` badge={${context.getSourceCode().getText(node)}}`
                    ),
                    fixer.remove(node),
                  ];
                },
              });
            }
          },
        };
  },
};
