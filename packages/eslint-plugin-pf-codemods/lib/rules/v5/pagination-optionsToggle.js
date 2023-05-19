const { getFromPackage } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8319
  module.exports = {
    meta: {},
    create: function(context) {
      const optionsToggleImport = getFromPackage(context, '@patternfly/react-core')
        .imports.filter(specifier => specifier.imported.name == 'OptionsToggle');
  
      return optionsToggleImport.length === 0 ? {} : {
        JSXOpeningElement(node) {
          if (optionsToggleImport.map(imp => imp.local.name).includes(node.name.name)) {
            context.report({
              node,
              message: `OptionsToggle has been removed and MenuToggle should be used instead. PaginationOptionsMenu has been refactored to use MenuToggle.`
            });
          }
        }
      };
    }
  };