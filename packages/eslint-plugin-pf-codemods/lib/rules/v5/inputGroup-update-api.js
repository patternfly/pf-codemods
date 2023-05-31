const { getFromPackage, getAllJSXElements } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9074
// https://github.com/patternfly/patternfly-react/pull/9176
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const inputGroupImport = imports.find(
      (specifier) => specifier.imported?.name == "InputGroup"
    );
    const inputGroupItemImport = imports.find(
      (specifier) => specifier.imported?.name == "InputGroupItem"
    );
    const inputGroupTextImport = imports.find(
      (specifier) => specifier.imported?.name == "InputGroupText"
    );

    return !inputGroupImport
      ? {}
      : {
          ImportDeclaration(node) {
            const getMatchingSpecifier = (name) =>
              node.specifiers.find(
                (specifier) => specifier.imported?.name === name
              );

            const inputGroupElements = getAllJSXElements(context).filter(
              (elem) =>
                elem.openingElement?.name?.name === inputGroupImport.local?.name
            );

            const needsInputGroupItemImport = inputGroupElements.some(
              (inputGroup) => {
                return inputGroup.children?.some(
                  (inputGroupChild) =>
                    ![
                      inputGroupTextImport?.local?.name,
                      "InputGroupText",
                    ].includes(inputGroupChild.openingElement?.name?.name)
                );
              }
            );

            if (
              getMatchingSpecifier(inputGroupImport.imported?.name) &&
              !inputGroupItemImport &&
              needsInputGroupItemImport
            ) {
              context.report({
                node,
                message: `add missing import InputGroupItem from @patternfly/react-core`,
                fix(fixer) {
                  return fixer.insertTextAfter(
                    node.specifiers[node.specifiers.length - 1],
                    ", InputGroupItem"
                  );
                },
              });
            }
          },
          JSXElement(node) {
            const parentName = node.openingElement?.name?.name;
            if (parentName !== inputGroupImport.local?.name) {
              return;
            }
            const inputGroupTextName = inputGroupTextImport?.local?.name;

            node.children?.forEach((child) => {
              const childName = child.openingElement?.name?.name;
              if (
                [
                  "InputGroupItem",
                  inputGroupItemImport?.local?.name,
                  inputGroupTextName,
                ].includes(childName) ||
                ["JSXText", "Literal"].includes(child.type)
              ) {
                return;
              }

              const matchingChildImport = imports.find(
                (imp) => imp.local?.name === childName
              );
              const shouldFill =
                ["input", "textarea"].includes(childName) ||
                ["TextArea", "TextInput"].includes(
                  matchingChildImport?.imported?.name
                );

              context.report({
                node,
                message: `Any non-InputGroupText child passed to ${parentName} must now be wrapped within an InputGroupItem. The InputGroupItem may need the "isFill", "isPlain", and/or "isBox" props adjusted.`,
                fix(fixer) {
                  const sourceCode = context.getSourceCode();
                  const newChild = sourceCode.getText(child);

                  return fixer.replaceText(
                    child,
                    `<InputGroupItem${
                      shouldFill ? " isFill " : ""
                    }>${newChild}</InputGroupItem>`
                  );
                },
              });
            });
          },
        };
  },
};
