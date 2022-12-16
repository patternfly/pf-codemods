const { getPackageImports } = require('../../helpers');

const components = [
  'PageHeader',
  'PageHeaderTools'
]

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => components.includes(specifier.imported.name));

    return imports.length === 0 ? {} : {
      JSXElement(node) {
        // find avatar attribute
        let avatarValue;
        if (node.openingElement.name.name === 'PageHeader' && node.openingElement.attributes.length) {
          const avatarAttr = node.openingElement.attributes.find(attr => attr.name.name === 'avatar');
          const toolbarAttr = node.openingElement.attributes.find(attr => attr.name.name === 'toolbar');
          if (toolbarAttr) {
            // not ready yet this round, wait for other rules to kick in first
            return context.report({
              node,
              message: `avatar prop was removed from PageHeader, move the avatar component into PageHeaderTools`
            });
          }
          const headerToolsAttr = node.openingElement.attributes.find(attr => attr.name.name === 'headerTools');
          if (avatarAttr) {
            context.report({
              node,
              message: `avatar prop was removed from PageHeader, move the avatar component into PageHeaderTools`,
              fix(fixer) {
                if (!headerToolsAttr) {
                  // comment out
                  return fixer.replaceText(avatarAttr, `/*TODO: move to PageHeaderTools - ${context.getSourceCode().getText(avatarAttr)}*/`)
                } else {
                  // move into headerTools if possible
                  if (
                    headerToolsAttr.value.type === 'JSXExpressionContainer' && 
                    headerToolsAttr.value.expression.type === 'JSXElement' &&
                    headerToolsAttr.value.expression.openingElement.name.name === 'PageHeaderTools' &&
                    headerToolsAttr.value.expression.closingElement
                  ) {
                    const intermediateValue = context.getSourceCode().getText(avatarAttr.value);
                    if (avatarAttr.value.expression && avatarAttr.value.expression.type === 'JSXElement') {
                      avatarValue = `${intermediateValue.substring(1, intermediateValue.length - 1)}`;
                    } else {
                      avatarValue = intermediateValue;
                    }
                    return [
                      fixer.insertTextBefore(
                        headerToolsAttr.value.expression.closingElement,
                        avatarValue
                      ),
                      fixer.remove(avatarAttr)
                    ]
                  } else {
                    // well we tried... just comment it out then
                    return fixer.replaceText(avatarAttr, `/*TODO: move to PageHeaderTools - ${context.getSourceCode().getText(avatarAttr)}*/`)
                  }
                  
                }
              }
            });
          }
        }
      }
    };
  }
};