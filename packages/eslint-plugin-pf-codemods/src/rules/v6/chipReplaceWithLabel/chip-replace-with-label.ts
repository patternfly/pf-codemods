import { getFromPackage } from '../../helpers';
import {
  ImportDeclaration,
  ImportSpecifier,
  JSXAttribute,
  JSXClosingElement,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  Literal,
  Node,
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
    fixer.replaceText(importSpecifier, newName),
    fixer.replaceText(node.source, "'@patternfly/react-core'"),
  ];
};

const getJSXAttribute = (node: JSXElement, attributeName: string) => {
  return node.openingElement.attributes.find(
    (attribute) =>
      attribute.type === 'JSXAttribute' && attribute.name.name === attributeName
  ) as JSXAttribute | undefined;
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
  const badgeAttribute = getJSXAttribute(node, 'badge');

  return badgeAttribute
    ? [
        fixer.insertTextBefore(
          node.closingElement as JSXClosingElement,
          context
            .getSourceCode()
            .getText(
              badgeAttribute?.value
                ? parseBadgeAttributeValue(badgeAttribute.value)
                : undefined
            )
        ),
        fixer.remove(badgeAttribute),
      ]
    : [];
};

const renameOnClickAttribute = (node: JSXElement, fixer: Rule.RuleFixer) => {
  const onClickAttribute = getJSXAttribute(node, 'onClick');

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

    return !chipImport && !chipGroupImport
      ? {}
      : {
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
            if (node.openingElement.name.type === 'JSXIdentifier') {
              if (
                chipImport &&
                chipImport.local.name === node.openingElement.name.name
              ) {
                context.report({
                  node,
                  message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
                  fix(fixer) {
                    return [
                      fixer.replaceText(node.openingElement.name, 'Label'),
                      fixer.insertTextAfter(
                        node.openingElement.name,
                        ' variant="outline"'
                      ),
                      ...renameOnClickAttribute(node, fixer),
                      ...(node.closingElement
                        ? [
                            fixer.replaceText(
                              node.closingElement.name,
                              'Label'
                            ),
                            ...moveBadgeAttributeToBody(node, fixer, context),
                          ]
                        : []),
                    ];
                  },
                });
              } else if (
                chipGroupImport &&
                chipGroupImport.local.name === node.openingElement.name.name
              ) {
                context.report({
                  node,
                  message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
                  fix(fixer) {
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
                  },
                });
              }
            }
          },
        };
  },
};
