import { renameProps } from '../../helpers';

// https://github.com/patternfly/patternfly-react/pull/10454
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Page: {
      header: 'masthead',
    },
  }),
};
