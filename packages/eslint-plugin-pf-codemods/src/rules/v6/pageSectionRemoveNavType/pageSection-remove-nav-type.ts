import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import {
  getFromPackage,
  getAttribute,
  getAttributeValue,
  isEnumValue,
} from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/10650
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const pageSectionImport = imports.find(
      (specifier) => specifier.imported.name === "PageSection"
    );
    const pageSectionTypeEnum = imports.find(
      (specifier) => specifier.imported.name === "PageSectionTypes"
    );

    return !pageSectionImport
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              pageSectionImport.local.name === node.name.name
            ) {
              const typeProp = getAttribute(node, "type");
              if (!typeProp || !typeProp.value) {
                return;
              }

              const { type: typePropType, value: typePropValue } =
                getAttributeValue(context, typeProp.value);

              const isEnumValueNav =
                pageSectionTypeEnum &&
                typePropType === "MemberExpression" &&
                isEnumValue(
                  context,
                  typePropValue,
                  pageSectionTypeEnum.local.name,
                  "nav"
                );

              if (typePropValue !== "nav" && !isEnumValueNav) {
                return;
              }

              context.report({
                node,
                message: 'The "nav" type for PageSection has been removed.',
                fix(fixer) {
                  return fixer.remove(typeProp);
                },
              });
            }
          },
        };
  },
};
