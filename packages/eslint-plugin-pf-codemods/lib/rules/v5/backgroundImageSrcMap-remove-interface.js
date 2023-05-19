const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8931
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const { imports, exports } = getFromPackage(
      context,
      "@patternfly/react-core"
    );

    const backgroundImgSrcMapImport = imports.find(
      (specifier) => specifier.imported?.name == "BackgroundImageSrcMap"
    );
    const backgroundImgSrcMapExport = exports.find(
      (specifier) => specifier.local?.name == "BackgroundImageSrcMap"
    );
    const importExportMessage =
      "The BackgroundImageSrcMap interface has been removed.";
    const removeSpecifier = (fixer, context, node, specifier) => {
      const tokenAfter = context.getSourceCode().getTokenAfter(specifier);

      const { range } = specifier;
      return node.specifiers.length > 1
        ? fixer.removeRange([
            range[0],
            tokenAfter.value === "," ? tokenAfter.range[1] : range[1],
          ])
        : fixer.remove(node);
    };

    return !backgroundImgSrcMapImport && !backgroundImgSrcMapExport
      ? {}
      : {
          ImportDeclaration(node) {
            if (!backgroundImgSrcMapImport) {
              return;
            }

            const backgroundImgSrcMapSpecifier = node.specifiers.find(
              (specifier) =>
                specifier.local.name === backgroundImgSrcMapImport.local.name
            );

            if (backgroundImgSrcMapSpecifier) {
              context.report({
                node,
                message: importExportMessage,
                fix(fixer) {
                  return removeSpecifier(
                    fixer,
                    context,
                    node,
                    backgroundImgSrcMapSpecifier
                  );
                },
              });
            }
          },
          Identifier(node) {
            const typeAnnotationProperty =
              node.typeAnnotation?.typeAnnotation?.id ||
              node.typeAnnotation?.typeAnnotation?.typeName;
            if (
              !node.typeAnnotation ||
              typeAnnotationProperty.name !==
                backgroundImgSrcMapImport.local.name
            ) {
              return;
            }
            context.report({
              node,
              message: `The BackgroundImageSrcMap interface has been removed.`,
              fix(fixer) {
                return fixer.remove(node.typeAnnotation);
              },
            });
          },
          ExportNamedDeclaration(node) {
            if (!backgroundImgSrcMapExport) {
              return;
            }

            const backgroundImgSrcMapSpecifier = node.specifiers.find(
              (specifier) =>
                specifier.local.name === backgroundImgSrcMapExport.local.name
            );

            if (backgroundImgSrcMapSpecifier) {
              context.report({
                node,
                message: importExportMessage,
                fix(fixer) {
                  return removeSpecifier(
                    fixer,
                    context,
                    node,
                    backgroundImgSrcMapSpecifier
                  );
                },
              });
            }
          },
        };
  },
};
