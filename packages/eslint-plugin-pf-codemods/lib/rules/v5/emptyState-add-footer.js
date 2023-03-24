const { getPackageImports, ensureImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const package = "@patternfly/react-core";
    const imports = getPackageImports(context, package);

    const includesEmptyState = imports.some(
      (specifier) => specifier.imported.name === "EmptyState"
    );

    const preFooterNames = ["EmptyStateBody", "EmptyStateHeader", "EmptyStateIcon", "Title"];

    const includesEmptyStateContent = imports.some((specifier) =>
      preFooterNames.includes(specifier.imported.name)
    );

    return !includesEmptyState || !includesEmptyStateContent
      ? {}
      : {
          ImportDeclaration(node) {
            ensureImports(context, node, package, ["EmptyStateFooter"]);
          },
          JSXElement(node) {
            if (node.openingElement.name?.name !== "EmptyState") {
              return {};
            }

            const getChildElementByName = (name) =>
              node.children?.find(
                (child) =>
                  child.type === "JSXElement" &&
                  child.openingElement.name?.name === name
              );

            if (getChildElementByName("EmptyStateFooter")) {
              return {};
            }

            const getLastElementBeforeFooter = () => {
              for (const name of preFooterNames) {
                const element = getChildElementByName(name);
                if (element) {
                  return element;
                }
              }
              return undefined;
            };

            const lastElementBeforeFooter = getLastElementBeforeFooter();

            if (!lastElementBeforeFooter) {
              return {};
            }

            const nothingToWrap = () => {
              const numOfElementsToWrap =
                node.children.length -
                node.children.indexOf(lastElementBeforeFooter) -
                1;

              return (
                numOfElementsToWrap === 0 ||
                (numOfElementsToWrap === 1 &&
                  node.children.at(-1).type === "JSXText" &&
                  node.children.at(-1).value.trim() === "")
              );
            };

            if (nothingToWrap()) {
              return {};
            }

            context.report({
              node,
              message:
                "EmptyStateFooter component should be added to wrap content after EmptyStateBody",
              fix(fixer) {
                return [
                  fixer.insertTextAfter(
                    lastElementBeforeFooter,
                    "<EmptyStateFooter>"
                  ),
                  fixer.insertTextAfter(
                    node.children.at(-1),
                    "</EmptyStateFooter>"
                  ),
                ];
              },
            });
          },
        };
  },
};
