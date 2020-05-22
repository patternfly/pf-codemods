const { renameProp } = require('../helpers');

// https://github.com/patternfly/patternfly-react/pull/4246
module.exports = {
  create: renameProp(
    ['ChipGroup'],
    { withToolbar: 'categoryName="pf-codemod-category"', headingLevel: '' },
    (node, attribute) => {
      if (attribute.name.name === 'withToolbar') {
        return `withToolbar has been removed from ${node.name.name}. Add the categoryName prop instead for a category.`
      }
      else {
        return `headingLevel has been removed from ${node.name.name} since the category name is now a <span>`
      }
    }
  )
};
