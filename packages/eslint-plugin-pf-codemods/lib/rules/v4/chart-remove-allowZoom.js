const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/4278
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const imports = getPackageImports(context, "@patternfly/react-charts");
    const victoryCoreImports = getPackageImports(
      context,
      "victory-zoom-container"
    );
    if (victoryCoreImports.length === 0) {
      const lastImportNode = context
        .getSourceCode()
        .ast.body.filter((node) => node.type === "ImportDeclaration")
        .pop();
      const importStatement = `import { VictoryZoomContainer } from 'victory-zoom-container';`;
      context.report({
        node: lastImportNode,
        message: `add missing ${importStatement}`,
        fix(fixer) {
          return fixer.insertTextAfter(lastImportNode, "\n" + importStatement);
        },
      });
    }

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            const componentName = imports.find(
              (imp) => imp.local.name === node.name.name
            )?.imported.name;

            if (["Chart", "ChartGroup"].includes(componentName)) {
              const allowZoomAttr = node.attributes.find(
                (attribute) => attribute.name.name === "allowZoom"
              );
              if (allowZoomAttr) {
                if (componentName === "Chart") {
                  context.report({
                    node,
                    message: `allowZoom prop for Chart has been replaced with containerComponent={<VictoryZoomContainer />}`,
                    fix(fixer) {
                      return fixer.replaceText(
                        allowZoomAttr,
                        "containerComponent={<VictoryZoomContainer />}"
                      );
                    },
                  });
                } else {
                  context.report({
                    node,
                    message: `allowZoom prop for ChartGroup has been removed`,
                    fix(fixer) {
                      return fixer.replaceText(allowZoomAttr, "");
                    },
                  });
                }
              }
            }
          },
        };
  },
};
