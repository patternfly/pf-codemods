const { getPackageImports, renameProps0 } = require("../../helpers");

const renames = {
  size: "",
  color: "",
  noVerticalAlign: "",
};

// https://github.com/patternfly/patternfly-react/pull/5275
module.exports = {
  meta: {fixable: "code"},
  create: function (context) {
    const imports = getPackageImports(
      context,
      "@patternfly/react-icons"
    ).filter((specifier) => specifier.imported.name.includes("Icon"));

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            renameProps0(context, imports, node, renames);
          },
        };
  },
};
