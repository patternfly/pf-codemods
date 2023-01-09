const { renameProps } = require("../../helpers");

const renames = {
  Pagination: {
    currPage: "currPageAriaLabel",
    paginationTitle: "paginationAriaLabel",
    toFirstPage: "toFirstPageAriaLabel",
    toLastPage: "toLastPageAriaLabel",
    toNextPage: "toNextPageAriaLabel",
    toPreviousPage: "toPreviousPageAriaLabel",
    optionsToggle: "optionsToggleAriaLabel",
    defaultToFullPage: "isLastFullPageShown",
    perPageComponenet: "",
  },
};

// https://github.com/patternfly/patternfly-react/pull/8319
module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames),
};
