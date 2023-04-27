const { renameProps } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8616
module.exports = {
  meta: { fixable: "code" },
  create: renameProps({
    Spinner: {
      isSVG: {
        newName: "",
        message: `Spinner's isSVG prop has been removed because Spinner now exclusively uses an SVG.`,
      },
    },
  }),
};
