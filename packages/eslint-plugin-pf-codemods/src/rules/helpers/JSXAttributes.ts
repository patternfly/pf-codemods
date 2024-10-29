import { Rule, Scope } from "eslint";
import {
  Expression,
  JSXAttribute,
  JSXElement,
  JSXEmptyExpression,
  JSXFragment,
  JSXOpeningElement,
  MemberExpression,
  Property,
} from "estree-jsx";

export function getAttribute(
  node: JSXElement | JSXOpeningElement,
  attributeName: string
) {
  const nodeProperty = node.type === "JSXElement" ? node.openingElement : node;
  return nodeProperty.attributes.find(
    (attr) => attr.type === "JSXAttribute" && attr.name.name === attributeName
  ) as JSXAttribute | undefined;
}

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
    return node.expression;
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
    return variableInit.value as string;
  }
  if (variableInit.type === "MemberExpression") {
    return variableInit as MemberExpression;
  }
  if (variableInit.type === "ObjectExpression") {
    return variableInit.properties as Property[];
  }
}
