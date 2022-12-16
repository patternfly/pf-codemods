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
          const boundaryAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'boundary');
          const tippyAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'tippyProps');
          const shouldCloseAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'shouldClose');
          const onHiddenAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'onHidden');
          const onHideAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'onHide');
          const onMountAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'onMount');
          const onShowAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'onShow');
          const onShownAttr = node.openingElement.attributes.find(attribute => attribute.name.name === 'onShown');


          if (boundaryAttr) {
            context.report({
              node,
              message: "Popover boundary prop has been removed.",
              fix(fixer) {
                const fixes = [];
                fixes.push(fixer.replaceText(boundaryAttr, ''));
                return fixes;
              }
            });
          }

          if (tippyAttr) {
            context.report({
              node,
              message: "Popover tippyProps prop has been removed.",
              fix(fixer) {
                const fixes = [];
                fixes.push(fixer.replaceText(tippyAttr, ''));
                return fixes;
              }
            });
          }

          if(shouldCloseAttr) {
            const params = shouldCloseAttr.value.expression.params;
            if(params.length === 2) { // only attempt to remove first param if 2 are passed
              const firstParam = params[0];
              context.report({
                node,
                message: "Popover shouldClose function's first parameter has been removed.",
                fix(fixer) {
                  const fixes = [];
                  fixes.push(fixer.removeRange([firstParam.range[0], firstParam.range[1] + 1])); // remove first property and following comma
                  return fixes;
                }
              });
            }
          }

          if(onHiddenAttr) {
            const funct = onHiddenAttr.value.expression;
            if(funct.params.length === 1) {
              const firstParam = funct.params[0];
              context.report({
                node,
                message: "Popover onHidden function's parameter has been removed.",
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

          if(onHideAttr) {
            const funct = onHideAttr.value.expression;
            if(funct.params.length === 1) {
              const firstParam = funct.params[0];
              context.report({
                node,
                message: "Popover onHide function's parameter has been removed.",
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

          if(onMountAttr) {
            const funct = onMountAttr.value.expression;
            if(funct.params.length === 1) {
              const firstParam = funct.params[0];
              context.report({
                node,
                message: "Popover onMount function's parameter has been removed.",
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

          if(onShowAttr) {
            const funct = onShowAttr.value.expression;
            if(funct.params.length === 1) {
              const firstParam = funct.params[0];
              context.report({
                node,
                message: "Popover onShow function's parameter has been removed.",
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

          if(onShownAttr) {
            const funct = onShownAttr.value.expression;
            if(funct.params.length === 1) {
              const firstParam = funct.params[0];
              context.report({
                node,
                message: "Popover onShown function's parameter has been removed.",
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
        }
      }
    }
  }
}
