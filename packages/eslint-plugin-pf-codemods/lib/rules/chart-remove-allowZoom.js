const { renameProps0, getPackageImports, ensureImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4278
const renames = {
  'Chart': {
    allowZoom: 'containerComponent={<VictoryZoomContainer />}'
  },
  'ChartGroup': {
    allowZoom: ''
  }
};

module.exports = {
  meta: {
    messages: {
      missingImportMsg: "`add missing imports {{ missingImports }} from {{ ensurePackage }}",
    },
    fixable: "code",
    schema: []
  },
  create: function(context) {
      const imports = getPackageImports(context, '@patternfly/react-charts');
      return imports.length === 0 ? {} : {
        JSXOpeningElement(node) {
          renameProps0(context, imports, node, renames);
        },
        ImportDeclaration(node) {
          ensureImports(context, node, 'victory-zoom-container', [ 'VictoryZoomContainer' ])
        }
      };
    }
};
