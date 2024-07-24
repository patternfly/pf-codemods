import { Rule } from "eslint";
import {
  JSXOpeningElement,
  ImportSpecifier,
  JSXAttribute,
  JSXIdentifier,
  ImportDefaultSpecifier,
  ImportDeclaration,
} from "estree-jsx";
import { renameSinglePropOnNode, Renames } from "./renameSinglePropOnNode";

interface ImportDefaultSpecifierWithParent extends ImportDefaultSpecifier {
  parent?: ImportDeclaration;
}

function getComponentName(
  specifier: ImportSpecifier | ImportDefaultSpecifierWithParent,
  renames: Renames
) {
  if (specifier.type === "ImportSpecifier") {
    return specifier.imported.name;
  }

  const localName = specifier.local.name;
  if (renames[localName]) {
    return localName;
  }

  const renamedComponents = Object.keys(renames);
  const importString = specifier?.parent?.source.value?.toString();

  for (const component of renamedComponents) {
    if (importString?.includes(component)) {
      return component;
    }
  }

  return "";
}

export function renamePropsOnNode(
  context: Rule.RuleContext,
  imports: (ImportSpecifier | ImportDefaultSpecifier)[],
  node: JSXOpeningElement,
  renames: Renames
) {
  const component = imports.find(
    (imp) =>
      node.name.type === "JSXIdentifier" && imp.local.name === node.name.name
  );

  if (!component) {
    return;
  }

  const componentName = getComponentName(component, renames);

  const renamedProps = renames[componentName];

  const JSXAttributes = node.attributes.filter(
    (attribute) =>
      attribute.type === "JSXAttribute" &&
      attribute.name.type === "JSXIdentifier" &&
      renamedProps.hasOwnProperty(attribute.name?.name)
  ) as JSXAttribute[];

  JSXAttributes.forEach((attribute) =>
    renameSinglePropOnNode(
      context,
      attribute,
      node,
      renamedProps[(attribute.name as JSXIdentifier).name]
    )
  );
}
