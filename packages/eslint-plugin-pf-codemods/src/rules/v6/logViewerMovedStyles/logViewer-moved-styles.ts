import { Rule } from "eslint";
import { ImportDeclaration } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/react-log-viewer/pull/70
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const logViewerImport = "@patternfly/react-log-viewer";
    const { imports: logViewerImports } = getFromPackage(
      context,
      logViewerImport
    );

    return !logViewerImports.length
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.source.type === "Literal" &&
              (node.source.value as string).includes(logViewerImport)
            ) {
              context.report({
                node,
                message:
                  "The stylesheet for LogViewer has been moved out of the PatternFly package and into LogViewer itself. You may need to update stylesheet imports or import the stylesheet manually.",
              });
            }
          },
        };
  },
};
