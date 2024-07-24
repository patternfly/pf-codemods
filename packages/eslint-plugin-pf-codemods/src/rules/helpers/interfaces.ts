import {
  Node,
  Identifier,
  ImportDefaultSpecifier,
  ImportDeclaration,
} from "estree-jsx";

export interface IdentifierWithParent extends Identifier {
  parent?: Node;
}

export interface ImportDefaultSpecifierWithParent
  extends ImportDefaultSpecifier {
  parent?: ImportDeclaration;
}
