import { renameProps } from '../../helpers';
  
// https://github.com/patternfly/patternfly-react/pull/9774
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Masthead: {
      "backgroundColor": {
        newName: "",
        message: () =>
          "We've removed the `backgroundColor` prop from Masthead as theming is no longer handled React-side.",
      },
    },
  }),
};
  