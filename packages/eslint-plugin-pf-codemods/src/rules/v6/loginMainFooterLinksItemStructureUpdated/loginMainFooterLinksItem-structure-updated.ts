import { Rule } from "eslint";
import { JSXElement } from "estree-jsx";
import {
  getAttribute,
  getAttributeText,
  getExpression,
  getFromPackage,
  includesImport,
  nodeIsComponentNamed,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10107
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    if (!includesImport(imports, "LoginMainFooterLinksItem")) {
      return {};
    }

    return {
      JSXElement(node: JSXElement) {
        if (!nodeIsComponentNamed(node, "LoginMainFooterLinksItem")) {
          return;
        }

        const dataCodemods = "data-codemods";

        if (getAttribute(node, dataCodemods)) {
          return;
        }

        const hrefAttribute = getAttribute(node, "href");
        const targetAttribute = getAttribute(node, "target");
        const linkComponentAttribute = getAttribute(node, "linkComponent");
        const linkComponentPropsAttribute = getAttribute(
          node,
          "linkComponentProps"
        );
        const childrenAttribute = getAttribute(node, "children");

        const hrefAttributeText = getAttributeText(context, hrefAttribute);
        const targetAttributeText = getAttributeText(context, targetAttribute);

        const linkComponentPropsExpression = getExpression(
          linkComponentPropsAttribute?.value
        );
        const linkComponentPropsSpread = linkComponentPropsExpression
          ? `{...${context
              .getSourceCode()
              .getText(linkComponentPropsExpression)}}`
          : "";

        const childrenAttributeExpression = getExpression(
          childrenAttribute?.value
        );
        const childrenAttributeValueText = childrenAttributeExpression
          ? context.getSourceCode().getText(childrenAttributeExpression)
          : "";

        const wrapperProps = [
          !hrefAttributeText ? 'href=""' : hrefAttributeText, // default value of 'href' attribute was an empty string
          targetAttributeText,
          linkComponentPropsSpread,
        ]
          .filter((prop) => prop !== "")
          .join(" ");

        const getLinkComponentValue = () => {
          const componentValue = linkComponentAttribute?.value;

          if (componentValue?.type === "Literal") {
            return componentValue.value as string;
          }

          if (
            componentValue?.type === "JSXExpressionContainer" &&
            componentValue.expression.type === "Literal" &&
            typeof componentValue.expression.value === "string"
          ) {
            return componentValue.expression.value;
          }
        };

        const component = getLinkComponentValue() ?? "a"; // default value of the 'component' attribute of LoginMainFooterLinksItem was "a"

        const buttonVariant = component === "a" ? "link" : "plain";

        const componentAttributeText =
          component === "button" ? "" : `component="${component}" `;

        const wrapperOpeningElement = `<Button variant="${buttonVariant}" ${componentAttributeText}${wrapperProps}>`;
        const wrapperClosingElement = "</Button>";

        context.report({
          node,
          message:
            "LoginMainFooterLinksItem structure has changed. Instead of passing it many properties, everything is now passed directly in a children component.",
          fix(fixer) {
            let fixes: Rule.Fix[] = [];

            const removeAttributes = [
              hrefAttribute,
              targetAttribute,
              linkComponentAttribute,
              linkComponentPropsAttribute,
              childrenAttribute,
            ]
              .filter((attr) => attr !== undefined)
              .map((attr) => fixer.remove(attr!));

            fixes.push(
              fixer.insertTextAfter(
                node.openingElement.name,
                ` ${dataCodemods}="true" `
              ),
              fixer.insertTextAfter(node.openingElement, wrapperOpeningElement),
              ...removeAttributes
            );

            if (node.openingElement.selfClosing) {
              const openingElementRange = node.openingElement.range;
              if (openingElementRange) {
                fixes.push(
                  fixer.removeRange([
                    openingElementRange[1] - 2,
                    openingElementRange[1] - 1,
                  ])
                );
              }
              fixes.push(
                fixer.insertTextAfter(
                  node.openingElement,
                  `${childrenAttributeValueText}${wrapperClosingElement}</LoginMainFooterLinksItem>`
                )
              );
            } else {
              fixes.push(
                fixer.insertTextBefore(
                  node.closingElement!,
                  `${childrenAttributeValueText}${wrapperClosingElement}`
                )
              );
            }

            return fixes;
          },
        });
      },
    };
  },
};
