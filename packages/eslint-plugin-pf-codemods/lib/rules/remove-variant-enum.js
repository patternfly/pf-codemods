const { getPackageImports } = require('../helpers');

module.exports = {
  create: function(context) {
    const variantEnumImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name.endsWith('Variant'));

    return !variantEnumImports ? {} : {
      JSXExpressionContainer(node) {
        if (node.expression && node.expression.object && variantEnumImports.map(imp => imp.local.name).includes(node.expression.object.name)) {
          const variantValue = node.expression.property.name;
          context.report({
            node,
            message: `Use string value "${variantValue}" instead of ${node.expression.object.name}.${variantValue}`,
            fix(fixer) {
              return fixer.replaceText(node, `"${variantValue}"`);
            }
          });
        }
      }
    };
  }
};