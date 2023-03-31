const { renameProp, getPackageImports} = require('../../helpers');

//https://github.com/patternfly/patternfly-react/pull/8827
module.exports = {
  meta: {},
  create: function (context) {
    const dataListImport =  getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name == 'DataList');

    return dataListImport.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (dataListImport.map(imp => imp.local.name).includes(node.name.name)) {
          const selectableRow = node.attributes.find(a => a.name?.name === 'selectableRow');
          if (selectableRow) {
            context.report({
              node,
              message: `DataList's selectableRow property has been replaced with onSelectableRowChange. The order of the params in the callback has also been updated so that the event param is first.`,
            });
          }
        }
      }
    };
  },
};

