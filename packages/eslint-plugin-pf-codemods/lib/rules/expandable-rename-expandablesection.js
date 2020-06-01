const { renameComponent } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  create: renameComponent(
    { 'Expandable': 'ExpandableSection' }
  )
};

