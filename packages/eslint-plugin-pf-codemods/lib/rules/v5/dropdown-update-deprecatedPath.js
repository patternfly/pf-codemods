const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8835
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const componentExports = [
      "BadgeToggle",
      "Dropdown",
      "DropdownPosition",
      "DropdownDirection",
      "DropdownContext",
      "DropdownArrowContext",
      "DropdownGroup",
      "DropdownItem",
      "DropdownMenu",
      "DropdownSeparator",
      "DropdownToggle",
      "DropdownToggleAction",
      "DropdownToggleCheckbox",
      "DropdownWithContext",
      "KebabToggle",
    ];
    const componentImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) => componentExports.includes(specifier.imported.name));

    return !componentImports.length
      ? {}
      : {
          ImportDeclaration(node) {
            const componentImportNames = componentImports.map(
              (imp) => imp.imported.name
            );
            const validSpecifiers = node.specifiers.filter((specifier) =>
              componentImportNames.includes(specifier?.imported?.name)
            );
            if (
              validSpecifiers.length &&
              node.source.value === "@patternfly/react-core"
            ) {
              context.report({
                node,
                message: `${validSpecifiers
                  .map((specifier, index) => {
                    if (
                      index === validSpecifiers.length - 1 &&
                      validSpecifiers.length > 1
                    ) {
                      return `and ${specifier.imported.name}`;
                    }
                    return specifier.imported.name;
                  })
                  .join(", ")} ${
                  validSpecifiers.length > 1 ? "have" : "has"
                } been deprecated. Running the fix flag will update your imports to our deprecated package, but we suggest using our new Dropdown implementation.`,
                fix(fixer) {
                  const createNewImportSpecifiers = (imports, aliasSuffix) =>
                    imports.map((imp) => {
                      const { imported, local } = imp;

                      if (imported.name === local.name) {
                        return `${imported.name}${
                          aliasSuffix
                            ? ` as ${imported.name}${aliasSuffix}`
                            : ""
                        }`;
                      }

                      return `${imported.name} as ${local.name}`;
                    });
                  const allImportDeclarations = context
                    .getSourceCode()
                    .ast.body.filter(
                      (node) => node.type === "ImportDeclaration"
                    );
                  const existingDeprecatedImportDeclaration =
                    allImportDeclarations.find(
                      (node) =>
                        node.source.value ===
                        "@patternfly/react-core/deprecated"
                    );
                  const existingDeprecatedSpecifiers =
                    existingDeprecatedImportDeclaration
                      ? existingDeprecatedImportDeclaration.specifiers.map(
                          (specifier) =>
                            context.getSourceCode().getText(specifier)
                        )
                      : [];
                  const otherImports = node.specifiers.filter(
                    (specifier) =>
                      !componentImportNames.includes(specifier?.imported?.name)
                  );
                  const newComponentSpecifiers = createNewImportSpecifiers(
                    componentImports,
                    "Deprecated"
                  );
                  const newDeprecatedImportDeclaration = `import { ${[
                    ...existingDeprecatedSpecifiers,
                    ...newComponentSpecifiers,
                  ].join(`,\n`)} } from '@patternfly/react-core/deprecated';`;

                  if (!otherImports.length) {
                    return existingDeprecatedImportDeclaration
                      ? [
                          fixer.remove(node),
                          fixer.replaceText(
                            existingDeprecatedImportDeclaration,
                            newDeprecatedImportDeclaration
                          ),
                        ]
                      : fixer.replaceText(node, newDeprecatedImportDeclaration);
                  } else {
                    const otherSpecifiers = otherImports
                      .map((otherImport) =>
                        context.getSourceCode().getText(otherImport)
                      )
                      .join(", ");

                    return [
                      fixer.replaceText(
                        node,
                        `import { ${otherSpecifiers} } from '@patternfly/react-core';`
                      ),
                      existingDeprecatedImportDeclaration
                        ? fixer.replaceText(
                            existingDeprecatedImportDeclaration,
                            newDeprecatedImportDeclaration
                          )
                        : fixer.insertTextAfter(
                            node,
                            `\n${newDeprecatedImportDeclaration}`
                          ),
                    ];
                  }
                },
              });
            }
          },
          JSXElement(node) {
            const validComponent = componentImports.find(
              (imp) => imp.local.name === node.openingElement.name.name
            );

            if (
              validComponent &&
              validComponent.imported.name === validComponent.local.name
            ) {
              context.report({
                node,
                message: `${node.openingElement.name.name} has been deprecated. Running the fix flag will update component names, but we suggest using our new Dropdown implementation.`,
                fix(fixer) {
                  const fixes = [
                    fixer.replaceText(
                      node.openingElement.name,
                      `${node.openingElement.name.name}Deprecated`
                    ),
                  ];

                  if (!node.openingElement.selfClosing) {
                    fixes.push(
                      fixer.replaceText(
                        node.closingElement.name,
                        `${node.openingElement.name.name}Deprecated`
                      )
                    );
                  }
                  return fixes;
                },
              });
            }
          },
        };
  },
};
