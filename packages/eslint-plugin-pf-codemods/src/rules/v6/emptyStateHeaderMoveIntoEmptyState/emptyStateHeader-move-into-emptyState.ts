import { AST, Rule } from "eslint";
import { ImportSpecifier, JSXElement } from "estree-jsx";
import {
  getAttribute,
  getAttributeText,
  getAttributeValueText,
  getChildElementByName,
  getDefaultImportsFromPackage,
  getExpression,
  getFromPackage,
  includesImport,
  nodeIsComponentNamed,
  getChildrenAsAttributeValueText,
} from "../../helpers";

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

        const titleText =
          titleTextPropValue ||
          `titleText=${getChildrenAsAttributeValueText(
            context,
            headerChildren
          )}`;

        const iconPropValue = getExpression(headerIconAttribute?.value);

        const iconElementIdentifier =
          iconPropValue?.type === "JSXElement" &&
          iconPropValue.openingElement.name.type === "JSXIdentifier"
            ? iconPropValue.openingElement.name
            : undefined;

        const iconPropIsEmptyStateIconComponent = () => {
          const emptyStateIconImport = imports.find(
            (specifier) => specifier.imported.name === "EmptyStateIcon"
          );

          return (
            iconElementIdentifier?.name === emptyStateIconImport?.local.name
          );
        };

        const iconPropIsIconElement = () => {
          const pfIconsPackage = "@patternfly/react-icons";
          const { imports: iconSpecifiers } = getFromPackage(
            context,
            pfIconsPackage
          );
          const iconDefaultSpecifiers = getDefaultImportsFromPackage(
            context,
            pfIconsPackage
          );
          const allIconSpecifiers = [
            ...iconSpecifiers,
            ...iconDefaultSpecifiers,
          ];

          return (
            iconElementIdentifier !== undefined &&
            allIconSpecifiers.some(
              (spec) => spec.local.name === iconElementIdentifier.name
            )
          );
        };

        const emptyStateIconComponent = iconPropIsEmptyStateIconComponent()
          ? (iconPropValue as JSXElement)
          : undefined;

        const emptyStateIconComponentIconAttribute =
          emptyStateIconComponent &&
          getAttribute(emptyStateIconComponent, "icon");

        const emptyStateIconComponentColorAttribute =
          emptyStateIconComponent &&
          getAttribute(emptyStateIconComponent, "color");

        if (emptyStateIconComponentColorAttribute) {
          context.report({
            node,
            message: `The color prop on EmptyStateIcon has been removed. We suggest using the new status prop on EmptyState to apply colors to the icon.`,
          });
        }

        const icon = emptyStateIconComponentIconAttribute
          ? context
              .getSourceCode()
              .getText(emptyStateIconComponentIconAttribute)
          : iconPropIsIconElement()
          ? `icon={${iconElementIdentifier!.name}}`
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
