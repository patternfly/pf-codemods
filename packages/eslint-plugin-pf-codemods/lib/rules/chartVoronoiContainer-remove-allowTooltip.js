const { renamePropsProper } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4330
const renames = {
  'ChartVoronoiContainer': {
    allowTooltip: ''
  }
};

module.exports = {
  create: renamePropsProper(renames, '@patternfly/react-charts')
};
