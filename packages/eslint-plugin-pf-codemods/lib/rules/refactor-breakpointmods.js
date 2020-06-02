const { getPackageImports } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/YOURNUMBERHERE
module.exports = {
  create: function(context) {
    const imports = getPackageImports(context, '@patternfly/react-core')
      .filter(specifier => specifier.imported.name === 'YOURCOMPONENTNAME');
      
    return imports.length == 0 ? {} : {
      JSXOpeningElement(node) {
        if (imports.map(imp => imp.local.name).includes(node.name.name)) {
          const attribute = node.attributes.find(node => node.name && node.name.name === 'variant');
          if (attribute) {
            context.report({
              node,
              message: 'YOUR_MESSAGE_HERE',
              fix(fixer) {
                return fixer.replaceText(attribute, '');
              }
            });
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

