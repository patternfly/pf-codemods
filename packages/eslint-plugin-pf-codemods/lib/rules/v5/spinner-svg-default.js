// const { getPackageImports } = require('../../helpers');

// module.exports = {
//   meta: {},
//   create: function(context) {
//     const imports = getPackageImports(context, '@patternfly/react-core')
//       .filter(specifier => specifier.imported.name === 'Spinner');
      
//     return imports.length === 0 ? {} : {
//       JSXOpeningElement(node) {
//         if (imports.map(imp => imp.local.name).includes(node.name.name)) {
//             context.report({
//               node,
//               message: `Spinner isSVG prop default value has changed from false to true.`,
//             });
//         }
//       }
//     };
//   }
// };

const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8183
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'Spinner',
    { isSVG: '' },
    () => `Spinner isSVG prop default value has changed from false to true.`
  )
};

