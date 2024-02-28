import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import {
  MemberExpression,
  Identifier,
  JSXOpeningElement,
  JSXAttribute,
} from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10017
// https://github.com/patternfly/patternfly-react/pull/10036
// Possible TODOs: check for variable references passed in as values
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter(
      (specifier: { imported: { name: string } }) =>
        ["DrawerContent", "DrawerPanelContent", "DrawerSection"].includes(
          specifier.imported.name
        )
    );
    const colorVariantEnumImport = imports.filter(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "DrawerColorVariant"
    );

    return !componentImports.length && !colorVariantEnumImport.length
      ? {}
      : {
          MemberExpression(node: MemberExpression) {
            if (
              colorVariantEnumImport
                .map((imp) => imp.local.name)
                .includes((node.object as Identifier).name)
            ) {
              if ((node.property as Identifier).name === "light200") {
                context.report({
                  node,
                  message:
                    "The `light200` property for the DrawerColorVariant enum has been replaced with the `secondary` property.",
                  fix(fixer: {
                    replaceText: (arg0: any, arg1: string) => any;
                  }) {
                    return fixer.replaceText(node.property, "secondary");
                  },
                });
              }
            }
          },
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const attribute = node.attributes.find(
                (attr) =>
                  attr.type === "JSXAttribute" &&
                  attr.name.name === "colorVariant"
              ) as JSXAttribute | undefined;

              if (!attribute || !attribute.value) {
                return;
              }
              if (
                attribute.value.type === "Literal" &&
                typeof attribute.value.value === "string" &&
                attribute.value.value === "light-200"
              ) {
                context.report({
                  node,
                  message: `The "light-200" value for the \`colorVariant\` prop has been replaced with the "secondary" value for ${node.name.name}.`,
                  fix(fixer) {
                    return fixer.replaceText(
                      attribute,
                      'colorVariant="secondary"'
                    );
                  },
                });
              }
            }
          },
        };
  },
};
