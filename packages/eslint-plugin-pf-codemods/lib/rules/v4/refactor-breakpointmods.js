const { getFromPackage } = require('../../helpers');
const componentsToUpdate = [
  'Flex',
  'FlexItem',
  'PageSection',
  'ToolbarItem',
  'ToolbarToggleGroup'
];
const camelCase = str => str.replace(/-([a-z])/g, groups => groups[1].toUpperCase());
const breakpointPropNames = {
  visibility: ['hidden', 'visible'],
  widths: ['width_25', 'width_33', 'width_50', 'width_66', 'width_75', 'width_100'],
  padding: ['padding', 'noPadding'],
  inset: ['insetNone', 'insetSm', 'insetMd', 'insetLg', 'insetXl', 'inset2xl'],
  spacer: ['spacerNone', 'spacerXs', 'spacerSm', 'spacerMd', 'spacerLg', 'spacerXl', 'spacer2xl', 'spacer3xl', 'spacer4xl'],
  spaceItems: ['spaceItemsNone', 'spaceItemsXs', 'spaceItemsSm', 'spaceItemsMd', 'spaceItemsLg', 'spaceItemsXl', 'spaceItems2xl', 'spaceItems3xl', 'spaceItems4xl'],
  show: ['show'],
  grow: ['grow'],
  shrink: ['shrink'],
  flex: ['flexDefault', 'flexNone', 'flex_1', 'flex_2', 'flex_3', 'flex_4'],
  direction: ['column', 'columnReverse', 'row', 'rowReverse'],
  alignItems: ['alignItemsFlexStart', 'alignItemsFlexEnd', 'alignItemsCenter', 'alignItemsStretch', 'alignItemsBaseline'],
  alignContent: ['alignContentFlexStart', 'alignContentFlexEnd', 'alignContentCenter', 'alignContentStretch', 'alignContentSpaceBetween', 'alignContentSpaceAround'],
  alignSelf: ['alignSelfFlexStart', 'alignSelfFlexEnd', 'alignSelfCenter', 'alignSelfStretch', 'alignSelfBaseline'],
  align: ['alignLeft', 'alignRight'],
  justifyContent: ['justifyContentFlexStart', 'justifyContentFlexEnd', 'justifyContentCenter', 'justifyContentSpaceBetween', 'justifyContentSpaceAround', 'justifyContentSpaceEvenly'],
  display: ['inlineFlex'],
  fullWidth: ['fullWidth'],
  flexWrap: ['wrap', 'wrapReverse', 'nowrap']
};
const errorMessages = {
  Flex: 'Removed breakpointMods prop from Flex in favor of spacer, spaceItems, grow, shrink, flex, direction, alignItems, alignContent, alignSelf, align, justifyContent, display, fullWidth and flexWrap',
  FlexItem: 'Removed breakpointMods prop from FlexItem in favor of spacer, grow, shrink, flex, alignSelf, align, and fullWidth',
  ToolbarItem: 'Removed breakpointMods prop from ToolbarItem in favor of visiblity, alignment, and spacer',
  ToolbarToggleGroup: 'Removed breakpointMods prop from ToolbarToggleGroup in favor of visiblity, alignment, spacer, and spaceItems'
};

// https://github.com/patternfly/patternfly-react/pull/4310
module.exports = {
  meta: { fixable: 'code' },
  create: function(context) {
    
    const imports = getFromPackage(context, '@patternfly/react-core')
      .imports.filter(specifier => componentsToUpdate.includes(specifier.imported.name));
      
    return imports.length == 0 ? {} : {
      JSXOpeningElement(node) {
        const nodeName = node.name.name;
        const nodeImport = imports.find(imp => imp.local.name === nodeName); 
        if (nodeImport) {
          const importName = nodeImport.imported.name;
          // PageSection
          if (importName === 'PageSection') {
            const attribute = node.attributes.find(node => node.name && node.name.name === 'hasNoPadding');
            if (attribute) {
              context.report({
                node,
                message: `hasNoPadding prop on PageSection component removed in favor of padding={{ default: 'noPadding' }}`,
                fix(fixer) {
                  return fixer.replaceText(attribute, `padding={{ default: 'noPadding' }}`);
                }
              });
            }
          } else {
            // ToolbarToggleGroup
            if (importName === 'ToolbarToggleGroup') {
              const attribute = node.attributes.find(attr => attr.name && attr.name.name === 'breakpoint');
              if (attribute) {
                const breakpointVal = attribute.value.value;
                const newAttr = `show={{ ${breakpointVal}: 'show' }}`
                context.report({
                  node,
                  message: `breakpoint prop on ToolbarToggleGroup removed in favor of show={{ ${breakpointVal}: 'show' }}`,
                  fix(fixer) {
                    return fixer.replaceText(attribute, newAttr);
                  }
                });
              }
            }
            // breakpointMods prop
            const attribute = node.attributes.find(attr => attr.name && attr.name.name === 'breakpointMods');
            if (
              attribute &&
              attribute.value &&
              attribute.value.type === 'JSXExpressionContainer' &&
              attribute.value.expression &&
              (attribute.value.expression.type === 'ArrayExpression' || attribute.value.expression.type === 'TSAsExpression')
            ) {
              const breakpointModsArrNode = (attribute.value.expression.type === 'TSAsExpression')
                ? attribute.value.expression.expression
                : attribute.value.expression;
              const breakpointModsArr = breakpointModsArrNode.elements;
              const newModifier = {};
              breakpointModsArr.forEach(breakpointModObj => {
                if (breakpointModObj.type === 'ObjectExpression') {
                  const modifierNode = breakpointModObj.properties.find(prop => prop.key.name === 'modifier');
                  const modVal = modifierNode.value;
                  const modifierValue = camelCase(
                    modVal.type === 'Literal' && modVal.value ||
                    modVal.type === 'MemberExpression' && modVal.property.type === 'Literal' && modVal.property.value ||
                    modVal.type === 'MemberExpression' && modVal.property.type === 'Identifier' && modVal.property.name
                  );
                  if (modifierValue) {
                    const modifierName = Object.keys(breakpointPropNames).find(propName => breakpointPropNames[propName].includes(modifierValue));
                    const breakpointNode = breakpointModObj.properties.find(prop => prop.key.name === 'breakpoint');
                    if (!newModifier[modifierName]) {
                      newModifier[modifierName] = {};
                    }
                    if (breakpointNode) {
                      const breakpointName = breakpointNode.value.value;
                      newModifier[modifierName][breakpointName] = modifierValue;
                    } else {
                      newModifier[modifierName].default = modifierValue;
                    }
                  }
                }
              });
              const newProps = Object.entries(newModifier).reduce((acc, [key, val]) => {
                return acc += `${key}={${JSON.stringify(val)}} `;
              }, ``);
              context.report({
                node,
                message: errorMessages[nodeName],
                fix(fixer) {
                  return fixer.replaceText(attribute, newProps);
                }
              });
            }
          }
        }
      }
    };
  }
};
