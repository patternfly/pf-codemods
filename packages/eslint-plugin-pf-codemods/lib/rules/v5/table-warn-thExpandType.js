const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8634
module.exports = {
  meta: {},
  create: function (context) {
    const tableImport =  getPackageImports(context, '@patternfly/react-table')
    .filter(specifier => specifier.imported.name == 'Table' || specifier.imported.name === 'Th');

    return tableImport.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (tableImport.map(imp => imp.local.name).includes(node.name.name)) {
          const collapseAllAriaLabel = node.attributes.find(a => a.name?.name === 'collapseAllAriaLabel');
          if (collapseAllAriaLabel?.value?.expression?.type === 'TSAsExpression') {
            context.report({
              node,
              message: `collapseAllAriaLabel has been updated to a string type. Workarounds casting this property to an empty string are no longer required.`,
            });
          }
        }
      }
    };
  },
};
