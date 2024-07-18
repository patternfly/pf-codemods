import { Rule } from "eslint";
import {
  ImportDeclaration,
  ExportNamedDeclaration,
  ImportSpecifier,
  ExportSpecifier,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
} from "estree-jsx";
import { getEndRange } from "./getEndRange";

export function removeSpecifierFromDeclaration(
  fixer: Rule.RuleFixer,
  context: Rule.RuleContext,
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
