function getPackageImports(context, packageName) {
  return context.getSourceCode().ast.body
    .filter(node => node.type === 'ImportDeclaration')
    .filter(node => node.source.value === packageName)
    .map(node => node.specifiers)
    .reduce((acc, val) => acc.concat(val), []);
}

function renameProp(components, propMap, message, replaceAttribute) {
  if (typeof components === 'string') {
    components = [ components ];
  }
  return function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => components.includes(specifier.imported.name));
      
    return !imports ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          node.attributes
            .filter(node => Object.keys(propMap).includes(node.name.name))
            .forEach(attribute => {
              const newName = propMap[attribute.name.name];
              context.report({
                node,
                message: message(node, attribute, newName),
                fix(fixer) {
                  // Delete entire prop if newName is empty
                  return fixer.replaceText(
                    !newName || replaceAttribute ? attribute : attribute.name,
                    newName
                  );
                }
              })
            });
        }
      }
    };
  }
}

function renameProps(renames) {
  return function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).includes(specifier.imported.name));
      
    return !imports ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const renamedProps = renames[node.name.name];
          node.attributes
            .filter(attribute => renamedProps.hasOwnProperty(attribute.name.name))
            .forEach(attribute => {
              if (renamedProps[attribute.name.name] === '') {
                context.report({
                  node,
                  message: `${attribute.name.name} prop for ${node.name.name} has been removed`,
                  fix(fixer) {
                    return fixer.replaceText(attribute, '');
                  }
                });
              }
              else {
                context.report({
                  node,
                  message: `${attribute.name.name} prop for ${node.name.name} has been renamed to ${renamedProps[attribute.name.name]}`,
                  fix(fixer) {
                    return fixer.replaceText(attribute.name, renamedProps[attribute.name.name]);
                  }
                });
              }
            });
        }
      }
    };
  }
}

function renameComponent(componentMap, message) {
  return function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(componentMap).includes(specifier.imported.name));
      
    return !imports ? {} : {
      JSXIdentifier(node) {
        if (imports.map(imp => imp.local.name).includes(node.name)) {
          const newName = componentMap[node.name];
          context.report({
            node,
            message: message(node, newName),
            fix(fixer) {
              return fixer.replaceText(node, newName);
            }
          });
        }
      }
    };
  }
}

module.exports = {
  getPackageImports,
  renameProp,
  renameProps,
  renameComponent
}