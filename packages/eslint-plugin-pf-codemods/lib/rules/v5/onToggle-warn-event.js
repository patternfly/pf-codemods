const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/8667
module.exports = {
  create: function (context) {
    const onToggleAPIUpdateList = [
      "ApplicationLauncher",
      "BadgeToggle",
      "DropdownToggle",
      "KebabToggle",
      "Toggle",
      "Select",
      "SelectToggle",
    ];
    const imports = getPackageImports(context, "@patternfly/react-core").filter(
      (specifier) => onToggleAPIUpdateList.includes(specifier.imported.name)
    );

    return imports.length === 0
      ? {}
      : {
          JSXOpeningElement(node) {
            if (
              imports.map((imp) => imp.local.name).includes(node.name.name) &&
              node.attributes.find((attr) => attr.name.name === "onToggle")
            ) {
              context.report({
                node,
                message: `${node.name.name} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
              });
            }
          },
        };
  },
};
