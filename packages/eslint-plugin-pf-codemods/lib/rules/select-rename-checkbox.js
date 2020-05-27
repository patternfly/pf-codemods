const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/3945
// CheckboxSelectOption -> SelectOption
// CheckboxSelect -> Select variant="checkbox"
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => ['CheckboxSelect', 'CheckboxSelectOption'].includes(specifier.imported.name));
      
    return imports.length === 0 ? {} : {
      JSXIdentifier(node) {
        const imp = imports.find(imp => imp.local.name === node.name);
        if (imp) {
          if (imp.imported.name === 'CheckboxSelect') {
            context.report({
              node,
              message: `${node.name} has been removed. Use <Select variant="checkbox"> instead.`,
              fix(fixer) {
                const replacement = node.parent.type === 'JSXOpeningElement' ? 'Select variant="checkbox"' : 'Select';
                return fixer.replaceText(node, replacement);
              }
            });
          }
          else if (imp.imported.name === 'CheckboxSelectOption') {
            context.report({
              node,
              message: `${node.name} has been removed. Use <SelectOption> instead.`,
              fix(fixer) {
                return fixer.replaceText(node, 'SelectOption');
              }
            });
          }
        }
      }
    };
  }
};
