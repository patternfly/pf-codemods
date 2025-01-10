import { Rule } from "eslint";
import {
  ImportDeclaration,
  ExportNamedDeclaration,
  ImportSpecifier,
  ExportSpecifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
} from "estree-jsx";
import { getEndRange } from "../getEndRange";

/**
 * Use inline within the context.report's fix method to remove a specifier from an import/export declaration. This can be returned on its own or spread as part of a fixes array.
 * @param context The context object from the top level create method of the rule being written.
 * @param fixer The fixer parameter from the fix method of the context.report object.
 * @param node The import or export node to remove the specifier from.
 * @param specifierToRemove The specifier to remove from the import or export declaration.
 * @returns An array of fixers to apply when the rule is ran with the fix flag.
 */
export function getRemoveSpecifierFixes(
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  node: ImportDeclaration | ExportNamedDeclaration,
  specifierToRemove:
    | ImportSpecifier
    | ImportDefaultSpecifier
    | ImportNamespaceSpecifier
    | ExportSpecifier
) {
  if (node.specifiers.length === 1) {
    return [fixer.remove(node)];
  }
  if (!specifierToRemove.range) {
    return [];
  }

  const startRange = specifierToRemove.range[0];
  const endRange = getEndRange(context.getSourceCode(), specifierToRemove);
  if (!startRange || !endRange) {
    return [];
  }
  return [fixer.removeRange([startRange, endRange])];
}
