const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/4116
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    ['SkipToContent'],
    { 'component': '' },
    node => `Component prop was removed from ${node.name.name} in favor of always using an anchor tag`
  )
};
