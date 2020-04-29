const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4017
module.exports = {
  create: renameProp(
    'Modal',
    {'isFooterLeftAligned': ''},
    node =>  `isFooterLeftAligned prop has been removed for ${node.name.name}. The footer is now always left-aligned`
  ),
};