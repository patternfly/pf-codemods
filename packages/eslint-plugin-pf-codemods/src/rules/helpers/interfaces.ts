import { Node, Identifier } from "estree-jsx";

export interface IdentifierWithParent extends Identifier {
  parent?: Node;
}
