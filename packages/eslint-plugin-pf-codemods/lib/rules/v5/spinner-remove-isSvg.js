const { renameProp } = require('../../helpers');

// https://github.com/patternfly/patternfly-react/pull/8616
module.exports = {
  meta: { fixable: 'code' },
  create: renameProp(
    'Spinner',
    {'isSVG': ``},
    node =>  `Spinner's isSVG prop has been removed because Spinner now exclusively uses an SVG.`
  ),
};