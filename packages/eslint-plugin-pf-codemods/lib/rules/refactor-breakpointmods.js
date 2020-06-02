const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  create: function(context) {
    const componentsToUpdate = [
      'Flex',
      'FlexItem',
      'Page',
      'ToolbarItem',
      'ToolbarToggleGroup'
    ]
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => componentsToUpdate.includes(specifier.imported.name));
  
      
    return imports.length == 0 ? {} : {
      JSXOpeningElement(node) {
        const nodeName = node.name.name;
        const nodeImport = imports.find(imp => imp.local.name === nodeName); 
        if (nodeImport) {
          const importName = nodeImport.imported.name;
          // Page
          if (importName === 'Page') {
            const attribute = node.attributes.find(node => node.name && node.name.name === 'hasNoPadding');
            if (attribute) {
              context.report({
                node,
                message: `hasNoPadding prop on Page component removed in favor of padding={{ default: 'noPadding' }}`,
                fix(fixer) {
                  return fixer.replaceText(attribute, `padding={{ default: 'noPadding' }}`);
                }
              });
            }
          }
          // ToolbarToggleGroup
          if (importName === 'ToolbarToggleGroup') {
            const attribute = node.attributes.find(attr => attr.name && attr.name.name === 'breakpoint');
            if (attribute) {
              const breakpointVal = attribute.value.value;
              const newAttr = `show={{ ${breakpointVal}: 'show' }}`
              context.report({
                node,
                message: `hasNoPadding prop on Page component removed in favor of padding={{ default: 'noPadding' }}`,
                fix(fixer) {
                  return fixer.replaceText(attribute, newAttr);
                }
              });
            }
          }
        }
      }
    };
  }
};


const breakpointProps = {
  Flex: {
    breakpointMods: {
      spacer: [],
      spaceItems: [],
      grow: [],
      shrink: [],
      flex: [],
      direction: [],
      alignItems: [],
      alignContent: [],
      alignSelf: [],
      align: [],
      justifyContent: [],
      display: [],
      fullWidth: [],
      flexWrap: [],
    }
  },
  FlexItem: {
    breakpointMods: {
      spacer: [],
      grow: [],
      shrink: [],
      flex: [],
      alignSelf: [],
      align: [],
      fullWidth: [],
    }
  },
  ToolbarItem: {
    breakpointMods: {
      visibility: [],
      alignment: [],
      spacer: []
    }
  },
  ToolbarToggleGroup: {
    breapointMods: {
      visible: {
        visibility: [],
      alignment: [],
      spacer: [],
      spaceItems: []
    },
    breakpoint: {
      show: []
    }
  }
}

const breakpointPropNames = [
  'visibility',
  ''
]

visibility: 'hidden' | 'visible';
widths: 'width_25' | 'width_33' | 'width_50' | 'width_66' | 'width_75' | 'width_100';
padding: 'padding' | 'noPadding';
inset: 'insetNone' | 'insetSm' | 'insetMd' | 'insetLg' | 'insetXl' | 'inset2xl';
alignment: 'alignRight' | 'alignLeft';
spacer?: 'spacerNone' | 'spacerXs' | 'spacerSm' | 'spacerMd' | 'spacerLg' | 'spacerXl' | 'spacer2xl' | 'spacer3xl' | 'spacer4xl';
spaceItems?: 'spaceItemsNone' | 'spaceItemsXs' | 'spaceItemsSm' | 'spaceItemsMd' | 'spaceItemsLg' | 'spaceItemsXl' | 'spaceItems2xl' | 'spaceItems3xl' | 'spaceItems4xl';
show: 'show';
grow: 'grow';
shrink: shrink;
flex: 'flexDefault' | 'flexNone' | 'flex_1' | 'flex_2' | 'flex_3' | 'flex_4';
direction: 'column' | 'columnReverse' | 'row' | 'rowReverse';
alignItems: 'alignItemsFlexStart' | 'alignItemsFlexEnd' | 'alignItemsCenter' | 'alignItemsStretch' | 'alignItemsBaseline';
alignContent: 'alignContentFlexStart' | 'alignContentFlexEnd' | 'alignContentCenter' | 'alignContentStretch' | 'alignContentSpaceBetween' | 'alignContentSpaceAround';
alignSelf: 'alignSelfFlexStart' | 'alignSelfFlexEnd' | 'alignSelfCenter' | 'alignSelfStretch' | 'alignSelfBaseline';

// Flex
spacer: ['spacerNone', 'spacerXs', 'spacerSm', 'spacerMd', 'spacerLg', 'spacerXl', 'spacer2xl', 'spacer3xl', 'spacer4xl'],
spaceItems: ['spaceItemsNone', 'spaceItemsXs', 'spaceItemsSm', 'spaceItemsMd', 'spaceItemsLg', 'spaceItemsXl', 'spaceItems2xl', 'spaceItems3xl', 'spaceItems4xl'],
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
