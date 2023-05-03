const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    ChipGroup: {
      withToolbar: {
        newName: 'categoryName="pf-codemod-category"',
        message: (node) =>
          `withToolbar has been removed from ${node.name.name}. Add the categoryName prop instead for a category.`,
        replace: true,
      },
      headingLevel: {
        newName: "",
        message: node => `headingLevel has been removed from ${node.name.name} since the category name is now a <span>`,
      },
    },
  }),
};
