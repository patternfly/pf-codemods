import { Rule } from "eslint";
import { ImportDeclaration, ImportSpecifier } from "estree-jsx";
import { getFromPackage, getRemoveSpecifierFixes } from "../../helpers";

// Cleanup from other rules
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const findDuplicates = (specifiers: ImportSpecifier[]) => {
      const localNames = specifiers.map((spec) => spec.local.name);

      return specifiers.filter(
        (specifier, index) => localNames.indexOf(specifier.local.name) !== index
      );
    };

    const duplicatesToRemove = findDuplicates(imports);

    return !duplicatesToRemove.length
      ? {}
      : {
          ImportSpecifier(node: ImportSpecifier) {
            if (duplicatesToRemove.includes(node)) {
              const importDeclaration = context
                .getAncestors()
                .find(
                  (ancestor) => ancestor.type === "ImportDeclaration"
                ) as ImportDeclaration;

              if (importDeclaration) {
                context.report({
                  node,
                  message: `Duplicate import specifier ${node.local.name} imported from '${importDeclaration.source.value}'.`,
                  fix(fixer) {
                    return getRemoveSpecifierFixes(
                      context,
                      fixer,
                      importDeclaration,
                      node
                    );
                  },
                });
              }
            }
          },
        };
  },
};
