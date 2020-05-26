const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4065
module.exports = {
  create: renameProp(
    'EmptyStateIcon',
    { size: '', title: '' },
    (node, attribute) => `Removed prop ${attribute.name.name} from ${node.name.name}. Use the icon prop instead.`
  )
};
