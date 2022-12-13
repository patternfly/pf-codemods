const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4014
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'WizardNavItem',
    {'text': 'content'},
    node => `text prop has been removed for ${node.name.name}. Use content instead`
  )
};