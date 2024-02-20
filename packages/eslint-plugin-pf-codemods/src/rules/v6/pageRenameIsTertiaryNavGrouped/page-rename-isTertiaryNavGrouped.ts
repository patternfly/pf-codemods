import { renameProps } from '../../helpers';
  
// https://github.com/patternfly/patternfly-react/pull/9948
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Page:{
      "isTertiaryNavGrouped":{
        newName:"isHorizontalSubnavGrouped",
        message:() => 
          `We've renamed the \`isTertiaryNavGrouped\` prop to \`isHorizontalSubnavGrouped\`.`,
      }
    }
  })
};
  