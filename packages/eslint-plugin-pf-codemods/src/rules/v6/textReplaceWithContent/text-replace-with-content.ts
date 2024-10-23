import { Rule } from "eslint";
import {
  ImportDeclaration,
  ImportSpecifier,
  JSXClosingElement,
  JSXIdentifier,
  JSXOpeningElement,
} from "estree-jsx";
import {
  getAttribute,
  getFromPackage,
  IdentifierWithParent,
  pfPackageMatches,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10643

module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const textComponents = ["Text", "TextContent", "TextList", "TextListItem"];

    const nonComponentTextIdentifiers = [
      "TextProps",
      "TextVariants",
      "TextListVariants",
      "TextListItemVariants",
    ];

    const allTextIdentifiers = [
      ...textComponents,
      ...nonComponentTextIdentifiers,
    ];

    const textImports = imports.filter((specifier) =>
      allTextIdentifiers.includes(specifier.imported.name)
    );

    const errorMessage =
      "We have replaced Text, TextContent, TextList and TextListItem with one Content component. Running this fix will change all of those components names to Content and add a `component` prop where necessary.";

    function getNewText(specifier: string) {
      if (textComponents.includes(specifier)) {
        return "Content";
      }

      if (specifier === "TextProps") {
        return "ContentProps";
      }

      return "ContentVariants";
    }

    return !textImports.length
      ? {}
      : {
          ImportDeclaration(node: ImportDeclaration) {
            if (pfPackageMatches("@patternfly/react-core", node.source.value)) {
              const specifierToReplace = node.specifiers.find(
                (specifier) =>
                  specifier.type === "ImportSpecifier" &&
                  allTextIdentifiers.includes(specifier.imported.name)
              ) as ImportSpecifier;

              if (!specifierToReplace) {
                return;
              }

              const specifierName = specifierToReplace.imported.name;
              const newText = getNewText(specifierName);

              const importPath = node.source.value?.toString() as string;

              context.report({
                node,
                message: errorMessage,
                fix(fixer) {
                  const specifierFix = fixer.replaceText(
                    specifierToReplace,
                    newText
                  );

                  if (!importPath.includes("Text")) {
                    return specifierFix;
                  }

                  return [
                    specifierFix,
                    fixer.replaceText(
                      node.source,
                      `"${importPath.replace("Text", "Content")}"`
                    ),
                  ];
                },
              });
            }
          },
          JSXOpeningElement(node: JSXOpeningElement) {
            if (node.name.type === "JSXIdentifier") {
              const componentImport = textImports.find(
                (imp) => imp.local.name === (node.name as JSXIdentifier).name
              );

              if (!componentImport) {
                return;
              }

              const componentName = componentImport.imported.name as
                | "Text"
                | "TextContent"
                | "TextList"
                | "TextListItem";

              const componentAttribute = getAttribute(node, "component");

              context.report({
                node,
                message: errorMessage,
                fix(fixer) {
                  const fixes = [];

                  if (!componentAttribute && componentName !== "TextContent") {
                    const componentMap = {
                      Text: "p",
                      TextList: "ul",
                      TextListItem: "li",
                    };

                    fixes.push(
                      fixer.insertTextAfter(
                        node.name,
                        ` component="${componentMap[componentName]}"`
                      )
                    );
                  }

                  if (componentName === "TextContent") {
                    const isVisitedAttribute = getAttribute(node, "isVisited");
                    if (isVisitedAttribute) {
                      fixes.push(
                        fixer.replaceText(
                          isVisitedAttribute.name,
                          "isVisitedLink"
                        )
                      );
                    }
                  }

                  if (componentName === "TextList") {
                    const isPlainAttribute = getAttribute(node, "isPlain");
                    if (isPlainAttribute) {
                      fixes.push(
                        fixer.replaceText(isPlainAttribute.name, "isPlainList")
                      );
                    }
                  }

                  fixes.push(fixer.replaceText(node.name, "Content"));

                  return fixes;
                },
              });
            }
          },
          JSXClosingElement(node: JSXClosingElement) {
            if (node.name.type === "JSXIdentifier") {
              const componentImport = textImports.find(
                (imp) => imp.local.name === (node.name as JSXIdentifier).name
              );

              if (!componentImport) {
                return;
              }

              context.report({
                node,
                message: errorMessage,
                fix(fixer) {
                  return fixer.replaceText(node.name, "Content");
                },
              });
            }
          },
          Identifier(node: IdentifierWithParent) {
            const textImport = textImports.find(
              (imp) => imp.local.name === node.name
            );

            if (!textImport) {
              return;
            }

            const isComponent = textComponents.includes(node.name);

            // the JSXElement fixer will handle the text components
            if (isComponent) {
              return;
            }

            // imports are handled by the ImportDeclaration fixer
            if (node.parent && node.parent.type === "ImportSpecifier") {
              return;
            }

            const newText = getNewText(node.name);

            context.report({
              node,
              message: errorMessage,
              fix(fixer) {
                return [fixer.replaceText(node, newText)];
              },
            });
          },
        };
  },
};
