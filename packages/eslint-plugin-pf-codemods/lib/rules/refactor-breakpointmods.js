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
