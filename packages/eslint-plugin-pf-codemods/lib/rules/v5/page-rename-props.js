const { renameProps } = require("../../helpers");

const renames = {
  PageSidebar: {
    isNavOpen: "isSidebarOpen",
  },
  PageToggleButton: {
    isNavOpen: "isSidebarOpen",
    onNavToggle: "onSidebarToggle",
  },
};

module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames),
};
