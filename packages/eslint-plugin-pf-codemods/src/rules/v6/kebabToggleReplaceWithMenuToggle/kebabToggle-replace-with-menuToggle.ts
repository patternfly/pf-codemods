import { Rule } from "eslint";
import { JSXElement, ImportDeclaration, Identifier } from "estree-jsx";
import {
  getFromPackage,
  replaceNodeText,
  IdentifierWithParent,
  getAttribute,
  removeSpecifierFromDeclaration,
  getAllImportDeclarations,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10345
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const mainPackageName = "@patternfly/react-core";
    const { imports } = getFromPackage(context, mainPackageName);
    const menuToggleImport = imports.find(
      (specifier) => specifier.imported.name === "MenuToggle"
    );
    const { imports: deprecatedImports } = getFromPackage(
      context,
      "@patternfly/react-core/deprecated"
    );
    const kebabToggleImport = deprecatedImports.find(
      (specifier) => specifier.imported.name === "KebabToggle"
    );
    const ellipsisVIconImport = getAllImportDeclarations(
      context,
      "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon"
    );

    const message =
      "KebabToggle has been removed from PatternFly. Running the fix for this rule will update to our MenuToggle, but additional manual updates may be required.";

    return !kebabToggleImport
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            const kebabImportSpecifier =
              kebabToggleImport &&
              node.specifiers.find(
                (specifier) =>
                  specifier.type === "ImportSpecifier" &&
                  specifier.imported.name === kebabToggleImport.imported.name
              );

            if (!kebabImportSpecifier) {
              return;
            }

            context.report({
              node,
              message,
              fix(fixer) {
                const fixes = [];
                if (!ellipsisVIconImport.length) {
                  fixes.push(
                    fixer.insertTextAfter(
                      node,
                      `\nimport EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";`
                    )
                  );
                }
                if (!menuToggleImport && node.specifiers.length === 1) {
                  return [
                    ...fixes,
                    fixer.replaceText(kebabImportSpecifier, "MenuToggle"),
                    fixer.replaceText(node.source, `"${mainPackageName}"`),
                  ];
                }

                fixes.push(
                  ...removeSpecifierFromDeclaration(
                    fixer,
                    context,
                    node,
                    kebabImportSpecifier
                  )
                );
                if (!menuToggleImport && node.specifiers.length > 1) {
                  fixes.push(
                    fixer.insertTextAfter(
                      node,
                      `\nimport { MenuToggle } from "${mainPackageName}";`
                    )
                  );
                }

                return fixes;
              },
            });
          },
          JSXElement(node: JSXElement) {
            if (
              kebabToggleImport &&
              node.openingElement.name.type === "JSXIdentifier" &&
              kebabToggleImport.local.name === node.openingElement.name.name
            ) {
              const onToggleProp = getAttribute(node, "onToggle");
              const iconProp = getAttribute(node, "icon");

              context.report({
                node,
                message,
                fix(fixer) {
                  const fixes = [
                    fixer.replaceText(node.openingElement.name, "MenuToggle"),
                  ];

                  if (!iconProp) {
                    fixes.push(
                      fixer.insertTextAfter(
                        node.openingElement.name,
                        ` icon={<EllipsisVIcon aria-hidden="true" />}`
                      )
                    );
                  }
                  if (onToggleProp) {
                    fixes.push(fixer.replaceText(onToggleProp.name, "onClick"));
                  }
                  if (node.closingElement) {
                    fixes.push(
                      fixer.replaceText(node.closingElement.name, "MenuToggle")
                    );
                  }
                  return fixes;
                },
              });
            }
          },
          Identifier(node: IdentifierWithParent) {
            if (
              kebabToggleImport &&
              node.name === kebabToggleImport.imported.name &&
              node.parent &&
              !["ImportSpecifier", "ExportSpecifier"].includes(node.parent.type)
            ) {
              replaceNodeText(context, node, node, message, "MenuToggle");
            }
          },
        };
  },
};
