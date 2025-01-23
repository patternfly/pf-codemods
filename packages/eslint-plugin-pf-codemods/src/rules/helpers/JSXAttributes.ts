import { Rule, Scope } from "eslint";
import {
  Expression,
  JSXAttribute,
  JSXElement,
  JSXEmptyExpression,
  JSXFragment,
  JSXOpeningElement,
  MemberExpression,
} from "estree-jsx";

/**
 * Use inline to pair with other logic, such as to get the value of an attribute or call logic based on the attribute being present or not.
 * @param node The node in which to find a specified attribute.
 * @param attributeName An attribute name to find on the node.
 * @returns The found JSXAttribute object, or undefined if the attribute is not found.
 */
export function getAttribute(
  node: JSXElement | JSXOpeningElement,
  attributeName: string
) {
  const nodeProperty = node.type === "JSXElement" ? node.openingElement : node;
  return nodeProperty.attributes.find(
    (attr) => attr.type === "JSXAttribute" && attr.name.name === attributeName
  ) as JSXAttribute | undefined;
}

/**
 * Use inline to pair with other logic based on whether any of the specified attributes are present, but not necessarily important which ones are.
 * @param node The node in which to find a specified attribute.
 * @param attributeNames An array of attribute names to find on the node.
 * @returns The first found JSXAttribute object, or undefined if none are found.
 */
export function getAnyAttribute(
  node: JSXElement | JSXOpeningElement,
  attributeNames: string[]
) {
  let foundAttribute = undefined;
  for (const attribute of attributeNames) {
    foundAttribute = getAttribute(node, attribute);

    if (foundAttribute) {
      break;
    }
  }

  return foundAttribute;
}

/**
 * Use inline to pair with other logic (such as getting attribute values or calling logic based on an attribute being present or not) and when you need to get several attributes at once.
 * @param node - The node in which to find the specified attributes.
 * @param attributeNames - An array of attribute names to find on the node.
 * @returns An object containing key:value pairs of the attribute names and either their found JSXAttribute object or undefined.
 */
export function getSpecifiedAttributes(
  node: JSXElement | JSXOpeningElement,
  attributeNames: string[]
) {
  const foundAttributes: { [attributeName: string]: JSXAttribute | undefined } =
    {};
  for (const attribute of attributeNames) {
    foundAttributes[attribute] = getAttribute(node, attribute);
  }

  return foundAttributes;
}

export function getAttributeValue(
  context: Rule.RuleContext,
  node?: JSXAttribute["value"]
) {
  if (!node) {
    return;
  }

  const valueType = node.type;

  if (valueType === "Literal") {
    return node.value;
  }

  if (valueType !== "JSXExpressionContainer") {
    return;
  }

  if (node.expression.type === "Identifier") {
    const variableScope = context.getSourceCode().getScope(node);
    return getVariableValue(node.expression.name, variableScope, context);
  }
  if (node.expression.type === "MemberExpression") {
    return getMemberExpression(node.expression);
  }
  if (node.expression.type === "Literal") {
    return node.expression.value;
  }
  if (node.expression.type === "ObjectExpression") {
    return node.expression.properties;
  }
}

export function getExpression(node?: JSXAttribute["value"]) {
  if (!node) {
    return;
  }

  if (node.type === "JSXExpressionContainer") {
    return node.expression as Expression | JSXEmptyExpression | JSXFragment;
  }
}

function getMemberExpression(node: MemberExpression) {
  if (!node) {
    return;
  }
  const { object, property } = node;

  return { object, property };
}

export function getVariableDeclaration(
  name: string,
  scope: Scope.Scope | null
) {
  while (scope !== null) {
    const variable = scope.variables.find((v) => v.name === name);

    if (variable) {
      return variable;
    }

    scope = scope.upper;
  }
  return undefined;
}

export function getVariableValue(
  name: string,
  scope: Scope.Scope | null,
  context: Rule.RuleContext
) {
  const variableDeclaration = getVariableDeclaration(name, scope);
  if (!variableDeclaration) {
    return;
  }

  const variableInit = variableDeclaration.defs.length
    ? variableDeclaration.defs[0].node.init
    : undefined;

  if (!variableInit) {
    return;
  }
  if (variableInit.type === "Identifier") {
    return getVariableValue(
      variableInit.name,
      context.getSourceCode().getScope(variableInit),
      context
    );
  }
  if (variableInit.type === "Literal") {
    return variableInit.value;
  }
  if (variableInit.type === "MemberExpression") {
    return getMemberExpression(variableInit);
  }
  if (variableInit.type === "ObjectExpression") {
    return variableInit.properties;
  }
}
