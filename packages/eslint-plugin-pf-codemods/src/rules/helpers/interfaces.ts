import {
  Node,
  Identifier,
  ImportSpecifier,
  ImportDefaultSpecifier,
  ImportDeclaration,
  JSXOpeningElement,
  JSXElement,
} from "estree-jsx";

export interface IdentifierWithParent extends Identifier {
  parent?: Node;
}

export interface ImportSpecifierWithParent extends ImportSpecifier {
  parent?: ImportDeclaration;
}
export interface ImportDefaultSpecifierWithParent
  extends ImportDefaultSpecifier {
  parent?: ImportDeclaration;
}

export interface JSXElementWithParent extends JSXElement {
  parent?: JSXElement;
}

export interface JSXOpeningElementWithParent extends JSXOpeningElement {
  parent?: JSXElementWithParent;
}
