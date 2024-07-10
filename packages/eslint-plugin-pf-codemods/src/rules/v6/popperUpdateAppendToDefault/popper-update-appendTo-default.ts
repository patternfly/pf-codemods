import { Rule } from "eslint";
import { ImportSpecifier } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10675
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter((specifier) =>
      ["Dropdown", "Select", "Popper"].includes(specifier.imported.name)
    );

    return !componentImports.length
      ? {}
      : {
          ImportSpecifier(node: ImportSpecifier) {
            if (
              componentImports
                .map((imp) => imp.imported.name)
                .includes(node.imported.name)
            ) {
              context.report({
                node,
                message: `The default value of appendTo on ${node.imported.name} has been updated to \`document.body\`.`,
              });
            }
          },
        };
  },
};
