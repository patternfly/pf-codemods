import { AST, Rule } from "eslint";
import { ImportSpecifier, ExportSpecifier, Identifier, Node } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10016
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const previousName = "FormFiledGroupHeaderTitleTextObject";
    const newName = "FormFieldGroupHeaderTitleTextObject";

    const interfaceImport = imports.find(
      (specifier) => specifier.imported.name === previousName
    );

    if (!interfaceImport) {
      return {};
    }

    const importHasAlias =
      interfaceImport.local.name !== interfaceImport.imported.name;

    const reportMessage =
      "There was a typo in FormFiledGroupHeaderTitleTextObject interface. It was renamed to the intended FormFieldGroupHeaderTitleTextObject.";

    const callContextReport = (node: Node, nodeToReplace: Node | AST.Token) => {
      context.report({
        node,
        message: reportMessage,
        fix(fixer) {
          return fixer.replaceText(nodeToReplace, newName);
        },
      });
    };

    return {
      ImportSpecifier(node: ImportSpecifier) {
        if (node.imported.name === interfaceImport.imported.name) {
          callContextReport(node, node.imported);
        }
      },
      ExportSpecifier(node: ExportSpecifier) {
        if (!importHasAlias && node.local.name === previousName) {
          callContextReport(node, node.local);
        }
      },
      TSTypeReference(node: { typeName: Identifier }) {
        if (!importHasAlias && node.typeName.name === previousName) {
          callContextReport(node as unknown as Node, node.typeName);
        }
      },
      TSInterfaceHeritage(node: { expression: Identifier }) {
        if (!importHasAlias && node.expression.name === previousName) {
          callContextReport(node as unknown as Node, node.expression);
        }
      },
    };
  },
};
