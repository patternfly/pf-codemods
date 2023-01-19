const { getPackageImports } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8235
  module.exports = {
    meta: {},
    create: function(context) {
      const propsImport = getPackageImports(context, '@patternfly/react-core')
        .filter(specifier => specifier.imported.name == 'ToggleMenuBaseProps');
  
      return propsImport.length === 0 ? {} : {
        JSXOpeningElement(node) {
          if (propsImport.map(imp => imp.local.name).includes(node.name.name)) {
            context.report({
              node,
              message: `The ToggleMenuBaseProps interface has been removed.`
            });
          }
        }
      };
    }
  };