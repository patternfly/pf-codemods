import {renameProps } from '../../helpers';
  
// https://github.com/patternfly/patternfly-react/pull/9948
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Page:{
      "isTertiaryNavWidthLimited":{
        newName:"isHorizontalSubnavWidthLimited",
        message:() => 
          `We've renamed the \`isTertiaryNavWidthLimited\` prop to \`isHorizontalSubnavWidthLimited\`.`,
      }
      
    }
  })
};
  