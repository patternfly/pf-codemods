const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8835
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const dropdownExports = [
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
    const dropdownImports = getPackageImports(
      context,
      "@patternfly/react-core"
    ).filter((specifier) => dropdownExports.includes(specifier.imported.name));

    return !dropdownImports.length
      ? {}
      : {
          ImportDeclaration(node) {
            const dropdownImportNames = dropdownImports.map(
              (imp) => imp.imported.name
            );
            const validSpecifiers = node.specifiers.filter((specifier) =>
              dropdownImportNames.includes(specifier?.imported?.name)
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
                  const otherImports = node.specifiers.filter(
                    (specifier) =>
                      !dropdownImportNames.includes(specifier?.imported?.name)
                  );
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

                  const dropdownSpecifiers = createNewImportSpecifiers(
                    dropdownImports,
                    "Deprecated"
                  ).join(", ");
                  const deprecatedImportsLine = `import { ${dropdownSpecifiers} } from '@patternfly/react-core/deprecated';`;

                  if (!otherImports.length) {
                    return fixer.replaceText(node, deprecatedImportsLine);
                  } else {
                    const otherSpecifiers =
                      createNewImportSpecifiers(otherImports).join(", ");

                    return fixer.replaceText(
                      node,
                      `import { ${otherSpecifiers} } from '@patternfly/react-core';\n${deprecatedImportsLine}`
                    );
                  }
                },
              });
            }
          },
          JSXElement(node) {
            const dropdownComponent = dropdownImports.find(
              (imp) => imp.local.name === node.openingElement.name.name
            );

            if (
              dropdownComponent &&
              dropdownComponent.imported.name === dropdownComponent.local.name
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
