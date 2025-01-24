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
  SpreadElement,
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

/**
 * Attribute value and its type
 */
type Attribute =
  | { type: "string"; value: string }
  | {
      type: "Literal";
      value: string | number | bigint | boolean | RegExp | null | undefined;
    }
  | { type: "MemberExpression"; value: MemberExpression }
  | { type: "ObjectExpression"; value: (Property | SpreadElement)[] }
  | { type: "undefined"; value: undefined };

const UNDEFINED: Attribute = { type: "undefined", value: undefined };

/**
 * Helper to get the raw value from a JSXAttribute value. If the JSXAttribute value is an Identifier, it tries to get the value of that variable. If the JSXAttribute value is a JSXExpressionContainer: {"value"}, it returns the inner content.
 * MemberExpressions and ObjectExpressions are not parsed further.
 * @param context Rule context
 * @param node JSXAttribute value
 * @returns Attribute in this form: { type: [specific type of the returned value], value: [actual value]}. Literal types are further processed, if their value is of type "string", type: "string" is returned, otherwise type: "Literal"
 */
export function getAttributeValue(
  context: Rule.RuleContext,
  node?: JSXAttribute["value"]
): Attribute {
  if (!node) {
    return UNDEFINED;
  }

  const valueType = node.type;

  if (valueType === "Literal") {
    if (typeof node.value === "string") {
      return { type: "string", value: node.value };
    }
    return { type: "Literal", value: node.value };
  }

  if (valueType !== "JSXExpressionContainer") {
    return UNDEFINED;
  }

  if (node.expression.type === "Identifier") {
    const variableScope = context.getSourceCode().getScope(node);
    return getVariableValue(node.expression.name, variableScope, context);
  }
  if (node.expression.type === "MemberExpression") {
    return { type: "MemberExpression", value: node.expression };
  }
  if (node.expression.type === "Literal") {
    if (typeof node.expression.value === "string") {
      return { type: "string", value: node.expression.value };
    }
    return { type: "Literal", value: node.expression.value };
  }
  if (node.expression.type === "ObjectExpression") {
    return { type: "ObjectExpression", value: node.expression.properties };
  }
  return UNDEFINED;
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

export function getVariableInit(
  variableDeclaration: Scope.Variable | undefined
) {
  if (!variableDeclaration || !variableDeclaration.defs.length) {
    return;
  }

  const variableDefinition = variableDeclaration.defs[0];

  if (variableDefinition.type !== "Variable") {
    return;
  }

  return variableDefinition.node.init;
}

/**
 * Helper to get the raw value of a variable, given by its name. Returns an Attribute object, similarly to getAttributeValue helper.
 * @param name Variable name
 * @param scope Scope where to look for the variable declaration
 * @param context Rule context
 * @returns Attribute in this form: { type: [specific type of the returned value], value: [actual value]}. Literal types are further processed, if their value is of type "string", type: "string" is returned, otherwise type: "Literal"
 */
export function getVariableValue(
  name: string,
  scope: Scope.Scope | null,
  context: Rule.RuleContext
): Attribute {
  const variableDeclaration = getVariableDeclaration(name, scope);
  const variableInit = getVariableInit(variableDeclaration);

  if (!variableInit) {
    return UNDEFINED;
  }
  if (variableInit.type === "Identifier") {
    return getVariableValue(
      variableInit.name,
      context.getSourceCode().getScope(variableInit),
      context
    );
  }
  if (variableInit.type === "Literal") {
    if (typeof variableInit.value === "string") {
      return { type: "string", value: variableInit.value };
    }
    return { type: "Literal", value: variableInit.value };
  }
  if (variableInit.type === "MemberExpression") {
    return { type: "MemberExpression", value: variableInit };
  }
  if (variableInit.type === "ObjectExpression") {
    return { type: "ObjectExpression", value: variableInit.properties };
  }
  return UNDEFINED;
}
