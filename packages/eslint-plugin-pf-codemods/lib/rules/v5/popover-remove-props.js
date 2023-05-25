const { getFromPackage } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8201
module.exports = {
  meta: {
    fixable: "code"
  },
  create: function(context) {
    const imports = getFromPackage(context, '@patternfly/react-core')
        .imports.filter(specifier => ['Popover'].includes(specifier.imported.name));
    const popoverImport = imports.find(imp => imp.imported.name === 'Popover');

    return !popoverImport ? {} : {
      JSXElement(node) {
        if (popoverImport.local.name === node.openingElement.name.name) {
          const removeProps = ['boundary', 'tippyProps'];
          const shouldCloseAttr = node.openingElement.attributes.find(attribute => attribute.name?.name === 'shouldClose');
          const removeFunctionParam = ['onHidden', 'onHide', 'onMount', 'onShow', 'onShown'];
          removeProps.forEach(name => {
            const attr = node.openingElement.attributes.find(attribute => attribute.name?.name === name)
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
            let params = [];
            if ( shouldCloseAttr.value.expression.type === 'Identifier') {
              const propProperties = {
                type: shouldCloseAttr.value?.expression?.type,
                name: shouldCloseAttr.value?.expression?.name,
              };
              const currentScope = context.getScope();
              const matchingVariable = currentScope.variables.find(
                (variable) => variable.name === propProperties.name
              );
              const matchingDefinition = matchingVariable?.defs.find(
                (def) => def.name?.name === propProperties.name
              );
              params = 
                matchingDefinition?.type === "FunctionName"
                  ? matchingDefinition?.node?.params
                  : matchingDefinition?.node?.init?.params;
            } else {
              params = shouldCloseAttr.value.expression.params;
            }

            // only report if 3 are passed or one has tip in name
            if(params?.length === 3 || params.some( (p) => /tip/i.test("" + p.name))) {
              context.report({
                node,
                message: "Popover shouldClose function's tip parameter has been removed. Please update accordingly",
              });
            }
          }
          removeFunctionParam.forEach( name => {
            const attr = node.openingElement.attributes.find(attribute => attribute.name?.name === name)
            if(attr) {
              const funct = attr.value.expression;
              let params = [];
              if ( funct.type === 'Identifier') {
                const propProperties = {
                  type: attr.value?.expression?.type,
                  name: attr.value?.expression?.name,
                };
                const currentScope = context.getScope();
                const matchingVariable = currentScope.variables.find(
                  (variable) => variable.name === propProperties.name
                );
                const matchingDefinition = matchingVariable?.defs.find(
                  (def) => def.name?.name === propProperties.name
                );
                params = 
                  matchingDefinition?.type === "FunctionName"
                    ? matchingDefinition?.node?.params
                    : matchingDefinition?.node?.init?.params;
              } else {
                params = funct?.params;
              }
              if(params?.length) {
                context.report({
                  node,
                  message: "Popover " + attr.name.name + " function's parameter has been removed. Please update your code accordingly.",
                });
              }
            }
          });
        }
      }
    }
  }
}
