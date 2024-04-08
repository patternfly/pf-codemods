import { getAttribute, getFromPackage } from '../../helpers';
import {
  ImportDeclaration,
  ImportSpecifier,
  JSXClosingElement,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  Literal,
  Node,
  JSXIdentifier,
} from 'estree-jsx';
import { Rule } from 'eslint';

type JSXAttributeValue =
  | Literal
  | JSXExpressionContainer
  | JSXElement
  | JSXFragment;

const getImportSpecifier = (node: ImportDeclaration, specifierName: string) => {
  return node.specifiers.find(
    (specifier) =>
      specifier.type === 'ImportSpecifier' &&
      specifier.imported.name === specifierName
  ) as ImportSpecifier | undefined;
};

const renameImportSpecifier = (
  importToRename: ImportSpecifier | undefined,
  node: ImportDeclaration,
  fixer: Rule.RuleFixer,
  newName: string
) => {
  if (!importToRename) {
    return [];
  }

  const oldName = importToRename.imported.name;
  const importSpecifier = getImportSpecifier(
    node,
    importToRename.imported.name
  ) as ImportSpecifier;

  const importedName = importSpecifier.imported.name;
  const name = importedName.replace(oldName, newName);
  const localName = importSpecifier.local.name;
  const aliasText = importedName !== localName ? ` as ${localName}` : '';
  const rename = `${name}${aliasText}`;
  return [
    fixer.replaceText(importSpecifier, rename),
    fixer.replaceText(node.source, "'@patternfly/react-core'"),
  ];
};

const parseBadgeAttributeValue = (
  badgeAttributeValue: JSXAttributeValue
): Node => {
  if (badgeAttributeValue.type !== 'JSXExpressionContainer') {
    return badgeAttributeValue;
  }

  const isValueJSX = ['JSXElement', 'JSXEmptyExpression'].includes(
    badgeAttributeValue.expression.type
  );

  return isValueJSX ? badgeAttributeValue.expression : badgeAttributeValue;
};

const moveBadgeAttributeToBody = (
  node: JSXElement,
  fixer: Rule.RuleFixer,
  context: Rule.RuleContext
) => {
  const badgeAttribute = getAttribute(node, 'badge');

  const textToInsert = badgeAttribute?.value
    ? ` ${context
        .getSourceCode()
        .getText(parseBadgeAttributeValue(badgeAttribute.value))}`
    : '';

  return badgeAttribute
    ? [
        fixer.insertTextBefore(
          node.closingElement as JSXClosingElement,
          textToInsert
        ),
        fixer.remove(badgeAttribute),
      ]
    : [];
};

const renameOnClickAttribute = (node: JSXElement, fixer: Rule.RuleFixer) => {
  const onClickAttribute = getAttribute(node, 'onClick');

  return onClickAttribute
    ? [fixer.replaceText(onClickAttribute.name, 'onClose')]
    : [];
};

// https://github.com/patternfly/patternfly-react/pull/10049
module.exports = {
  meta: { fixable: 'code' },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(
      context,
      '@patternfly/react-core/deprecated'
    );

    const chipImport = imports.find(
      (specifier) => specifier.imported.name === 'Chip'
    );

    const chipGroupImport = imports.find(
      (specifier) => specifier.imported.name === 'ChipGroup'
    );

    return chipImport || chipGroupImport
      ? {
          ImportDeclaration(node: ImportDeclaration) {
            context.report({
              node,
              message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
              fix(fixer) {
                return [
                  ...renameImportSpecifier(chipImport, node, fixer, 'Label'),
                  ...renameImportSpecifier(
                    chipGroupImport,
                    node,
                    fixer,
                    'LabelGroup'
                  ),
                ];
              },
            });
          },

          JSXElement(node: JSXElement) {
            if (node.openingElement.name.type !== 'JSXIdentifier') {
              return;
            }

            const fix = (fixer: Rule.RuleFixer) => {
              if (
                chipImport &&
                chipImport.local.name ===
                  (node.openingElement.name as JSXIdentifier).name
              ) {
                return [
                  fixer.replaceText(node.openingElement.name, 'Label'),
                  fixer.insertTextAfter(
                    node.openingElement.name,
                    ' variant="outline"'
                  ),
                  ...renameOnClickAttribute(node, fixer),
                  ...(node.closingElement
                    ? [
                        fixer.replaceText(node.closingElement.name, 'Label'),
                        ...moveBadgeAttributeToBody(node, fixer, context),
                      ]
                    : []),
                ];
              } else if (
                chipGroupImport &&
                chipGroupImport.local.name ===
                  (node.openingElement.name as JSXIdentifier).name
              ) {
                return [
                  fixer.replaceText(node.openingElement.name, 'LabelGroup'),
                  ...(node.closingElement
                    ? [
                        fixer.replaceText(
                          node.closingElement.name,
                          'LabelGroup'
                        ),
                      ]
                    : []),
                ];
              } else return [];
            };

            context.report({
              node,
              message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
              fix,
            });
          },
        }
      : {};
  },
};
