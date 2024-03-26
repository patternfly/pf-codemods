import { Rule } from 'eslint';
import {
  JSXOpeningElement,
  ImportSpecifier,
  JSXAttribute,
  JSXIdentifier,
} from 'estree-jsx';
import { renameSinglePropOnNode } from './renameSinglePropOnNode';

export interface RenameConfig {
  newName: string;
  message?: string | ((node: any) => string);
  replace?: boolean;
}

export interface ComponentRenames {
  [propName: string]: RenameConfig | string | Record<PropertyKey, never>;
}

export interface Renames {
  [componentName: string]: ComponentRenames;
}

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

  if (!componentName) return;

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
