import { Rule } from "eslint";
import { ImportDeclaration, ImportSpecifier } from "estree-jsx";
import { getFromPackage, removeSpecifierFromDeclaration } from "../../helpers";

// Cleanup from other rules
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const createKey = (specifier: ImportSpecifier) =>
      `${specifier.imported.name}:${specifier.local.name}`;

    const findDuplicates = (specifiers: ImportSpecifier[]) => {
      const occurrences = new Map<string, number>();

      // Build a map to count occurrences of each similar import
      specifiers.forEach((specifier) => {
        const key = createKey(specifier);
        if (occurrences.has(key)) {
          occurrences.set(key, occurrences.get(key)! + 1);
        } else {
          occurrences.set(key, 1);
        }
      });

      const seen = new Set<string>();
      const duplicates: ImportSpecifier[] = [];

      specifiers.forEach((specifier) => {
        const key = createKey(specifier);

        if (occurrences.get(key) === 1) {
          return;
        }

        if (seen.has(key)) {
          duplicates.push(specifier);
        } else {
          seen.add(key);
        }
      });

      return duplicates;
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
                    return removeSpecifierFromDeclaration(
                      fixer,
                      context,
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
