import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10378
module.exports = {
  meta: {},
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImport = imports.find(
      (specifier) => specifier.imported.name === "Slider"
    );

    return !componentImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImport.local.name === node.name.name
            ) {
              context.report({
                node,
                message:
                  "The `--pf-v6-c-slider__step--Left` CSS variable applied as an inline style to SliderStep has been updated to the `--pf-v6-c-slider__step--InsetInlineStart` CSS variable.",
              });
            }
          },
        };
  },
};
