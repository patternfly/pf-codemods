const { getFromPackage, ensureImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4146
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const tabImport = getFromPackage(context, '@patternfly/react-core')
      .imports.filter(specifier => specifier.imported.name === 'Tab');
    
    return tabImport.length === 0 ? {} : {
      ImportDeclaration(node) {
        ensureImports(context, node, '@patternfly/react-core', ['TabTitleText', 'TabTitleIcon']);
      },
      JSXOpeningElement(node) {
        if (tabImport.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'title');
          if (attribute) {
            const { value } = attribute;
            const valueText = context.getSourceCode().getText(value);
            if (valueText.indexOf('TabTitleText') !== -1 || valueText.indexOf('TabTitleIcon') !== -1) {
              return;
            }
            let replacement;
            if (value.type === 'Literal') {
              // i.e. title="Title"
              replacement = fixer => [
                fixer.replaceText(value, `{<TabTitleText>${value.value}</TabTitleText>}`)
              ];
            } else if (value.type === 'JSXExpressionContainer') {
              if (value.expression.type === 'Literal') {
                // i.e. title={'Title'} or title={100}
                replacement = fixer => [
                  fixer.replaceText(value, `{<TabTitleText>${value.expression.value}</TabTitleText>}`)
                ];
              } else if (value.expression.type === 'Identifier' || value.expression.type === 'MemberExpression') {
                // i.e. title={myVariable} or title={tab.title}
                replacement = fixer => [
                  fixer.replaceText(value, `{<TabTitleText>${valueText}</TabTitleText>}`)
                ];
              } else if (value.expression.type === 'JSXElement' || value.expression.type === 'JSXFragment') {
                if (value.expression.children.length === 0) {
                  // simple case no children
                  if (value.expression.openingElement && value.expression.openingElement.name.name.indexOf('Icon') > -1) {
                    // i.e. title={<UserIcon />}
                    replacement = fixer => [
                      fixer.insertTextBefore(value.expression, `<TabTitleIcon>`),
                      fixer.insertTextAfter(value.expression, `</TabTitleIcon>`)
                    ];
                  } else {
                    // i.e. title={<MyComp />}
                    replacement = fixer => [
                      fixer.insertTextBefore(value.expression, `<TabTitleText>`),
                      fixer.insertTextAfter(value.expression, `</TabTitleText>`)
                    ];
                  }
                } else if (value.expression.children.length === 1) {
                  // 1 child, i.e. title={<div><UserIcon /></div>}
                  const childIsIcon = value.expression.children[0].openingElement && value.expression.children[0].openingElement.name.name.indexOf('Icon') > -1;
                  if (value.expression.children[0].type === 'JSXElement') {
                    replacement = fixer => [
                      fixer.insertTextBefore(value.expression.children[0], childIsIcon ? `<TabTitleIcon>` : `<TabTitleText>`),
                      fixer.insertTextAfter(value.expression.children[0], childIsIcon ? `</TabTitleIcon>` : `</TabTitleText>`)
                    ];
                  } else {
                    // something other than JSXElement
                    replacement = fixer => [
                      fixer.insertTextBefore(value.expression.children[0], `<TabTitleText>`),
                      fixer.insertTextAfter(value.expression.children[0], `</TabTitleText>`)
                    ];
                  }
                } else {
                  // 2 or more children i.e. title={<div><UserIcon /> Text {textVar}</div>}
                  if (value.expression.children[0].type === 'JSXElement' && value.expression.children[0].openingElement.name.name.indexOf('Icon') > -1) {
                    // try to fix more common use-case of icon followed by text
                    replacement = fixer => [
                      fixer.insertTextBefore(value.expression.children[0], `<TabTitleIcon>`),
                      fixer.insertTextAfter(value.expression.children[0], `</TabTitleIcon>`),
                      fixer.insertTextBefore(value.expression.children[1], `<TabTitleText>`),
                      fixer.insertTextAfter(value.expression.children[value.expression.children.length - 1], `</TabTitleText>`)
                    ];
                  } else {
                    replacement = fixer => [
                      fixer.insertTextBefore(value.expression, `<TabTitleText>`),
                      fixer.insertTextAfter(value.expression, `</TabTitleText>`)
                    ];
                  }
                }
              }
            }
            if (replacement) {
              context.report({
                node,
                message: `title needs to be wrapped with the TabTitleText and/or TabTitleIcon component`,
                fix(fixer) {
                  return replacement(fixer)
                }
              });
            }
          }
        }
      }
    };
  }
};
