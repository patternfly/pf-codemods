import { getFromPackage, renameProps } from '../../helpers';
  
// https://github.com/patternfly/patternfly-react/pull/9954
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Avatar: {
      "border": {
        newName: "isBordered",
        replace: true,
        message: () =>
        'border prop has been removed since light and dark borders are no longer supported. isBordered prop was added to add a border to avatar.',
      },
    },
  }),
};
  