import { Rule } from "eslint";
import {
  Identifier,
  JSXOpeningElement,
  ObjectExpression,
  Property,
} from "estree-jsx";
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

              const attributeValueProperties = (
                getAttributeValue(
                  context,
                  attribute.value
                ) as ObjectExpression["properties"]
              ).filter((prop) => prop.type === "Property") as Property[];
              if (
                attributeValueProperties.every(
                  (property) =>
                    (property.value.type === "Literal" &&
                      !oldPropValues.includes(
                        property.value.value as string
                      )) ||
                    property.value.type !== "Literal"
                )
              ) {
                return;
              }

              context.report({
                node,
                message: `The values for the \`${componentPropName}\` property on ${node.name.name} have been updated from "alignLeft" and "alignRight" to "alignStart" and "alignEnd", respectively.`,
                fix(fixer) {
                  const fixes = [];

                  for (const property of attributeValueProperties) {
                    if (property.value.type !== "Literal") {
                      continue;
                    }

                    const propertyValueString = property.value.value as string;

                    if (oldPropValues.includes(propertyValueString)) {
                      const propertyKeyValue =
                        property.key.type === "Literal"
                          ? `"${property.key.value}"`
                          : (property.key as Identifier).name;
                      fixes.push(
                        fixer.replaceText(
                          property,
                          `${propertyKeyValue}: "${newPropValueMap[propertyValueString]}"`
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
