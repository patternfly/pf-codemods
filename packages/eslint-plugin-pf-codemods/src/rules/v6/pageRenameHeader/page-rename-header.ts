import { renameProps } from '../../helpers';

// https://github.com/patternfly/patternfly-react/pull/10454
module.exports = {
  meta: { fixable: 'code' },
  create: renameProps({
    Page: {
      header: {
        newName: 'masthead',
        message: `We've renamed the \`header\` prop for Page to \`masthead\`.`,
      },
    },
  }),
};
