const { getPackageImports } = require('../helpers');

// #1 and #2 from https://github.com/patternfly/patternfly-react/pull/3922
// At first I wanted to fix #1 by renaming the import TitleSize -> TitleSizes, but that won't work
// because TitleSize.xs and TitleSize.sm have been removed. This means the devs will have to
// remove the imports themselves since ESLint can't apply 2 changes at once.
const validSizes = ['md', 'lg', 'xl', '2xl', '3xl', '4xl'];

module.exports = {
  create: function(context) {
    const titleImports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name == 'Title');
      
    return titleImports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (titleImports.map(imp => imp.local.name).includes(node.name.name)) {
          const sizeAttribute = node.attributes.find(n => n.name && n.name.name === 'size');
          const sizeValue = sizeAttribute.value.value;
          if (sizeAttribute && !validSizes.includes(sizeValue)) {
            const sizeValueString = context.getSourceCode().getText(sizeAttribute.value);
            const valueGuess = validSizes.find(val => sizeValueString.includes(val)) || 'md';
            context.report({
              node,
              message: `size ${sizeValueString} has been removed for ${node.name.name}. Use size=md|lg|xl|2xl|3xl|4xl instead`,
              fix(fixer) {
                return fixer.replaceText(sizeAttribute.value, `"${valueGuess}"`);
              }
            });
          }
        }
      }
    };
  }
};