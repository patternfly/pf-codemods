const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8892
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-table"
    );
    const tableComposableImport = imports.find(
      (imp) => imp.imported.name === "TableComposable"
    );
    const tableComposableExport = exports.find(
      (imp) => imp.local.name === "TableComposable"
    );

    return !tableComposableImport && !tableComposableExport
      ? {}
      : {
          // update opening/closing elements
          JSXIdentifier(node) {
            const nodeName = node.name;
            const importedNode = imports.find(
              (imp) => imp.local.name === nodeName
            );
            const parentNode = node.parent;
            const isOpeningTag = parentNode.type === "JSXOpeningElement";
            const openingTagAttributes = isOpeningTag
              ? parentNode.attributes
              : parentNode.parent.openingElement?.attributes;
            const isAliased =
              importedNode?.local?.name !== importedNode?.imported?.name;
            if (importedNode?.imported?.name === "TableComposable") {
              const addDataAttr = (jsxStr) =>
                jsxStr.replace(/(\s*\/?>)$/, ' data-codemods="true"$1');
              const updateTagName = (node) => {
                const tagName = context.getSourceCode().getText(node);

                if (isAliased) {
                  return tagName;
                }
                return tagName.replace("TableComposable", "Table");
              };
              const isOpeningTag = node.parent.type === "JSXOpeningElement";
              const newOpeningParentTag = addDataAttr(
                updateTagName(node.parent)
              );
              const newClosingTag = updateTagName(node);
              (isOpeningTag || !isAliased) &&
                context.report({
                  node,
                  message: `${nodeName} has been replaced with ${nodeName.replace(
                    "TableComposable",
                    "Table"
                  )}`,
                  fix(fixer) {
                    return isOpeningTag
                      ? fixer.replaceText(node.parent, newOpeningParentTag)
                      : fixer.replaceText(node, newClosingTag);
                  },
                });
            }
          },
          ImportSpecifier(node) {
            const importedName = node.imported.name;
            if (importedName === "TableComposable") {
              const tableName = "Table";
              const localName = node.local.name;
              const isAliased = importedName !== localName;
              const aliasText = isAliased ? ` as ${localName}` : "";
              const newName = `${tableName}${aliasText}`;
              context.report({
                node,
                message: `${importedName} has been replaced with ${tableName}`,
                fix(fixer) {
                  return fixer.replaceText(node, newName);
                },
              });
            }
          },
          ExportNamedDeclaration(node) {
            if (!tableComposableExport) {
              return;
            }

            const tableComposableSpecifier = node.specifiers.find(
              (specifier) =>
                specifier?.local?.name === tableComposableExport.local?.name
            );

            if (tableComposableSpecifier) {
              context.report({
                node,
                message: "TableComposable has been replaced with Table",
                fix(fixer) {
                  return fixer.replaceText(
                    tableComposableSpecifier,
                    `Table as ${tableComposableSpecifier.exported?.name} /* data-codemods */`
                  );
                },
              });
            }
          },
        };
  },
};
