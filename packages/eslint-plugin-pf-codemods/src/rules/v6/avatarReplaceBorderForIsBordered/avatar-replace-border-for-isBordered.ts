import { getFromPackage, renameProps } from '../../helpers';

// https://github.com/patternfly/patternfly-react/pull/9954
// https://github.com/patternfly/patternfly-react/pull/9881
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Avatar: {
      border: {
        newName: 'isBordered',
        replace: true,
        message: () =>
          'border prop has been removed from Avatar since theming is not longer handled React-side. We recommend using the isBordered prop instead to add a border to Avatar.',
      },
    },
  }),
};
