const { getPackageImports } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/9074
module.exports = {
  meta: { fixable: "code" },
  create: function (context) {
    const inputGroupImport = getPackageImports(
      context,
      "@patternfly/react-core"
    ).find((specifier) => specifier.imported?.name == "InputGroup");

    return !inputGroupImport
      ? {}
      : {
          ImportDeclaration(node) {
            const getMatchingSpecifier = (name) =>
              node.specifiers.find(
                (specifier) => specifier.imported?.name === name
              );
            if (
              getMatchingSpecifier(inputGroupImport.imported?.name) &&
              !getMatchingSpecifier("InputGroupItem")
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

            node.children?.forEach((child) => {
              const childName = child.openingElement?.name?.name;
              console.log(child);
              if (
                childName === "InputGroupItem" ||
                ["JSXText", "Literal"].includes(child.type)
              ) {
                return;
              }

              let inputGroupItemProps = "";

              if (
                ["input", "textarea", "TextArea", "TextInput"].includes(
                  childName
                )
              ) {
                inputGroupItemProps = " isFill";
              } else if (childName === "InputGroupText") {
                inputGroupItemProps = " isBox";
              }

              context.report({
                node,
                message: `Each child passed to ${parentName} must now be wrapped within an InputGroupItem. The InputGroupItem may also need the "isFill", "isPlain", and/or "isBox" props passed in.`,
                fix(fixer) {
                  return fixer.replaceText(
                    child,
                    `<InputGroupItem${inputGroupItemProps}>${context
                      .getSourceCode()
                      .getText(child)}</InputGroupItem>`
                  );
                },
              });
            });
          },
        };
  },
};
