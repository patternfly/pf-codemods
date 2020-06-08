const { renameComponents } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  create: renameComponents(
    { 'Expandable': 'ExpandableSection' }
  )
};

