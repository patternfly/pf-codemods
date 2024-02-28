import { getFromPackage } from "../../helpers";
import { Rule } from "eslint";
import { ImportDeclaration } from "estree-jsx";

// https://github.com/patternfly/patternfly-react/pull/10026
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const simpleFileUploadImport = imports.find(
      (specifier: { imported: { name: string } }) =>
        specifier.imported.name === "SimpleFileUpload"
    );

    return !simpleFileUploadImport
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (
              node.specifiers.find(
                (specifier) =>
                  specifier.type === "ImportSpecifier" &&
                  specifier.imported.name ===
                    simpleFileUploadImport.imported.name
              )
            ) {
              context.report({
                node,
                message: `The \`aria-describedby\` attribute was removed from the TextInput within the SimpleFileUpload, and the \`id\` attribute was removed from the "browse" button. Instead use the new \`browseButtonAriaDescribedby\` prop to provide a description to the browse button.

Additionally, we recommend using our FileUploadHelperText component as a child to the FileUpload, instead of using our FormHelperText (the previous recommendation).`,
              });
            }
          },
        };
  },
};
