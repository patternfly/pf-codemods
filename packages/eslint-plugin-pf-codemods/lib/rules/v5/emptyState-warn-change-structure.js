const { getPackageImports, ensureImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const package = "@patternfly/react-core";
    const imports = getPackageImports(context, package);

    const includesEmptyState = (arr) =>
      arr.some((specifier) => specifier.imported?.name === "EmptyState");

    const includesIconOrTitle = imports.some((specifier) =>
      ["EmptyStateIcon", "Title"].includes(specifier.imported.name)
    );

    const preFooterNames = [
      "EmptyStateBody",
      "EmptyStateHeader",
      "EmptyStateIcon",
      "Title",
    ];

    const includesEmptyStateContent = imports.some((specifier) =>
      preFooterNames.includes(specifier.imported.name)
    );

    if (!includesEmptyState(imports)) {
      return {};
    }

    return {
      ImportDeclaration(node) {
        if (includesEmptyState(node.specifiers)) {
          ensureImports(context, node, package, [
            "EmptyStateHeader",
            "EmptyStateFooter",
          ]);
        }
      },
      JSXElement(node) {
        if (node.openingElement.name?.name !== "EmptyState") {
          return;
        }

        const getChildElementByName = (name) =>
          node.children.find(
            (child) =>
              child.type === "JSXElement" &&
              child.openingElement.name?.name === name
          );

        const addHeader = () => {
          const emptyStateIcon = getChildElementByName("EmptyStateIcon");
          const title = getChildElementByName("Title");

          if (!emptyStateIcon && !title) {
            return;
          }

          const headingLevelAttribute = title
            ? title.openingElement.attributes.find(
                (attr) => attr.name?.name === "headingLevel"
              )
            : undefined;

          const getTitleText = () => {
            if (
              title.children.length === 1 &&
              title.children[0].type === "JSXText"
            ) {
              return `"${title.children[0].value.trim()}"`;
            }

            const titleChildren = title.children
              .map((child) => context.getSourceCode().getText(child).trim())
              .join("");

            return `{<>${titleChildren}</>}`;
          };

          const getHeaderText = () => {
            const icon = emptyStateIcon
              ? `icon={${context.getSourceCode().getText(emptyStateIcon)}} `
              : "";

            const titleText = title ? `titleText=${getTitleText()} ` : "";

            const headingLevel = headingLevelAttribute
              ? `${context.getSourceCode().getText(headingLevelAttribute)} `
              : "";

            return `<EmptyStateHeader ${titleText}${icon}${headingLevel}/>`;
          };

          context.report({
            node,
            message:
              "EmptyStateHeader component should be added instead of Title and EmptyStateIcon",
            fix(fixer) {
              const removeEmptyLine = () => {
                if (!emptyStateIcon) {
                  return [];
                }
                const token = context
                  .getSourceCode()
                  .getTokenAfter(emptyStateIcon);

                return token.type === "JSXText" && token.value.trim() === ""
                  ? [fixer.remove(token)]
                  : [];
              };

              return [
                fixer.insertTextAfter(node.children[0], getHeaderText()),
                ...(emptyStateIcon ? [fixer.remove(emptyStateIcon)] : []),
                ...(title ? [fixer.remove(title)] : []),
                ...removeEmptyLine(),
              ];
            },
          });
        };

        const addFooter = () => {
          if (getChildElementByName("EmptyStateFooter")) {
            return;
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
            return;
          }

          const nothingToWrap = () => {
            const numOfElementsToWrap =
              node.children.length -
              node.children.indexOf(lastElementBeforeFooter) -
              1;

            return (
              numOfElementsToWrap === 0 ||
              (numOfElementsToWrap === 1 &&
                node.children[node.children.length - 1].type === "JSXText" &&
                node.children[node.children.length - 1].value.trim() === "")
            );
          };

          if (nothingToWrap()) {
            return;
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
                  node.children[node.children.length - 1],
                  "</EmptyStateFooter>"
                ),
              ];
            },
          });
        };

        includesIconOrTitle && addHeader();
        includesEmptyStateContent && addFooter();
      },
    };
  },
};
