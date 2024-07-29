import {
  Node,
  Identifier,
  ImportDefaultSpecifier,
  ImportDeclaration,
  JSXOpeningElement,
  JSXElement,
} from "estree-jsx";

export interface IdentifierWithParent extends Identifier {
  parent?: Node;
}

export interface ImportDefaultSpecifierWithParent
  extends ImportDefaultSpecifier {
  parent?: ImportDeclaration;
}

export interface JSXOpeningElementWithParent extends JSXOpeningElement {
  parent?: JSXElement;
}
