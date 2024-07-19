import { Rule } from 'eslint';
import {
  JSXOpeningElement,
  ImportSpecifier,
  JSXAttribute,
  JSXIdentifier,
} from 'estree-jsx';
import { renameSinglePropOnNode, Renames } from './renameSinglePropOnNode';

export function renamePropsOnNode(
  context: Rule.RuleContext,
  imports: ImportSpecifier[],
  node: JSXOpeningElement,
  renames: Renames
) {
  const componentName = imports.find(
    (imp) =>
      node.name.type === 'JSXIdentifier' && imp.local.name === node.name.name
  )?.imported.name;

  if (!componentName) {
    return;
  }

  const renamedProps = renames[componentName];

  const JSXAttributes = node.attributes.filter(
    (attribute) =>
      attribute.type === 'JSXAttribute' &&
      attribute.name.type === 'JSXIdentifier' &&
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
