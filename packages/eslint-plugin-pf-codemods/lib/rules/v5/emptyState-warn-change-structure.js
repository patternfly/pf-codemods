const { getPackageImports, ensureImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8737
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const pkg = "@patternfly/react-core";
    const imports = getPackageImports(context, pkg);

    const includesEmptyState = (arr) =>
      arr.some((specifier) => specifier.imported?.name === "EmptyState");

    const titleImport = imports.find(
      (specifier) => specifier.imported.name === "Title"
    );

    const getElements = (baseElement, nameToGet) => {
      const elementsArray = [];

      const searchForElements = (elementToSearch, elementName) => {
        const elementObject = elementToSearch.expression ?? elementToSearch;
        if (elementObject?.openingElement?.name?.name === elementName) {
          elementsArray.push(elementObject);
        } else {
          elementObject?.children?.forEach((child) =>
            searchForElements(child, elementName)
          );
        }
      };

      searchForElements(baseElement, nameToGet);

      return elementsArray;
    };
    const allElements = context
      .getSourceCode()
      .ast.body.filter((node) => node.expression?.openingElement);

    const emptyStateElements = allElements
      .map((node) => {
        return getElements(node, "EmptyState");
      })
      .flat();

    const titleElements = allElements
      .map((node) => {
        return getElements(node, "Title");
      })
      .flat();

    const emptyStatesWithTitleOrHeader = emptyStateElements?.filter(
      (emptyState) =>
        emptyState.children?.find((child) =>
          ["Title", "EmptyStateHeader", "EmptyStateIcon"].includes(
            child.openingElement?.name?.name
          )
        )
    );

    const preFooterNames = [
      "EmptyStateBody",
      "EmptyStateHeader",
      "Title",
      "EmptyStateIcon",
    ];

    const includesEmptyStateContent = imports.some((specifier) =>
      preFooterNames.includes(specifier.imported.name)
    );

    if (!includesEmptyState(imports)) {
      return {};
    }

    return {
      importDeclaration(node) {},
      "Program:exit"() {
        const importDeclaration = context
          .getSourceCode()
          .ast.body.find(
            (node) =>
              node.type === "ImportDeclaration" &&
              node.source.value === pkg &&
              includesEmptyState(node.specifiers)
          );

        if (importDeclaration) {
          ensureImports(context, importDeclaration, pkg, [
            "EmptyStateHeader",
            "EmptyStateFooter",
          ]);
        }

        if (!titleImport || titleElements.length) {
          return;
        }

        context.report({
          node: titleImport,
          message: `unused patternfly import ${titleImport.local.name}`,
          fix(fixer) {
            const getEndRange = () => {
              const nextComma = context
                .getSourceCode()
                .getTokenAfter(titleImport);

              return context.getSourceCode().getText(nextComma) === ","
                ? context.getSourceCode().getTokenAfter(nextComma).range[0]
                : titleImport.range[1];
            };

            return fixer.removeRange([titleImport.range[0], getEndRange()]);
          },
        });
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

              return [
                fixer.insertTextAfter(emptyStateIcon ?? title, getHeaderText()),
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

        emptyStatesWithTitleOrHeader.length && addHeader();
        includesEmptyStateContent && addFooter();
      },
    };
  },
};
