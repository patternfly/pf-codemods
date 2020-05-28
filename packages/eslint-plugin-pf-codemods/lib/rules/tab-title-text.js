const { getPackageImports, ensureImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4146
module.exports = {
  create: function(context) {
    const tabImport = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Tab');
    
    return tabImport.length === 0 ? {} : {
      ImportDeclaration(node) {
        ensureImports(context, node, '@patternfly/react-core', ['TabTitleText']);
      },
      JSXOpeningElement(node) {
        if (tabImport.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'title');
          if (attribute) {
            const { value } = attribute;
            let replacement;
            if (value.type === 'Literal') {
              // i.e. title="Title"
              replacement = fixer => [
                fixer.replaceText(attribute.value, `{<TabTitleText>${attribute.value.value}</TabTitleText>}`)
              ];
            } else if (value.type === 'JSXExpressionContainer') {
              if (value.expression.type === 'Literal') {
                // i.e. title={'Title'} or title={100}
                replacement = fixer => [
                  fixer.replaceText(attribute.value, `{<TabTitleText>${attribute.value.expression.value}</TabTitleText>}`)
                ];
              } else if (value.expression.type === 'Identifier') {
                // i.e. title={myVariable}
                replacement = fixer => [
                  fixer.replaceText(attribute.value, `{<TabTitleText>{${attribute.value.expression.name}}</TabTitleText>}`)
                ];
              } else if (value.expression.type === 'JSXElement' && value.expression.openingElement.name.name !== 'TabTitleText') {
                // i.e. title={<Mycomp2 />}
                replacement = fixer => [
                  fixer.insertTextBefore(attribute.value.expression, `<TabTitleText>`),
                  fixer.insertTextAfter(attribute.value.expression, `</TabTitleText>`)
                ];
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
