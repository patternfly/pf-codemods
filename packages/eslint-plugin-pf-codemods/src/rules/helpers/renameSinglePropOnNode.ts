import { JSXAttribute, JSXIdentifier, JSXOpeningElement } from 'estree-jsx';
import { RenameConfig } from './renamePropsOnNode';
import { Rule } from 'eslint';

function isRenameConfig(obj: any): obj is RenameConfig {
  const hasValidObjectType = typeof obj === 'object' && obj !== null;

  const hasValidNewNameType = typeof obj.newName === 'string';

  const isValidMessage =
    obj.message === undefined ||
    typeof obj.message === 'string' ||
    typeof obj.message === 'function';

  const isValidReplace =
    obj.replace === undefined || typeof obj.replace === 'boolean';

  return (
    hasValidObjectType &&
    hasValidNewNameType &&
    isValidMessage &&
    isValidReplace
  );
}

const getNewName = (
  replaced: boolean,
  propRename: RenameConfig | string | Record<PropertyKey, never>
) => {
  if (!replaced) return '';
  return (
    isRenameConfig(propRename) ? propRename.newName : propRename
  ) as string;
};

const getAction = (
  replaced: boolean,
  propRename: RenameConfig | string | Record<PropertyKey, never>
) => {
  if (!replaced) return 'removed';
  return propRename.replace ? 'replaced with ' : 'renamed to ';
};

const getMessage = (
  node: JSXOpeningElement,
  propRename: RenameConfig | string | Record<PropertyKey, never>,
  defaultMessage: string
) => {
  if (!isRenameConfig(propRename) || !propRename.message) return defaultMessage;

  return propRename.message instanceof Function
    ? propRename.message(node)
    : propRename.message;
};

const getFixer = (
  attribute: JSXAttribute,
  propRename: RenameConfig | string | Record<PropertyKey, never>,
  newName: string
) => {
  const toReplace =
    propRename.replace || newName === '' ? attribute : attribute.name;
  return (fixer: Rule.RuleFixer) => fixer.replaceText(toReplace, newName);
};

export function renameSinglePropOnNode(
  context: Rule.RuleContext,
  attribute: JSXAttribute,
  node: JSXOpeningElement,
  propRename: RenameConfig | string | Record<PropertyKey, never>
) {
  if (attribute.name.type !== 'JSXIdentifier') return;

  const isConfig = isRenameConfig(propRename);

  const isReplaced =
    (isConfig && propRename.newName !== '') ||
    (typeof propRename === 'string' && propRename !== '');

  const action = getAction(isReplaced, propRename);

  const newName = getNewName(isReplaced, propRename);

  const defaultMessage = `${attribute.name.name} prop for ${
    (node.name as JSXIdentifier).name
  } has been ${action}${newName}`;
  const message = getMessage(node, propRename, defaultMessage);

  context.report({
    node,
    message,
    fix: getFixer(attribute, propRename, newName),
  });
}
