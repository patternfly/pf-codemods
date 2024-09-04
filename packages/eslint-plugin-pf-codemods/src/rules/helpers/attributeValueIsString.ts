import { JSXAttribute } from "estree-jsx";

/** Checks if an attribute value is a string, either as a Literal: <Comp attr="value">
 * or a Literal in an expression container: <Comp attr={"value"}> */
export function attributeValueIsString(value: JSXAttribute["value"]) {
  return (
    (value?.type === "Literal" && typeof value.value === "string") ||
    (value?.type === "JSXExpressionContainer" &&
      value.expression.type === "Literal" &&
      typeof value.expression.value === "string")
  );
}
