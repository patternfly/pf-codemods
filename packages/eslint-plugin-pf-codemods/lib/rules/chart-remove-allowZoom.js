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
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-charts');
    const victoryCoreImports = getPackageImports(context, 'victory-zoom-container');
    if (victoryCoreImports.length === 0) {
      const lastImportNode = context.getSourceCode().ast.body
        .filter(node => node.type === 'ImportDeclaration')
        .pop();
      const importStatement = `import { VictoryZoomContainer } from 'victory-zoom-container';`
      context.report({
        node: lastImportNode,
        message: `add missing ${importStatement}`,
        fix(fixer) {
          return fixer.insertTextAfter(lastImportNode, '\n' + importStatement)
        }
      });
    }

    return imports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        renameProps0(context, imports, node, renames);
      },
    };
  }
};
