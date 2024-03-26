import { Rule } from 'eslint';
import {
  JSXOpeningElement,
  ImportSpecifier,
  JSXIdentifier,
  JSXAttribute,
} from 'estree-jsx';

interface RenameConfig {
  newName: string;
  message?: string | ((node: any) => string);
  replace?: boolean;
}

interface ComponentRenames {
  [propName: string]: RenameConfig | string | Record<PropertyKey, never>;
}

export interface Renames {
  [componentName: string]: ComponentRenames;
}

function isRenameConfig(obj: any): obj is RenameConfig {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.newName === 'string' &&
    (obj.message === undefined ||
      typeof obj.message === 'string' ||
      typeof obj.message === 'function') &&
    (obj.replace === undefined || typeof obj.replace === 'boolean')
  );
}

export function renamePropsOnNode(
  context: Rule.RuleContext,
  imports: ImportSpecifier[],
  node: JSXOpeningElement,
  renames: Renames
) {
  node.name = node.name as JSXIdentifier;
  const componentName = imports.find(
    (imp) =>
      node.name.type === 'JSXIdentifier' && imp.local.name === node.name.name
  )?.imported.name;

  if (componentName) {
    const renamedProps = renames[componentName];
    node.attributes
      .filter(
        (attribute) =>
          attribute.type === 'JSXAttribute' &&
          attribute.name.type === 'JSXIdentifier' &&
          renamedProps.hasOwnProperty(attribute.name?.name)
      )
      .forEach((attribute) => {
        attribute = attribute as JSXAttribute;
        attribute.name = attribute.name as JSXIdentifier;
        const newPropObject = renamedProps[attribute.name.name];

        const message =
          isRenameConfig(newPropObject) && newPropObject.message
            ? newPropObject.message instanceof Function
              ? newPropObject.message(node)
              : newPropObject.message
            : undefined;

        if (
          (isRenameConfig(newPropObject) && newPropObject.newName !== '') ||
          (typeof newPropObject === 'string' && newPropObject !== '')
        ) {
          const newName = isRenameConfig(newPropObject)
            ? newPropObject.newName
            : newPropObject;
          context.report({
            node,
            message:
              message ||
              `${attribute.name.name} prop for ${
                (node.name as JSXIdentifier).name
              } has been ${
                newPropObject.replace ? 'replaced with' : 'renamed to'
              } ${newName}`,
            fix(fixer) {
              return fixer.replaceText(
                newPropObject.replace
                  ? attribute
                  : (attribute as JSXAttribute).name,
                newName
              );
            },
          });
        } else {
          context.report({
            node,
            message:
              message ||
              `${attribute.name.name} prop for ${
                (node.name as JSXIdentifier).name
              } has been removed`,
            fix(fixer) {
              return fixer.replaceText(attribute, '');
            },
          });
        }
      });
  }
}
