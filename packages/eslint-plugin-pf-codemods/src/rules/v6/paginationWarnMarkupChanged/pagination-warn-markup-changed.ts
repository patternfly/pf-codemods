import { Rule } from "eslint";
import { ImportSpecifier } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10662
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const paginationImport = imports.find(
      (specifier) => specifier.imported.name === "Pagination"
    );

    return !paginationImport
      ? {}
      : {
          ImportSpecifier(node: ImportSpecifier) {
            if (paginationImport.imported.name === node.imported.name) {
              context.report({
                node,
                message:
                  "The markup for Pagination has changed. There is now a wrapper element rendered around the PaginationOptionsMenu toggle.",
              });
            }
          },
        };
  },
};
