const { renameProps } = require("../../helpers");

let renames = {};
["Gallery", "Grid", "Level", "Split", "Stack"].forEach((component) => {
  renames[component] = {
    gutter: {
      newName: "hasGutter",
      replace: true,
    },
  };
});

// https://github.com/patternfly/patternfly-react/pull/4014
module.exports = {
  meta: { fixable: "code" },
  create: renameProps(renames),
};
