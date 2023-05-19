const { getFromPackage } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9132
module.exports = {
  meta: {},
  create: function (context) {
    const { imports: reactCoreImports } = getFromPackage(context, '@patternfly/react-core');
    const formControlImports = reactCoreImports.filter((specifier) =>
      ["FormSelect", "TextArea", "TextInput"].includes(specifier.imported.name)
    );

    const importsUsingTextInput = reactCoreImports.filter((specifier) =>
      [
        "TimePicker",
        "ClipboardCopy",
        "DatePicker",
        "FileUpload",
        "LoginPage",
        "NumberInput",
        "SearchInput",
        "Slider",
        "TreeViewSearch",
      ].includes(specifier.imported.name)
    );

    const deprecatedSelectImport = getFromPackage(
      context,
      "@patternfly/react-core/deprecated"
    ).imports.filter((specifier) => specifier.imported.name === "Select");

    const imports = [
      ...deprecatedSelectImport,
      ...importsUsingTextInput,
      ...formControlImports,
    ];
    const localImportNames = imports.map((imp) => imp.local?.name);

    return !imports.length
      ? {}
      : {
          ImportDeclaration(node) {
            const affectedImports = node.specifiers.filter((specifier) => {
              if (specifier.imported?.name === "Select") {
                return node.source?.value?.startsWith(
                  "@patternfly/react-core/deprecated"
                );
              }
              return localImportNames.includes(specifier.local?.name);
            });
            if (!affectedImports.length) {
              return;
            }

            const importNameString = affectedImports
              .map((imp, index) => {
                let nameString = imp.imported?.name;
                if (nameString === "Slider") {
                  nameString += " with the isInputVisible prop";
                }
                if (nameString === "Select") {
                  nameString += " with the hasInlineFilter prop";
                }

                return index === affectedImports.length - 1 &&
                  affectedImports.length > 1
                  ? `and ${nameString}`
                  : nameString;
              })
              .join(affectedImports.length > 2 ? ", " : " ");

            let markupMessage = `The markup for ${importNameString} has been changed. Selectors may need to be updated.`;

            context.report({
              node,
              message: markupMessage,
            });
          },
        };
  },
};
