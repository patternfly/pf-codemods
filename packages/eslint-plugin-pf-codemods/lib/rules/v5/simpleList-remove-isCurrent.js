const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8132
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'SimpleList',
    {'isCurrent': 'isActive'},
    node =>  `isCurrent prop has been removed for ${node.name.name} and replaced with the isActive prop.`
  ),
};
