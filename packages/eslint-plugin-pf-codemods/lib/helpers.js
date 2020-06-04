function getPackageImports(context, packageName) {
  return context.getSourceCode().ast.body
    .filter(node => node.type === 'ImportDeclaration')
    .filter(node => node.source.value === packageName)
    .map(node => node.specifiers)
    .reduce((acc, val) => acc.concat(val), []);
}

function renameProps0(context, imports, node, renames) {
  if (imports.map(imp => imp.local.name).includes(node.name.name)) {
    const renamedProps = renames[node.name.name];
    node.attributes
      .filter(attribute => attribute.name && renamedProps.hasOwnProperty(attribute.name.name))
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

function renameProps(renames) {
  return function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(renames).includes(specifier.imported.name));
      
    return imports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        renameProps0(context, imports, node, renames);
      }
    };
  }
}

function renameProp(components, propMap, message, replaceAttribute) {
  if (typeof components === 'string') {
    components = [ components ];
  }
  return function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => components.includes(specifier.imported.name));

    return imports.length === 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.find(imp => imp.local.name === node.name.name)) {
          node.attributes
            .filter(attr => attr.name && Object.keys(propMap).includes(attr.name.name))
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

function renameComponent(
  componentMap,
  message = (prevName, newName) => `${prevName} has been replaced with ${newName}`
) {
  return function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => Object.keys(componentMap).includes(specifier.imported.name));
    const importedNamesArr = imports.map(imp => imp.imported.name);
    const hasDataCodemodsAttr = [];
      
    return imports.length === 0 ? {} : {
      JSXIdentifier(node) {
        const nodeName = node.name;
        const importedNode = imports.find(imp => imp.local.name === nodeName);
        if (
          importedNamesArr.includes(nodeName) &&
          importedNode.imported.name === importedNode.local.name // don't rename an aliased component
        ) {
          // if data-codemods attribute, do nothing
          const parentNode = node.parent;
          const isOpeningTag = parentNode.type === 'JSXOpeningElement';
          const openingTagAttributes = isOpeningTag ? parentNode.attributes : parentNode.parent.openingElement.attributes;
          const hasDataAttr = openingTagAttributes && openingTagAttributes.filter(attr => attr.name.name === 'data-codemods').length;
          if (hasDataAttr) {
            return;
          }
          // if no data-codemods && opening tag, add attribute & rename
          // if no data-codemods && closing tag, rename
          const newName = componentMap[nodeName];
          const updateTagName = node => context.getSourceCode().getText(node).replace(nodeName, newName);
          const addDataAttr = jsxStr => `${jsxStr.slice(0, -1)} data-codemods="true">`;
          const newOpeningParentTag = newName.includes('Toolbar')
            ? addDataAttr(updateTagName(parentNode))
            : updateTagName(parentNode);
          if (isOpeningTag) {
            ensureImports(context, importedNode.parent, '@patternfly/react-core', [newName]);
          }
          context.report({
            node,
            message: message(nodeName, newName),
            fix(fixer) {
              return isOpeningTag
                ? fixer.replaceText(parentNode, newOpeningParentTag)
                : fixer.replaceText(node, updateTagName(node));
            }
          });
        }
      }
    };
  }
}

function ensureImports(context, node, package, imports) {
  if (node.source.value !== package) {
    return;
  }
  const patternflyImports = getPackageImports(context, package);
  const patternflyImportNames = patternflyImports.map(imp => imp.imported.name);
  const myImports = node.specifiers.map(imp => imp.imported.name);
  const missingImports = imports
    .filter(imp => !patternflyImportNames.includes(imp)) // not added by consumer
    .filter(imp => !myImports.includes(imp)) // not added by this rule
    .join(', ');
  if (missingImports) {
    const lastSpecifier = node.specifiers[node.specifiers.length - 1];
    context.report({
      node,
      message: `add missing imports ${missingImports} from ${node.source.value}`,
      fix(fixer) {
        return fixer.insertTextAfter(lastSpecifier, `, ${missingImports}`);
      }
    });
  }
}

module.exports = {
  ensureImports,
  getPackageImports,
  renameProp,
  renameProps,
  renameProps0,
  renameComponent,
}
