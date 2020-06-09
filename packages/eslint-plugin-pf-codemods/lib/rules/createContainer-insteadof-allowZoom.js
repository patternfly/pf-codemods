const { renameProps0, getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4278
const renames = {
  'Chart': {
    allowZoom: 'containerComponent={<VictoryZoomContainer />}'
  },
  'ChartGroup': {
    allowZoom: ''
  }
};

const ensurePackage = 'victory-zoom-container';
const compMap =[ 'VictoryZoomContainer' ];

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
          const packageImports = getPackageImports(context, ensurePackage);
          const packageImportNames = packageImports.map(imp => imp.imported.name);
          const myImports = node.specifiers.map(imp => imp.imported.name);
          const missingImports = compMap
              .filter(imp => !packageImportNames.includes(imp)) // not added by consumer
              .filter(imp => !myImports.includes(imp)) // not added by this rule
              .join(', ');

          if (packageImports.length == 0 ) {
            context.report({
              node,
              messageId: "missingImportMsg",
              data: {
                missingImports: missingImports,
                ensurePackage: ensurePackage
              },
              fix(fixer) {
                return fixer.insertTextBefore(context.getSourceCode().getNodeByRangeIndex(0),
                    `import { ${missingImports} } from '${ensurePackage}';\n`);
              }
            });

          } else if (missingImports) {
            const lastSpecifier = node.specifiers[node.specifiers.length - 1];
            context.report({
              node,
              messageId: "missingImportMsg",
              data: {
                missingImports: missingImports,
                ensurePackage: ensurePackage
              },
              fix(fixer) {
                return fixer.insertTextAfter(lastSpecifier, `, ${missingImports}`);
              }
            });
          }
        }
      };
    }
};
