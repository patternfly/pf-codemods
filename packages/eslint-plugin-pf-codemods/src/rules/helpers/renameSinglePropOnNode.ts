import { JSXAttribute, JSXIdentifier, JSXOpeningElement } from 'estree-jsx';

import { Rule } from 'eslint';

export interface RenameConfig {
  newName: string;
  message?: string | ((node: any) => string);
  replace?: boolean;
}

type RenameInput = RenameConfig | string | Record<PropertyKey, never>;

export interface ComponentRenames {
  [propName: string]: RenameInput;
}

export interface Renames {
  [componentName: string]: ComponentRenames;
}

function checkIsRenameConfig(
  renameInput: RenameInput
): renameInput is RenameConfig {
  const hasValidObjectType =
    typeof renameInput === 'object' && renameInput !== null;

  if (!hasValidObjectType) {
    return false;
  }

  if (
    typeof renameInput === 'string' ||
    Object.keys(renameInput).length === 0
  ) {
    return false;
  }

  const hasValidNewNameType = typeof renameInput.newName === 'string';

  const isValidMessage =
    renameInput.message === undefined ||
    typeof renameInput.message === 'string' ||
    typeof renameInput.message === 'function';

  const isValidReplace =
    renameInput.replace === undefined ||
    typeof renameInput.replace === 'boolean';

  return hasValidNewNameType && isValidMessage && isValidReplace;
}

const getNewName = (replaced: boolean, propRename: RenameInput) => {
  const isRenameConfig = checkIsRenameConfig(propRename);

  const isString = typeof propRename === 'string';

  if (!replaced || (!isRenameConfig && !isString)) {
    return '';
  }
  return isRenameConfig ? propRename.newName : propRename;
};

const getAction = (replaced: boolean, propRename: RenameInput) => {
  if (!replaced) {
    return 'removed';
  }
  return propRename.replace ? 'replaced with ' : 'renamed to ';
};

const getMessage = (
  node: JSXOpeningElement,
  propRename: RenameInput,
  defaultMessage: string
) => {
  if (!checkIsRenameConfig(propRename) || !propRename.message) {
    return defaultMessage;
  }

  return propRename.message instanceof Function
    ? propRename.message(node)
    : propRename.message;
};

const getFixer = (
  attribute: JSXAttribute,
  propRename: RenameInput,
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
  propRename: RenameInput
) {
  if (attribute.name.type !== 'JSXIdentifier') {
    return;
  }

  const isRenameConfig = checkIsRenameConfig(propRename);

  const isReplaced =
    (isRenameConfig && propRename.newName !== '') ||
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
