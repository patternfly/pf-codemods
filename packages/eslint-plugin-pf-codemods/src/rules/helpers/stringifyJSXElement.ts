import { Rule } from "eslint";
import {
  JSXAttribute,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName,
  JSXElement,
  Expression,
} from "estree-jsx";
import { getAttributeValue } from "./JSXAttributes";

// new interfaces, just local for now to avoid conflicts with the masthead rename RP
interface JSXElementWithParent extends JSXElement {
  parent?: JSXElement;
}

// Similar story here, will use the getName helper from my other PR once it goes in
function getName(
  nodeName: JSXIdentifier | JSXMemberExpression | JSXNamespacedName
) {
  switch (nodeName.type) {
    case "JSXIdentifier":
      return nodeName.name;
    case "JSXMemberExpression":
      return getName(nodeName.object);
    case "JSXNamespacedName":
      return nodeName.namespace.name;
  }
}

// same story here, will remove this from this file once the other PR is in and I can merge it into this branch
function getAttributeName(attr: JSXAttribute) {
  switch (attr.name.type) {
    case "JSXIdentifier":
      return attr.name.name;
    case "JSXNamespacedName":
      return attr.name.name.name;
  }
}

/** Gets a string representation of an element including props and children */
export function stringifyJSXElement(
  context: Rule.RuleContext,
  node: JSXElementWithParent
) {
  const { openingElement, children, closingElement } = node;

  let str = "<";

  str += getName(openingElement.name);

  if (openingElement.attributes.length) {
    const nonSpreadAttributes = openingElement.attributes.filter(
      (attr) => attr.type === "JSXAttribute"
    );
    nonSpreadAttributes.forEach((attr) => {
      const attrName = getAttributeName(attr as JSXAttribute);

      const attrValue = getAttributeValue(
        context,
        (attr as JSXAttribute).value
      );

      const attrValueWrapper =
        typeof attrValue === "string" ? `"${attrValue}"` : `{${attrValue}}`;

      str += ` ${attrName}=${attrValueWrapper}`;
    });
  }

  if (openingElement.selfClosing) {
    str += "/";
  }

  str += ">";

  children.forEach((child) => {
    switch (child.type) {
      case "JSXElement":
        str += stringifyJSXElement(context, child as JSXElementWithParent);
        break;
      case "JSXText":
        str += child.raw;
        break;
      case "JSXExpressionContainer":
      case "JSXSpreadChild":
      case "JSXFragment":
    }
  });

  if (closingElement) {
    str += `</${getName(closingElement.name)}>`;
  }

  return str;
}
