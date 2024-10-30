import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage, getAttribute, getAttributeValue } from "../../helpers";

const replacementMap: { [key: string]: string } = {
  cyan: "teal",
  gold: "yellow",
};

// https://github.com/patternfly/patternfly-react/pull/10661
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter((specifier) =>
      ["Banner", "Label"].includes(specifier.imported.name)
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const colorProp = getAttribute(node, "color");
              if (!colorProp) {
                return;
              }

              const colorValue = getAttributeValue(
                context,
                colorProp.value
              ) as string;
              if (Object.keys(replacementMap).includes(colorValue)) {
                const newColorValue = replacementMap[colorValue];
                const message = `The \`color\` prop on ${node.name.name} has been updated to replace "${colorValue}" with "${newColorValue}".`;
                context.report({
                  node,
                  message,
                  fix(fixer) {
                    return fixer.replaceText(
                      colorProp,
                      `color="${newColorValue}"`
                    );
                  },
                });
              }
            }
          },
        };
  },
};
