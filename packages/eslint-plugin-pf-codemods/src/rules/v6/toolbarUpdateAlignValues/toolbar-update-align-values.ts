import { Rule } from "eslint";
import { JSXOpeningElement, Property } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

const componentsPropMap: { [key: string]: string } = {
  ToolbarGroup: "align",
  ToolbarItem: "align",
  ToolbarToggleGroup: "alignment",
};

const newPropValueMap: { [key: string]: string } = {
  alignLeft: "alignStart",
  alignRight: "alignEnd",
};
const oldPropValues = Object.keys(newPropValueMap);

// https://github.com/patternfly/patternfly-react/pull/10366
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter((specifier) =>
      Object.keys(componentsPropMap).includes(specifier.imported.name)
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const currentNodeImport = componentImports.find(
                (imp) =>
                  node.name.type === "JSXIdentifier" &&
                  imp.local.name === node.name.name
              );
              const componentPropName = currentNodeImport
                ? componentsPropMap[currentNodeImport.imported.name]
                : "align";
              const attribute = getAttribute(node, componentPropName);
              if (!attribute) {
                return;
              }

              const attributeValue = getAttributeValue(
                context,
                attribute.value
              );
              if (
                attributeValue.every(
                  (property: Property) =>
                    property.value.type === "Literal" &&
                    !oldPropValues.includes(property.value.value as string)
                )
              ) {
                return;
              }

              context.report({
                node,
                message: `The values for the \`${componentPropName}\` property on ${node.name.name} have been updated from "alignLeft" and "alignRight" to "alignStart" and "alignEnd", respectively.`,
                fix(fixer) {
                  const fixes = [];

                  for (const property of attributeValue) {
                    if (oldPropValues.includes(property.value.value)) {
                      const propertyKeyValue =
                        property.key.type === "Literal"
                          ? `"${property.key.value}"`
                          : property.key.name;
                      fixes.push(
                        fixer.replaceText(
                          property,
                          `${propertyKeyValue}: "${
                            newPropValueMap[property.value.value]
                          }"`
                        )
                      );
                    }
                  }
                  return fixes;
                },
              });
            }
          },
        };
  },
};
