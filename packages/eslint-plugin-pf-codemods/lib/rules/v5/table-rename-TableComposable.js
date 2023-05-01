const {renameComponents, getPackageImports} = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8892
module.exports = {
  meta: {fixable: "code"},
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-table");
    const tableComposableImport = imports.find(
      (imp) => imp.imported.name === "TableComposable"
    );

    const tableImportsFiltered = imports.filter(
      (imp) => imp.imported.name === "TableComposable"
    );

    return imports.length === 0 || !tableComposableImport
      ? {}
      : {
          // update opening/closing elements
          JSXIdentifier(node) {
            const nodeName = node.name;
            const importedNode = imports.find(
              (imp) => imp.local.name === nodeName
            );
            if (nodeName === "Table") {
              // if data-codemods attribute, do nothing
              const parentNode = node.parent;
              const isOpeningTag = parentNode.type === "JSXOpeningElement";
              const openingTagAttributes = isOpeningTag
                ? parentNode.attributes
                : parentNode.parent.openingElement.attributes;
              const hasDataAttr =
                openingTagAttributes &&
                openingTagAttributes.filter(
                  (attr) => attr.name?.name === "data-codemods"
                ).length;
              if (hasDataAttr) {
                return;
              }
            }
            if (
              nodeName.includes("TableComposable") &&
              importedNode.imported.name === importedNode.local.name // don't rename an aliased component
            ) {
              const tableName = nodeName.replace("TableComposable", "Table");
              const needsDataAttr = tableName === "Table";
              const addDataAttr = (jsxStr) =>
                `${jsxStr.slice(0, -1)} data-codemods="true">`;
              const updateTagName = (node) =>
                context
                  .getSourceCode()
                  .getText(node)
                  .replace("TableComposable", "Table");
              const isOpeningTag =
                context.getSourceCode().getTokenBefore(node).value !== "/";
              const newOpeningParentTag = needsDataAttr
                ? addDataAttr(updateTagName(node.parent))
                : updateTagName(node.parent);
              const newClosingTag = updateTagName(node);
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
              const tableName = importedName.replace(
                "TableComposable",
                "Table"
              );
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
        };
  },
};