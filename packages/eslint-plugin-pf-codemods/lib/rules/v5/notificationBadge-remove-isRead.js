const { getPackageImports } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8626
  module.exports = {
    meta: { fixable: 'code' },
    create: function(context) {
      const imports = getPackageImports(context, '@patternfly/react-core')
        .filter(specifier => 'NotificationBadge' === specifier.imported.name);
      const nbImport = imports?.length && imports[0];
      return !nbImport ? {} : {
        JSXOpeningElement(node) {
          if (nbImport.local.name === node.name.name) {
            const isReadAttr = node.attributes.find(a => a.name?.name === 'isRead');
            if (!isReadAttr) {
              return;
            }
            const attrValType = isReadAttr.value?.expression?.type;
            let attrValStr = !attrValType ? '' : context.getSourceCode().getText(isReadAttr.value.expression);
            let newVal = "";
            if (attrValType === undefined || (attrValType === "Literal" && attrValStr === "true")) {
              newVal = '"read"';
            } else if (attrValType === "Literal" && attrValStr === "false") {
              newVal = '"unread"';
            } else {
              if (attrValType !== "Identifier") {
                attrValStr = `(${attrValStr})`;
              }
              newVal = `{${attrValStr} ? "read" : "unread"}`
            }
            context.report({
              node,
              message: `the isRead prop on NotificationBadge has been removed, use variant prop with "read" or "unread"`,
              fix(fixer) {
                return fixer.replaceText(isReadAttr, `variant=${newVal}`);
              }
            });
          }
        }
      }
    }
  };
