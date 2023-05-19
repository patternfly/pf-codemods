const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4190
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const imports = getFromPackage(
      context,
      "@patternfly/react-core"
    ).imports.filter((specifier) => specifier.imported.name === "Alert");
      
    return imports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name?.name === 'action');
          if (attribute) {
            const attributeValue = context.getSourceCode().getText(attribute.value);
            const isLink = attributeValue.includes('Link');
            context.report({
              node,
              message: `action prop for ${node.name.name} has been replaced with actionLinks or actionClose`,
              fix(fixer) {
                return fixer.replaceText(attribute.name, isLink ? 'actionLinks' : 'actionClose');
              }
            });
          }
        }
      }
    };
  }
};
