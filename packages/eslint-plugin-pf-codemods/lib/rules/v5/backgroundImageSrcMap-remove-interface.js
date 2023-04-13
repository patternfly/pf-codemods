const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8931
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const backgroundImgSrcMapImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name == "BackgroundImageSrcMap");

    return !backgroundImgSrcMapImport
      ? {}
      : {
          ImportDeclaration(node) {
            const backgroundImgSrcMapSpecifier = node.specifiers.find(
              (specifier) =>
                specifier.local.name === backgroundImgSrcMapImport.local.name
            );

            if (backgroundImgSrcMapSpecifier) {
              context.report({
                node,
                message:
                  "The BackgroundImageSrcMap interface has been removed.",
                fix(fixer) {
                  const tokenAfter = context
                    .getSourceCode()
                    .getTokenAfter(backgroundImgSrcMapSpecifier).value;

                  const { range } = backgroundImgSrcMapSpecifier;
                  return node.specifiers.length > 1
                    ? fixer.removeRange([
                        range[0],
                        tokenAfter === "," ? range[1] + 1 : range[1],
                      ])
                    : fixer.remove(node);
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
        };
  },
};
