const { renameProp } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8155
module.exports = {
  meta: { fixable: "code" },
  create: renameProp(
    "FileUpload",
    { onChange: "" },
    (node, attribute) =>
      `${attribute.name.name} prop for ${node.name.name} has been removed and should be replaced with onFileInputChange, onTextChange, onDataChange, and onClearClick as needed.`
  ),
};
