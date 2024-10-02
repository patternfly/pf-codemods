import { Rule } from "eslint";
import {
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  Identifier,
  ImportSpecifier,
  JSXOpeningElement,
  Property,
  SpreadElement,
} from "estree-jsx";
import {
  checkMatchingJSXOpeningElement,
  getAttribute,
  getFromPackage,
  getObjectProperty,
  ImportSpecifierWithParent,
  removeSpecifierFromDeclaration,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/11096
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const message =
      "We have replaced `splitButtonOptions` prop on MenuToggle with `splitButtonItems`. SplitButtonOptions interface has been removed, because its `variant` prop no longer supports the 'action' option. The `items` prop of SplitButtonOptions will be passed directly to MenuToggle's new `splitButtonItems` prop.";
    const interfaceRemovedMessage = `The SplitButtonOptions interface has been removed.`;

    const basePackage = "@patternfly/react-core";
    const { imports: menuToggleImports } = getFromPackage(
      context,
      basePackage,
      ["MenuToggle"]
    );
    const { imports: splitButtonOptionsImports } = getFromPackage(
      context,
      basePackage,
      ["SplitButtonOptions"]
    );
    const splitButtonOptionsLocalNames = splitButtonOptionsImports.map(
      (specifier) => specifier.local.name
    );

    if (!menuToggleImports && !splitButtonOptionsImports) {
      return;
    }

    return {
      JSXOpeningElement(node: JSXOpeningElement) {
        if (!checkMatchingJSXOpeningElement(node, menuToggleImports)) {
          return;
        }

        const splitButtonOptionsProp = getAttribute(node, "splitButtonOptions");

        if (
          !splitButtonOptionsProp ||
          splitButtonOptionsProp.value?.type !== "JSXExpressionContainer"
        ) {
          return;
        }

        const reportAndFix = (splitButtonItemsValue: string) => {
          context.report({
            node,
            message,
            fix(fixer) {
              return fixer.replaceText(
                splitButtonOptionsProp,
                `splitButtonItems={${splitButtonItemsValue}}`
              );
            },
          });
        };

        const reportAndFixIdentifier = (identifier: Identifier) => {
          reportAndFix(`${identifier.name}.items`);
        };

        const propValue = splitButtonOptionsProp.value.expression;
        if (propValue.type === "Identifier") {
          reportAndFixIdentifier(propValue);
        }

        if (propValue.type === "ObjectExpression") {
          const properties = propValue.properties.filter(
            (prop) => prop.type === "Property"
          ) as Property[];
          const itemsProperty = getObjectProperty(context, properties, "items");

          if (itemsProperty) {
            const itemsPropertyValueString = context
              .getSourceCode()
              .getText(itemsProperty.value);

            reportAndFix(itemsPropertyValueString);
          } else {
            const spreadElement = propValue.properties.find(
              (prop) => prop.type === "SpreadElement"
            ) as SpreadElement | undefined;
            if (spreadElement && spreadElement.argument.type === "Identifier") {
              reportAndFixIdentifier(spreadElement.argument);
            }
          }
        }
      },
      Identifier(node: Identifier) {
        const typeName = (node as any).typeAnnotation?.typeAnnotation?.typeName
          ?.name;

        if (splitButtonOptionsLocalNames.includes(typeName)) {
          context.report({
            node,
            message: interfaceRemovedMessage,
            fix(fixer) {
              return fixer.remove((node as any).typeAnnotation);
            },
          });
        }
      },
      ImportSpecifier(node: ImportSpecifier) {
        if (splitButtonOptionsImports.includes(node)) {
          context.report({
            node,
            message: interfaceRemovedMessage,
            fix(fixer) {
              return removeSpecifierFromDeclaration(
                fixer,
                context,
                (node as ImportSpecifierWithParent).parent!,
                node
              );
            },
          });
        }
      },
      ExportNamedDeclaration(node: ExportNamedDeclaration) {
        const specifierToRemove = node.specifiers.find((specifier) =>
          splitButtonOptionsLocalNames.includes(specifier.local.name)
        );
        if (specifierToRemove) {
          context.report({
            node,
            message: interfaceRemovedMessage,
            fix(fixer) {
              return removeSpecifierFromDeclaration(
                fixer,
                context,
                node,
                specifierToRemove
              );
            },
          });
        }
      },
      ExportDefaultDeclaration(node: ExportDefaultDeclaration) {
        if (
          node.declaration.type === "Identifier" &&
          splitButtonOptionsLocalNames.includes(node.declaration.name)
        ) {
          context.report({
            node,
            message: interfaceRemovedMessage,
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        }
      },
    };
  },
};
