const { getPackageImports, renamePropsOnNode } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9083
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const tableImports = getPackageImports(
      context,
      "@patternfly/react-table"
    ).filter((specifier) => ["Table", "Tr"].includes(specifier.imported.name));
    const deprecatedTableImports = getPackageImports(
      context,
      "@patternfly/react-table/deprecated"
    ).filter((specifier) => specifier.imported.name === "Table");

    const allTableImports = [...tableImports, ...deprecatedTableImports];

    return !allTableImports.length
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              allTableImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const getAttribute = (attributeToGet) =>
                node.attributes.find(
                  (attr) => attr.name?.name === attributeToGet
                );

              const rowsProp = getAttribute("rows");
              const isHoverableProp = getAttribute("isHoverable");

              if (rowsProp) {
                context.report({
                  node,
                  message: `The IRow interface for the "rows" prop on ${node.name?.name} has had its "isHoverable" prop renamed to "isClickable". If you are using "isHoverable" it must be updated manually.`,
                });
              }

              if (isHoverableProp) {
                renamePropsOnNode(context, tableImports, node, {
                  Tr: {
                    isHoverable: {
                      newName: "isClickable",
                      message: `The "isHoverable" prop on ${node.name?.name} has been renamed to "isClickable".`,
                    },
                  },
                });
              }
            }
          },
        };
  },
};
