const { getPackageImports } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8201
module.exports = {
  meta: {
    fixable: "code"
  },
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
        .filter(specifier => ['Popover'].includes(specifier.imported.name));
    const popoverImport = imports.find(imp => imp.imported.name === 'Popover');

    return !popoverImport ? {} : {
      JSXElement(node) {
        if (popoverImport.local.name === node.openingElement.name.name) {
          const removeProps = ['boundary', 'tippyProps'];
          const shouldCloseAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'shouldClose');
          const removeFunctionParam = ['onHidden', 'onHide', 'onMount', 'onShow', 'onShown'];
          removeProps.forEach(name => {
            const attr = node.openingElement.attributes.find(attribute => attribute.name.name === name)
            if (attr) {
              context.report({
                node,
                message: "Popover " + attr.name.name + " prop has been removed.",
                fix(fixer) {
                  const fixes = [];
                  fixes.push(fixer.replaceText(attr, ''));
                  return fixes;
                }
              });
            }
          });
          if(shouldCloseAttr) {
            const params = shouldCloseAttr.value.expression.params;
            if(params.length === 2) { // only attempt to remove first param if 2 are passed
              const firstParam = params[0];
              const secondParam = params[1];
              context.report({
                node,
                message: "Popover shouldClose function's first parameter has been removed.",
                fix(fixer) {
                  const fixes = [];
                  fixes.push(fixer.removeRange([firstParam.range[0], secondParam.range[0]])); // remove first property
                  return fixes;
                }
              });
            }
          }
          removeFunctionParam.forEach( name => {
            const attr = node.openingElement.attributes.find(attribute => attribute.name.name === name)
            if(attr) {
              const funct = attr.value.expression;
              if(funct.params.length === 1) {
                const firstParam = funct.params[0];
                context.report({
                  node,
                  message: "Popover " + attr.name.name + " function's parameter has been removed.",
                  fix(fixer) {
                    const fixes = [];
                    if (funct.range[0] === firstParam.range[0]) {
                      fixes.push(fixer.replaceText(firstParam, '()'));
                    } else  {
                      fixes.push(fixer.remove(firstParam));
                    }
                    return fixes;
                  }
                });
              }
            }
          });
        }
      }
    }
  }
}
