import {
  getAllJSXElements,
  getAttribute,
  getFromPackage,
  getAllImportDeclarations,
} from "../../helpers";
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
} from "estree-jsx";
import { Rule } from "eslint";

type JSXAttributeValue =
  | Literal
  | JSXExpressionContainer
  | JSXElement
  | JSXFragment;

const parseBadgeAttributeValue = (
  badgeAttributeValue: JSXAttributeValue
): Node => {
  if (badgeAttributeValue.type !== "JSXExpressionContainer") {
    return badgeAttributeValue;
  }

  const isValueJSX = ["JSXElement", "JSXEmptyExpression"].includes(
    badgeAttributeValue.expression.type
  );

  return isValueJSX ? badgeAttributeValue.expression : badgeAttributeValue;
};

const moveBadgeAttributeToBody = (
  node: JSXElement,
  fixer: Rule.RuleFixer,
  context: Rule.RuleContext
) => {
  const badgeAttribute = getAttribute(node, "badge");

  const textToInsert = badgeAttribute?.value
    ? ` ${context
        .getSourceCode()
        .getText(parseBadgeAttributeValue(badgeAttribute.value))}`
    : "";

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
  const onClickAttribute = getAttribute(node, "onClick");

  return onClickAttribute
    ? [fixer.replaceText(onClickAttribute.name, "onClose")]
    : [];
};

const removeIsReadOnlyProp = (node: JSXElement, fixer: Rule.RuleFixer) => {
  const isReadOnlyProp = getAttribute(node, "isReadOnly");

  return isReadOnlyProp ? [fixer.replaceText(isReadOnlyProp, "")] : [];
};

// https://github.com/patternfly/patternfly-react/pull/10049
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const labelImport = imports.find(
      (specifier) => specifier.imported.name === "Label"
    );

    const labelGroupImport = imports.find(
      (specifier) => specifier.imported.name === "LabelGroup"
    );

    const { imports: importsFromDeprecated } = getFromPackage(
      context,
      "@patternfly/react-core/deprecated"
    );

    const chipImport = importsFromDeprecated.find(
      (specifier) => specifier.imported.name === "Chip"
    );

    const chipGroupImport = importsFromDeprecated.find(
      (specifier) => specifier.imported.name === "ChipGroup"
    );

    const isImportDeclarationWithChipOrChipGroup = (node: ImportDeclaration) =>
      node.source.value === "@patternfly/react-core/deprecated" &&
      node.specifiers.every(
        (specifier) => specifier.type === "ImportSpecifier"
      ) &&
      ((chipImport && node.specifiers.includes(chipImport)) ||
        (chipGroupImport && node.specifiers.includes(chipGroupImport)));

    return chipImport || chipGroupImport
      ? {
          ImportDeclaration(node: ImportDeclaration) {
            if (!isImportDeclarationWithChipOrChipGroup(node)) {
              return;
            }

            const removeChipAndChipGroupImports = (
              node: ImportDeclaration,
              fixer: Rule.RuleFixer
            ) => {
              const importIncludesOnlyChipAndChipGroup = (
                node.specifiers as ImportSpecifier[]
              ).every((specifier) =>
                ["Chip", "ChipGroup"].includes(specifier.imported.name)
              );

              if (importIncludesOnlyChipAndChipGroup) {
                return [fixer.remove(node)];
              }

              const fixes = [];
              for (const specifier of [chipImport, chipGroupImport]) {
                if (specifier) {
                  fixes.push(fixer.remove(specifier));
                  const tokenAfter = context
                    .getSourceCode()
                    .getTokenAfter(specifier);
                  if (tokenAfter?.value === ",") {
                    fixes.push(fixer.remove(tokenAfter));
                  }
                }
              }
              return fixes;
            };

            const addLabelAndLabelGroupImports = (fixer: Rule.RuleFixer) => {
              if (!labelImport && !labelGroupImport) {
                const pfImportDeclarations = getAllImportDeclarations(
                  context,
                  "@patternfly/react-core"
                );

                const labelImportsToAdd = [chipImport, chipGroupImport]
                  .map((specifier, index) =>
                    specifier ? ["Label", "LabelGroup"][index] : null
                  )
                  .filter((value) => value !== null)
                  .join(", ");

                if (pfImportDeclarations.length) {
                  // add label specifiers at the beginning of first import declaration
                  return [
                    fixer.insertTextBefore(
                      pfImportDeclarations[0].specifiers[0],
                      `${labelImportsToAdd}, `
                    ),
                  ];
                }

                // add whole import declaration
                return [
                  fixer.insertTextAfter(
                    node,
                    `import { ${labelImportsToAdd} } from '@patternfly/react-core';`
                  ),
                ];
              }

              if (chipImport && !labelImport) {
                return [fixer.insertTextAfter(labelGroupImport!, ", Label")];
              }
              if (chipGroupImport && !labelGroupImport) {
                return [fixer.insertTextAfter(labelImport!, ", LabelGroup")];
              }
              return [];
            };

            const handleJSXElements = (fixer: Rule.RuleFixer) => {
              const elements: JSXElement[] = getAllJSXElements(context);

              const labelName = labelImport?.local.name ?? "Label";
              const labelGroupName =
                labelGroupImport?.local.name ?? "LabelGroup";

              const getChipFixes = (
                node: JSXElement,
                fixer: Rule.RuleFixer
              ) => [
                fixer.replaceText(node.openingElement.name, labelName),
                fixer.insertTextAfter(
                  node.openingElement.name,
                  ' variant="outline"'
                ),
                ...renameOnClickAttribute(node, fixer),
                ...removeIsReadOnlyProp(node, fixer),
                ...(node.closingElement
                  ? [
                      ...moveBadgeAttributeToBody(node, fixer, context),
                      fixer.replaceText(node.closingElement.name, labelName),
                    ]
                  : []),
              ];

              const getChipGroupFixes = (
                node: JSXElement,
                fixer: Rule.RuleFixer
              ) => [
                fixer.replaceText(node.openingElement.name, labelGroupName),
                ...(node.closingElement
                  ? [
                      fixer.replaceText(
                        node.closingElement.name,
                        labelGroupName
                      ),
                    ]
                  : []),
              ];

              const fixes = [];

              for (const node of elements) {
                if (
                  node.openingElement.name.type !== "JSXIdentifier" ||
                  ![
                    chipImport?.local.name,
                    chipGroupImport?.local.name,
                  ].includes(node.openingElement.name.name)
                ) {
                  continue;
                }

                if (
                  chipImport &&
                  chipImport.local.name ===
                    (node.openingElement.name as JSXIdentifier).name
                ) {
                  fixes.push(...getChipFixes(node, fixer));
                } else if (
                  chipGroupImport &&
                  chipGroupImport.local.name ===
                    (node.openingElement.name as JSXIdentifier).name
                ) {
                  fixes.push(...getChipGroupFixes(node, fixer));
                }
              }

              return fixes;
            };

            context.report({
              node,
              message: `Chip has been deprecated. Running the fix flag will replace Chip and ChipGroup components with Label and LabelGroup components respectively.`,
              fix(fixer) {
                return [
                  ...removeChipAndChipGroupImports(node, fixer),
                  ...addLabelAndLabelGroupImports(fixer),
                  ...handleJSXElements(fixer),
                ];
              },
            });
          },
        }
      : {};
  },
};
