const { renameComponents } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8525
module.exports = {
  meta: { fixable: 'code' },
  create: renameComponents(
    { 'AccordionExpandedContentBody': 'AccordionExpandableContentBody' }
  )
};

