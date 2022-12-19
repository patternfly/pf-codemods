const {renameProp} = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8196
module.exports = {
  meta: {fixable: "code"},
  create: renameProp(
    "Card",
    {isHoverable: ""},
    (node, attribute) =>
      `${attribute.name.name} prop for ${node.name.name} has been removed and should be replaced with isSelectable or isSelectableRaised as needed.`
  ),
};
