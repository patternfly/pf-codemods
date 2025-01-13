import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10418
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const toolbarImports = imports.filter((specifier) =>
      ["ToolbarGroup", "ToolbarToggleGroup", "ToolbarItem"].includes(
        specifier.imported.name
      )
    );

    return !toolbarImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              toolbarImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const spacerProp = getAttribute(node, "spacer");
              const spaceItemsProp = getAttribute(node, "spaceItems");
              if (!spacerProp && !spaceItemsProp) {
                return;
              }
              const spacerPropMessage = `The spacer property has been removed from ${node.name.name}. We recommend instead using our new gap, columnGap, or rowGap properties.`;
              const spaceItemsPropMessage = `${
                spacerProp ? " Additionally, the" : "The"
              } spaceItems property has been removed from ${node.name.name}.`;

              const getSpacerValue = () => {
                if (!spacerProp) {
                  return;
                }

                const { type, value } = getAttributeValue(
                  context,
                  spacerProp.value
                );

                if (type !== "ObjectExpression") {
                  return;
                }

                return value;
              };

              context.report({
                node,
                message: `${spacerProp ? spacerPropMessage : ""}${
                  spaceItemsProp ? spaceItemsPropMessage : ""
                }`,
                fix(fixer) {
                  const fixes = [];

                  const spacerVal = getSpacerValue();

                  if (spacerProp && spacerVal) {
                    spacerVal.forEach((val) => {
                      if (val.type !== "Property") {
                        return;
                      }

                      const newValue =
                        val.value?.type === "Literal" &&
                        (val.value.value as string).replace("spacer", "gap");

                      newValue &&
                        fixes.push(
                          fixer.replaceText(val.value, `"${newValue}"`)
                        );
                    });

                    fixes.push(fixer.replaceText(spacerProp.name, "gap"));
                  }
                  if (spaceItemsProp) {
                    fixes.push(fixer.replaceText(spaceItemsProp, ""));
                  }

                  return fixes;
                },
              });
            }
          },
        };
  },
};
