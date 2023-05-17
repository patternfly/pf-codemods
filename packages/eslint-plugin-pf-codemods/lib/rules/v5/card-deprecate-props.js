const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9092
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const cardImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported.name === "Card");

    return !cardImport
      ? {}
      : {
          JSXOpeningElement(node) {
            if (node.name?.name !== cardImport.local?.name) {
              return;
            }

            const selectableInputProps = [
              "hasSelectableInput",
              "selectableInputAriaLabel",
              "onSelectableInputChange",
            ];
            const raisedProps = ["isSelectableRaised", "isDisabledRaised"];

            const deprecatedAttributes = node.attributes.filter((attr) =>
              [...selectableInputProps, ...raisedProps].includes(
                attr.name?.name
              )
            );

            deprecatedAttributes.forEach((attr) => {
              const { name } = attr.name;

              context.report({
                node,
                message: `The "${name}" prop on ${node.name.name} has been deprecated. We recommend using our new implementation of clickable and selectable Cards instead.`,
                fix(fixer) {
                  if (!raisedProps.includes(name)) {
                    return;
                  }
                  const fixes = [
                    fixer.replaceText(attr, name.replace("Raised", "")),
                  ];

                  // tabIndex now needs to be manually passed in when using isSelectable and hasSelectableInput
                  if (
                    name.startsWith("isSelectable") &&
                    deprecatedAttributes.find(
                      (attr) => attr.name.name === "hasSelectableInput"
                    )
                  ) {
                    fixes.push(
                      fixer.insertTextAfter(
                        node.attributes[node.attributes.length - 1],
                        " tabIndex={0}"
                      )
                    );
                  }

                  return fixes;
                },
              });
            });
          },
        };
  },
};
