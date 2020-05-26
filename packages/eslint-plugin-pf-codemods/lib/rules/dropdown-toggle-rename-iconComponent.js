const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4038
module.exports = {
  create: renameProp(
    'DropdownToggle',
    { iconComponent: 'toggleIndicator' },
    node =>  `iconComponent prop has been removed for ${node.name.name} in favor of toggleIndicator.`
  )
};
