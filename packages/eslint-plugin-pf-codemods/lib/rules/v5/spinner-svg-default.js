const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8183
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'Spinner',
    { isSVG: '' },
    () => `Spinner isSVG prop default value has changed from false to true.`
  )
};

