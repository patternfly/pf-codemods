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
            if (validSpecifiers.length) {
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
                } been deprecated. In order to continue using the deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased.`,
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
                  const dropdownImportsLine = `import { ${dropdownSpecifiers} } from '@patternfly/react-core/deprecated';`;

                  if (!otherImports.length) {
                    return fixer.replaceText(node, dropdownImportsLine);
                  } else {
                    const otherSpecifiers =
                      createNewImportSpecifiers(otherImports).join(", ");

                    return fixer.replaceText(
                      node,
                      `import { ${otherSpecifiers} } from '@patternfly/react-core';\n${dropdownImportsLine}`
                    );
                  }
                },
              });
            }
          },
          JSXOpeningElement(node) {
            const dropdownComponent = dropdownImports.find(
              (imp) => imp.local.name === node.name.name
            );

            if (
              dropdownComponent &&
              dropdownComponent.imported.name === dropdownComponent.local.name
            ) {
              context.report({
                node,
                message: `${node.name.name} has been deprecated. In order to continue using the deprecated implementation, the import path must be updated to our deprecated package and specifiers must be aliased.`,
                fix(fixer) {
                  return fixer.replaceText(
                    node.name,
                    `${node.name.name}Deprecated`
                  );
                },
              });
            }
          },
        };
  },
};
