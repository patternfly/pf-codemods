const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) => specifier.imported.name === "Pagination");
      
    return imports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'variant');
          if (attribute) {
            const attributeValue = context.getSourceCode().getText(attribute.value);
            if (/left|right/.test(attributeValue))
              context.report({
                node,
                message: `variant ${attributeValue} has been removed from ${node.name.name}`,
                fix(fixer) {
                  return fixer.replaceText(attribute, '');
                }
              });
          }
        }
      }
    };
  }
};
