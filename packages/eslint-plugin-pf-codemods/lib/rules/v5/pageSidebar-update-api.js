const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8942
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const pkg = "@patternfly/react-core";
    const pageSidebarImport = getPackageImports(context, pkg).find(
      (specifier) => specifier.imported.name === "PageSidebar"
    );

    return !pageSidebarImport
      ? {}
      : {
          ImportDeclaration(node) {
            const findImport = (importToFind) =>
              node.specifiers.find(
                (specifier) => specifier.imported.name === importToFind
              );
            if (
              node.source.value === pkg &&
              findImport("PageSidebar") &&
              !findImport("PageSidebarBody")
            ) {
              context.report({
                node,
                message:
                  "The PageSidebar API has been updated and our new PageSidebarBody sub-component should be wrapped around the PageSidebar content.",
                fix(fixer) {
                  return fixer.insertTextAfter(
                    node.specifiers.pop(),
                    ", PageSidebarBody"
                  );
                },
              });
            }
          },
          JSXOpeningElement(node) {
            if (pageSidebarImport.local.name !== node.name.name) {
              return;
            }

            const navProp = node.attributes.find(
              (attribute) => attribute.name.name === "nav"
            );

            if (navProp) {
              const otherProps = node.attributes.filter(
                (attribute) => attribute.name.name !== "nav"
              );
              const otherPropValues = otherProps
                ? otherProps
                    .map((prop) => context.getSourceCode().getText(prop))
                    .join(" ")
                : "";

              const getSidebarContent = () => {
                const navPropValue = context
                  .getSourceCode()
                  .getText(navProp.value);
                if (
                  navProp.value.type === "Literal" ||
                  navProp.value.expression.type === "JSXElement"
                ) {
                  return navPropValue.slice(1, navPropValue.length - 1);
                }

                return navPropValue;
              };

              const sidebarContent = navProp ? getSidebarContent() : "";

              context.report({
                node,
                message: `The PageSidebar API has been updated and the "nav" prop has been renamed to "children". Our new PageSidebarBody sub-component should also be wrapped around the content passed as children to PageSidebar.`,
                fix(fixer) {
                  return fixer.replaceText(
                    node,
                    `<PageSidebar ${otherPropValues} >\n<PageSidebarBody>\n${sidebarContent}\n</PageSidebarBody>\n</PageSidebar>`
                  );
                },
              });
            }
          },
        };
  },
};
