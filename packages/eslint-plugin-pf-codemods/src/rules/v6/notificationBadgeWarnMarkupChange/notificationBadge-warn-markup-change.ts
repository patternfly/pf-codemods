import { getFromPackage } from '../../helpers';
import { Rule } from 'eslint';
import { ImportDeclaration } from 'estree-jsx';

// https://github.com/patternfly/patternfly-react/pull/10020
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, '@patternfly/react-core');

    const notificationBadgeImport = imports.find(
      (specifier) => specifier.imported.name === 'NotificationBadge'
    );

    return !notificationBadgeImport
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.specifiers.find(
                (specifier) =>
                  specifier.type === 'ImportSpecifier' &&
                  specifier.imported.name ===
                    notificationBadgeImport.imported.name
              )
            ) {
              context.report({
                node,
                message:
                  'The markup for NotificationBadge has changed, as it now uses stateful button internally.',
              });
            }
          },
        };
  },
};
