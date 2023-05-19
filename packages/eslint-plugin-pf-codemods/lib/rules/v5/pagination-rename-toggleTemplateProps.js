const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8134
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    const { imports } = getFromPackage(context, '@patternfly/react-core');
    const paginationImport = imports.find(imp => imp.imported.name === 'Pagination');
    const toggleTemplatePropsImport = imports.find(imp => imp.imported.name === 'ToggleTemplateProps');

   return imports.length === 0 || !toggleTemplatePropsImport || !paginationImport ? {} : { // If no imports, or Pagiantion + ToggleTemplateProps imports aren't found, ignore
      ImportDeclaration(node) {
        context.report({
          node,
          message: "ToggleTemplateProps has been renamed to PaginationToggleTemplateProps.",
          fix(fixer) { // Rename the import
            return fixer.replaceText(toggleTemplatePropsImport, 'PaginationToggleTemplateProps');
          }
        });
      },
      JSXOpeningElement(node) {
        if (node.name.name === paginationImport.local.name) {
          const templateAttr = node.attributes.find(a => a.name?.name === 'toggleTemplate');
          if(templateAttr.value?.expression?.type === "ArrowFunctionExpression"){ // If toggleTemplate is a function
            const typeAnnotation = templateAttr.value?.expression?.params[0]?.typeAnnotation;
            if(typeAnnotation) {
              context.report({
                node,
                message: "ToggleTemplateProps has been renamed to PaginationToggleTemplateProps.",
                fix(fixer) { // Rename the type annotation of toggleTemplate if present
                  return fixer.replaceText(typeAnnotation.typeAnnotation, "PaginationToggleTemplateProps");
                }
              });
            }
          }
        }
      }
    };
  }
};
