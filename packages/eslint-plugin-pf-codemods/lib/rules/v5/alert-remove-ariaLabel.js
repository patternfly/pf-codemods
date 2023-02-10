const { renameProp } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8649
module.exports = {
  meta: { fixable: "code" },
  create: renameProp(
    "Alert",
    { "aria-label": "" },
    (node, attribute) =>
      `${attribute.name.name} prop for ${node.name.name} has been removed and should not be used as it is not well supported on div element without a role.`
  ),
};
