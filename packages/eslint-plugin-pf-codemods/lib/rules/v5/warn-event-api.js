// https://github.com/patternfly/patternfly-react/pull/8667
module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        // Toggle and SelectToggle shouldn't generally be directly used, but covering them just in case.
        const onToggleAPIUpdateList = ['ApplicationLauncher', 'BadgeToggle', 'DropdownToggle', 'KebabToggle', 'Toggle', 'Select', 'SelectToggle'];
        let importName;
        const updatedComponentImport = node.specifiers.find(
          (specifier) => {
            if(onToggleAPIUpdateList.includes(specifier.imported.name) && node.source.value === "@patternfly/react-core") {
              importName = specifier.imported.name;
              return true;
            }
          }
        );

        if (updatedComponentImport) {
          context.report({
            node,
            message: `${importName} onToggle prop has been updated to include the event parameter as its first parameter. onToggle handlers may require an update.`,
          });
        }
      },
    };
  },
};
