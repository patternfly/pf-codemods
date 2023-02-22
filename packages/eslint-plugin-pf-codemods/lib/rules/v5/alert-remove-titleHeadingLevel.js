const { renameProp } = require('../../helpers');

  // https://github.com/patternfly/patternfly-react/pull/8518
  module.exports = {
    meta: { fixable: 'code' },
    create: renameProp(
      'Alert',
      {'titleHeadingLevel': 'component'},
      node =>  `titleHeadingLevel prop has been removed for ${node.name.name} and replaced with the component prop.`
    ),
  };
