const { renameProps } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4330
const renames = {
  'ChartVoronoiContainer': {
    allowTooltip: ''
  }
};

module.exports = {
  create: renameProps(renames, '@patternfly/react-charts')
};
