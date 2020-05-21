const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4136
module.exports = {
  create: renameProp(
    ['Wizard', 'WizardBody', 'WizardToggle'],
    {'hasBodyPadding': 'hasNoBodyPadding'},
    node => `hasBodyPadding prop has been removed for ${node.name.name}. Use hasNoBodyPadding instead`
  )
};