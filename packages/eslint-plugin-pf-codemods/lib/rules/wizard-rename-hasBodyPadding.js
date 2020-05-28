const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4136
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'Wizard');
    const sourceCode = context.getSourceCode();
      
    return imports.length == 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'hasBodyPadding');
          if (attribute) {
            context.report({
              node,
              message: 'The Wizard hasBodyPadding prop was removed in favor of hasNoBodyPadding',
              fix(fixer) {
                const attrText = sourceCode.getText(attribute);
                const attrValue = attrText.split('=')[1];
                let fixes = [];
                if (!attrValue) {
                  // Used hasBodyPadding without value which implicitly means true, thus we can remove the prop
                  fixes.push(fixer.remove(attribute));
                } else {
                  if (attrValue.indexOf('false') > -1) {
                    // hasBodyPadding={false} -> replace with hasNoBodyPadding
                    fixes.push(fixer.replaceText(attribute, 'hasNoBodyPadding'));
                  } else if (attrValue.indexOf('true') > -1) {
                    // hasBodyPadding={true} -> remove prop
                    fixes.push(fixer.remove(attribute));
                  }
                }
                return fixes;
              }
            });
          }
        }
      }
    };
  }
};
