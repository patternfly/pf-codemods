import { AST, Rule } from "eslint";
import {
  JSXElement,
  ImportDeclaration,
  ImportSpecifier,
  JSXAttribute,
  Node,
  JSXText,
  JSXExpressionContainer,
  JSXSpreadChild,
  JSXFragment,
} from "estree-jsx";
import { getFromPackage, pfPackageMatches } from "../../helpers";

const baseMessage =
  "EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props, and the EmptyStateIcon component now wraps content passed to the icon prop automatically. Additionally, the titleText prop is now required on EmptyState.";

// https://github.com/patternfly/patternfly-react/pull/9947
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const pkg = "@patternfly/react-core";
    const { imports } = getFromPackage(context, pkg);

    const allOfType = (nodes: Node[], type: string) =>
      nodes.every((specifier) => specifier.type === type);

    const includesImport = (
      arr: ImportDeclaration["specifiers"],
      targetImport: string
    ) => {
      if (!allOfType(arr, "ImportSpecifier")) {
        return false;
      }

      return arr.some(
        (specifier) =>
          (specifier as ImportSpecifier).imported.name === targetImport
      );
    };

    if (!includesImport(imports, "EmptyState")) {
      return {};
    }

    const getChildElementByName = (name: string, node: JSXElement) =>
      node.children?.find(
        (child) =>
          child.type === "JSXElement" &&
          child.openingElement.name.type === "JSXIdentifier" &&
          child.openingElement.name.name === name
      );

    const isComponentNode = (node: JSXElement, componentName: string) => {
      if (node.openingElement.name.type === "JSXIdentifier") {
        return node.openingElement.name.name === componentName;
      }

      return false;
    };

    const getAttribute = (
      node: JSXElement,
      attributeName: string
    ): JSXAttribute | undefined => {
      const attributes = node.openingElement.attributes.filter(
        (attr) => attr.type === "JSXAttribute"
      ) as JSXAttribute[];
      return attributes.find((attr) => attr.name.name === attributeName);
    };

    const getExpressionValue = (node?: JSXAttribute["value"]) => {
      if (!node) {
        return;
      }

      if (node.type === "JSXExpressionContainer") {
        return node.expression;
      }
    };

    const getAttributeText = (attribute?: JSXAttribute) => {
      if (!attribute) {
        return "";
      }

      return context.getSourceCode().getText(attribute);
    };

    const getAttributeValueText = (attribute?: JSXAttribute) => {
      if (!attribute || !attribute.value) {
        return "";
      }

      return context.getSourceCode().getText(attribute.value);
    };

    const getNodesText = (nodes: Node[]) => {
      return nodes
        .map((node) => context.getSourceCode().getText(node))
        .join("");
    };

    const getElementChildText = (children: JSXElement["children"]) => {
      if (!children.length) {
        return "";
      }

      switch (children[0].type) {
        case "JSXText":
          return (children as JSXText[]).map((child) => child.value).join("");
        case "JSXExpressionContainer":
        case "JSXSpreadChild":
          return getNodesText(
            children.map(
              (child) =>
                (child as JSXExpressionContainer | JSXSpreadChild).expression
            )
          );
        case "JSXElement":
        case "JSXFragment":
          return getNodesText(children as JSXElement[] | JSXFragment[]);
        default:
          return "";
      }
    };

    return {
      JSXElement(node: JSXElement) {
        if (!isComponentNode(node, "EmptyState")) {
          return;
        }

        const header = getChildElementByName("EmptyStateHeader", node);
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
          headingClassNameAttribute
        );

        const headingClassName = headingClassNameValue
          ? `headerClassName=${headingClassNameValue}`
          : "";
        const headingLevel = getAttributeText(headingLevelAttribute);
        const titleClassName = getAttributeText(titleClassNameAttribute);
        const titleTextPropValue = getAttributeText(titleTextAttribute);

        const titleText =
          titleTextPropValue ||
          `titleText="${getElementChildText(headerChildren)}"`;

        const iconPropValue = getExpressionValue(headerIconAttribute?.value);

        const emptyStateIconComponent =
          iconPropValue?.type === "JSXElement" ? iconPropValue : undefined;

        const emptyStateIconComponentIconAttribute =
          emptyStateIconComponent &&
          getAttribute(emptyStateIconComponent, "icon");

        const emptyStateIconComponentColorAttribute =
          emptyStateIconComponent &&
          getAttribute(emptyStateIconComponent, "color");
        const emptyStateIconComponentColor = getAttributeText(
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
