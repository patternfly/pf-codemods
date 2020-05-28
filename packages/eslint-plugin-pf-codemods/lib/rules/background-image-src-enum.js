const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/3886
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'BackgroundImageSrc');
      
    return imports.length == 0 ? {} : {
      Property(node) {
        if (node.key.object && imports.map(imp => imp.local.name).includes(node.key.object.name)) {
          const size = node.key.property.name;
          if (size === 'filter') {
            context.report({
              node,
              message: `BackgroundImageSrc.filter has been removed. If you want a custom filter, use the new filter prop instead`,
              fix(fixer) {
                if (context.getSourceCode().getText(node, 0, 1).endsWith(',')) {
                  // Remove trailing ,
                  node.range[1]++;
                }
                return fixer.remove(node);
              }
            });
          }
          else {
            context.report({
              node,
              message: `BackgroundImageSrc.${size} has been removed. Use the string '${size}' instead`,
              fix(fixer) {
                return fixer.replaceText(node, `${size}: ${node.value.raw}`);
              }
            });
          }
        }
      }
    };
  }
};
