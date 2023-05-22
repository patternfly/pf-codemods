const {
  getFromPackage,
  ensureImports,
  getAllJSXElements,
  pfPackageMatches,
} = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const pkg = "@patternfly/react-core";
    const { imports } = getFromPackage(context, pkg);

    const includesEmptyState = (arr) =>
      arr.some((specifier) => specifier.imported?.name === "EmptyState");

    const titleImport = imports.find(
      (specifier) => specifier.imported.name === "Title"
    );

    const getChildElementByName = (name, node) =>
      node.children.find(
        (child) =>
          child.type === "JSXElement" &&
          child.openingElement.name?.name === name
      );

    const allElements = getAllJSXElements(context);

    const emptyStateElements = allElements.filter(
      (elem) => elem.openingElement?.name?.name === "EmptyState"
    );

    const includesHeader = allElements.some(
      (elem) => elem.openingElement?.name?.name === "EmptyStateHeader"
    );

    const includesFooter = allElements.some(
      (elem) => elem.openingElement?.name?.name === "EmptyStateFooter"
    );

    const emptyStatesThatShouldAddHeader = emptyStateElements.filter(
      (emptyState) =>
        emptyState.children?.some((child) =>
          ["Title", "EmptyStateIcon"].includes(child.openingElement?.name?.name)
        )
    );

    const preFooterNames = [
      "EmptyStateBody",
      "EmptyStateHeader",
      "Title",
      "EmptyStateIcon",
    ];

    const getLastElementBeforeFooter = (node) => {
      for (const name of preFooterNames) {
        const element = getChildElementByName(name, node);
        if (element) {
          return element;
        }
      }
      return undefined;
    };

    const hasContentToWrapInFooter = (node, lastElementBeforeFooter) => {
      const numOfElementsToWrap =
        node.children.length -
        node.children.indexOf(lastElementBeforeFooter) -
        1;

      const lastChild = node.children[node.children.length - 1];

      return (
        numOfElementsToWrap > 1 ||
        (numOfElementsToWrap === 1 &&
          (lastChild.type !== "JSXText" || lastChild.value.trim() !== ""))
      );
    };

    const emptyStatesThatShouldAddFooter = emptyStateElements
      .filter((node) => !getChildElementByName("EmptyStateFooter", node))
      .map((node) => ({
        node,
        lastElementBeforeFooter: getLastElementBeforeFooter(node),
      }))
      .filter(
        ({ node, lastElementBeforeFooter }) =>
          lastElementBeforeFooter &&
          hasContentToWrapInFooter(node, lastElementBeforeFooter)
      );

    const allTitlesWillBeReplaced = () =>
      allElements
        .filter((elem) => elem.openingElement?.name?.name === "Title")
        .every(
          (elem) =>
            elem.parent.type === "JSXElement" &&
            elem.parent.openingElement?.name?.name === "EmptyState"
        );

    if (!includesEmptyState(imports)) {
      return {};
    }

    return {
      ImportDeclaration(node) {
        if (!pfPackageMatches(pkg, node.source.value) || !includesEmptyState(node.specifiers)) {
          return;
        }

        ensureImports(context, node, pkg, [
          ...(emptyStatesThatShouldAddHeader.length || includesHeader
            ? ["EmptyStateHeader"]
            : []),
          ...(emptyStatesThatShouldAddFooter.length || includesFooter
            ? ["EmptyStateFooter"]
            : []),
        ]);
      },
      JSXElement(node) {
        if (node.openingElement.name?.name !== "EmptyState") {
          return;
        }

        const addHeader = () => {
          const emptyStateIcon = getChildElementByName("EmptyStateIcon", node);
          const title = getChildElementByName("Title", node);

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
              "We've added an EmptyStateHeader sub-component which should be used instead of passing Title and EmptyStateIcon directly as children to EmptyState.",
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

              const getImportEndRange = (imp) => {
                const nextComma = context.getSourceCode().getTokenAfter(imp);

                return context.getSourceCode().getText(nextComma) === ","
                  ? context.getSourceCode().getTokenAfter(nextComma).range[0]
                  : imp.range[1];
              };

              return [
                fixer.insertTextAfter(emptyStateIcon ?? title, getHeaderText()),
                ...(emptyStateIcon ? [fixer.remove(emptyStateIcon)] : []),
                ...(title ? [fixer.remove(title)] : []),
                ...removeEmptyLine(),
                ...(titleImport && allTitlesWillBeReplaced()
                  ? [
                      fixer.removeRange([
                        titleImport.range[0],
                        getImportEndRange(titleImport),
                      ]),
                    ]
                  : []),
              ];
            },
          });
        };

        const addFooter = (lastElementBeforeFooter) => {
          context.report({
            node,
            message:
              "We've added the EmptyStateFooter sub-component, which should be added to wrap content after EmptyStateBody.",
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

        emptyStatesThatShouldAddHeader.includes(node) && addHeader();
        const value = emptyStatesThatShouldAddFooter.find(
          (value) => value.node === node
        );
        value && addFooter(value.lastElementBeforeFooter);
      },
    };
  },
};
