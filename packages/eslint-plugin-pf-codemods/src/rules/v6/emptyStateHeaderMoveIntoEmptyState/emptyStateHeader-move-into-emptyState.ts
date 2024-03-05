import { AST, Rule } from "eslint";
import {
  ImportSpecifier,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  Node,
} from "estree-jsx";
import { getFromPackage } from "../../helpers";
import {
  getAttributeText,
  getAttributeValueText,
  getNodesText,
} from "../../helpers/getText";
import { includesImport } from "../../helpers/includesImport";
import {
  getChildElementByName,
  nodeIsComponentNamed,
} from "../../helpers/JSXElements";
import { getAttribute, getExpression } from "../../helpers/JSXAttributes";

const baseMessage =
  "EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState.";

// https://github.com/patternfly/patternfly-react/pull/9947
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const pkg = "@patternfly/react-core";
    const { imports } = getFromPackage(context, pkg);

    if (!includesImport(imports, "EmptyState")) {
      return {};
    }

    return {
      JSXElement(node: JSXElement) {
        if (!nodeIsComponentNamed(node, "EmptyState")) {
          return;
        }

        const header = getChildElementByName(node, "EmptyStateHeader");
        const emptyStateTitleTextAttribute = getAttribute(node, "titleText");

        if (!header && !emptyStateTitleTextAttribute) {
          context.report({
            node,
            message: `${baseMessage} You must manually supply a titleText prop to EmptyState.`,
          });
          return;
        }

        if (!header || header.type !== "JSXElement") {
          return;
        }

        const headingClassNameAttribute = getAttribute(header, "className");
        const headingLevelAttribute = getAttribute(header, "headingLevel");
        const titleClassNameAttribute = getAttribute(header, "titleClassName");
        const titleTextAttribute = getAttribute(header, "titleText");
        const headerIconAttribute = getAttribute(header, "icon");

        const headerChildren = header.children;

        if (!titleTextAttribute && !headerChildren.length) {
          context.report({
            node,
            message: `${baseMessage} You must manually supply a titleText prop to EmptyState, then you can rerun this codemod.`,
          });
          return;
        }

        if (titleTextAttribute && headerChildren.length) {
          context.report({
            node,
            message: `${baseMessage} Because the children for EmptyStateHeader are now inaccessible you must remove either the children or the titleText prop, then you can rerun this codemod.`,
          });
          return;
        }

        const headingClassNameValue = getAttributeValueText(
          context,
          headingClassNameAttribute
        );

        const headingClassName = headingClassNameValue
          ? `headerClassName=${headingClassNameValue}`
          : "";
        const headingLevel = getAttributeText(context, headingLevelAttribute);
        const titleClassName = getAttributeText(
          context,
          titleClassNameAttribute
        );
        const titleTextPropValue = getAttributeText(
          context,
          titleTextAttribute
        );

        const getChildrenText = (children: JSXElement["children"]) => {
          if (!children.length) {
            return "";
          }

          if (children.length === 1 && children[0].type === "JSXText") {
            return `"${children[0].value.trim()}"`;
          }

          const potentialSingleChild = children.filter(
            (child) => !(child.type === "JSXText" && child.value.trim() === "")
          );

          if (potentialSingleChild.length === 1) {
            const singleChild = potentialSingleChild[0];
            const singleChildText = context
              .getSourceCode()
              .getText(
                singleChild as JSXExpressionContainer | JSXElement | JSXFragment
              );

            return singleChild.type === "JSXExpressionContainer"
              ? singleChildText
              : `{${singleChildText}}`;
          }

          return `{<>${getNodesText(context, children as Node[])}</>}`;
        };

        const titleText =
          titleTextPropValue || `titleText=${getChildrenText(headerChildren)}`;

        const iconPropValue = getExpression(headerIconAttribute?.value);

        const emptyStateIconComponent =
          iconPropValue?.type === "JSXElement" ? iconPropValue : undefined;

        const emptyStateIconComponentIconAttribute =
          emptyStateIconComponent &&
          getAttribute(emptyStateIconComponent, "icon");

        const emptyStateIconComponentColorAttribute =
          emptyStateIconComponent &&
          getAttribute(emptyStateIconComponent, "color");
        const emptyStateIconComponentColor = getAttributeText(
          context,
          emptyStateIconComponentColorAttribute
        );

        if (emptyStateIconComponentColor) {
          context.report({
            node,
            message: `The color prop on EmptyStateIcon has been removed. We suggest using the new status prop on EmptyState to apply colors to the icon.`,
          });
        }

        const icon = emptyStateIconComponentIconAttribute
          ? context
              .getSourceCode()
              .getText(emptyStateIconComponentIconAttribute)
          : "";

        context.report({
          node,
          message: baseMessage,
          fix(fixer) {
            const removeEmptyLineAfter = (
              node?: JSXElement | ImportSpecifier | AST.Token | null
            ) => {
              if (!node) {
                return [];
              }
              const token = context.getSourceCode().getTokenAfter(node);

              return token &&
                token.type === "JSXText" &&
                token.value.trim() === ""
                ? [fixer.remove(token)]
                : [];
            };

            const removeElement = (node?: JSXElement) => {
              if (!node) {
                return [];
              }

              return [fixer.remove(node)];
            };

            return [
              fixer.insertTextAfter(
                node.openingElement.name,
                ` ${headingClassName} ${headingLevel} ${icon} ${titleClassName} ${titleText}`
              ),
              ...removeElement(header),
              ...removeEmptyLineAfter(header),
            ];
          },
        });
      },
    };
  },
};
