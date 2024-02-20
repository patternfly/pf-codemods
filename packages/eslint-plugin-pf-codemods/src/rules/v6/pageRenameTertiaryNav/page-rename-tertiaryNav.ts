import { getFromPackage, renameProps } from '../../helpers';
  
// https://github.com/patternfly/patternfly-react/pull/9948
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Page:{
      "tertiaryNav":{
        newName:"horizontalSubnav",
        message:() => 
          `We've renamed the \`tertiaryNav\` prop to \`horizontalSubnav\`.`,
      }
      
    }
  })
};
  