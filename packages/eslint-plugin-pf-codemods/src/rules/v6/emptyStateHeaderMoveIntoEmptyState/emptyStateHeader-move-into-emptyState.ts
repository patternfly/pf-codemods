import { Rule } from "eslint";
import {
  ImportSpecifier,
  JSXAttribute,
  JSXElement,
  JSXIdentifier,
  Node,
} from "estree-jsx";
import {
  getAttribute,
  getAttributeText,
  getAttributeValueText,
  getChildJSXElementByName,
  getDefaultImportsFromPackage,
  getExpression,
  getFromPackage,
  includesImport,
  nodeIsComponentNamed,
  getChildrenAsAttributeValueText,
  getRemoveElementFixes,
} from "../../helpers";
// https://github.com/patternfly/patternfly-react/pull/9947

const composeMessage = (
  hasTitleText?: boolean,
  hasIcon?: boolean,
  hasChildren?: boolean
) => {
  let message =
    "EmptyStateHeader has been moved inside of the EmptyState component and is now only customizable using props";
  const missingTitleTextMessage =
    ", and the titleText prop is now required on EmptyState.";

  if (hasTitleText) {
    message += ".";
  } else {
    message += missingTitleTextMessage;
  }

  if (hasTitleText && hasChildren) {
    message +=
      " Because the children for EmptyStateHeader are now inaccessible you must remove either the children or the titleText prop";
  } else if (!hasTitleText && !hasChildren) {
    message += " You must manually supply a titleText prop to EmptyState";
  }

  const hasHeader = [hasTitleText, hasIcon, hasChildren].some(
    (arg) => typeof arg !== "undefined"
  );

  if (hasTitleText === hasChildren && hasHeader) {
    message += ", then you can rerun this codemod.";
  }

  if (hasIcon) {
    message +=
      " Additionally, the EmptyStateIcon component now wraps content passed to the icon prop automatically.";
  }

  return message;
};

const iconPropIsEmptyStateIconComponent = (
  imports: ImportSpecifier[],
  identifier?: JSXIdentifier
) => {
  const emptyStateIconImport = imports.find(
    (specifier) => specifier.imported.name === "EmptyStateIcon"
  );

  if (!emptyStateIconImport) {
    return false;
  }

  return identifier?.name === emptyStateIconImport.local.name;
};

const iconPropIsIconElement = (
  context: Rule.RuleContext,
  identifier?: JSXIdentifier
) => {
  if (!identifier) {
    return;
  }

  const pfIconsPackage = "@patternfly/react-icons";
  const { imports: iconImports } = getFromPackage(context, pfIconsPackage);
  const iconDefaultImports = getDefaultImportsFromPackage(
    context,
    pfIconsPackage
  );
  const allIconImports = [...iconImports, ...iconDefaultImports];

  return allIconImports.some(
    (iconImport) => iconImport.local.name === identifier.name
  );
};

const getIconPropText = (
  context: Rule.RuleContext,
  iconElementIdentifier?: JSXIdentifier,
  emptyStateIconComponentIconAttribute?: JSXAttribute
) => {
  if (emptyStateIconComponentIconAttribute) {
    return context
      .getSourceCode()
      .getText(emptyStateIconComponentIconAttribute);
  }

  if (iconPropIsIconElement(context, iconElementIdentifier)) {
    return `icon={${iconElementIdentifier!.name}}`;
  }

  return "";
};

const getIcon = (
  context: Rule.RuleContext,
  node: Node,
  emptyStateIconComponent?: JSXElement,
  iconElementIdentifier?: JSXIdentifier
) => {
  const emptyStateIconComponentIconAttribute =
    emptyStateIconComponent && getAttribute(emptyStateIconComponent, "icon");

  const emptyStateIconComponentColorAttribute =
    emptyStateIconComponent && getAttribute(emptyStateIconComponent, "color");

  if (emptyStateIconComponentColorAttribute) {
    context.report({
      node,
      message: `The color prop on EmptyStateIcon has been removed. We suggest using the new status prop on EmptyState to apply colors to the icon.`,
    });
  }

  const iconProp = getIconPropText(
    context,
    iconElementIdentifier,
    emptyStateIconComponentIconAttribute
  );

  return iconProp;
};

module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const source = context.getSourceCode();
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

        const header = getChildJSXElementByName(node, "EmptyStateHeader");
        const emptyStateTitleTextAttribute = getAttribute(node, "titleText");

        if (!header && emptyStateTitleTextAttribute) {
          // early return if there is no header and the titleText attribute already exists on EmptyState as no changes
          // are needed
          return;
        }

        const titleChild = getChildJSXElementByName(node, "Title");

        if (
          (!header || header.type !== "JSXElement") &&
          (!titleChild || titleChild.type !== "JSXElement")
        ) {
          // report without fixer if there is no header/title or the header/title is not a React element, because
          // creating a titleText for the EmptyState in this case is difficult
          context.report({
            node,
            message: composeMessage(),
          });
          return;
        }

        const newEmptyStateProps: string[] = [];
        const removeElements: JSXElement[] = [];

        if (titleChild && !header) {
          // there is no header, but there is a Title as a child of the emptyState

          const titleComponentText = source.getText(titleChild);
          newEmptyStateProps.push(`titleText={${titleComponentText}}`);
          removeElements.push(titleChild);
        }

        const emptyStateIconChild = getChildJSXElementByName(
          node,
          "EmptyStateIcon"
        );

        let iconProp: string = "";

        if (emptyStateIconChild) {
          iconProp = getIcon(context, node, emptyStateIconChild);
          removeElements.push(emptyStateIconChild);
        }

        if (emptyStateIconChild && !header) {
          newEmptyStateProps.push(iconProp);
        }

        let hasTitleText = false;
        let hasIcon = !!emptyStateIconChild;
        let hasChildren = !!titleChild;

        if (header) {
          const headingClassNameAttribute = getAttribute(header, "className");
          const headingLevelAttribute = getAttribute(header, "headingLevel");
          const titleClassNameAttribute = getAttribute(
            header,
            "titleClassName"
          );
          const titleTextAttribute = getAttribute(header, "titleText");
          const headerIconAttribute = getAttribute(header, "icon");

          hasTitleText = !!titleTextAttribute;
          hasIcon ||= !!headerIconAttribute;
          hasChildren ||= header.children.length > 0;

          const message = composeMessage(hasTitleText, hasIcon, hasChildren);

          if (!titleTextAttribute && !hasChildren) {
            // report without fixer if there is a header, but it doesn't have titleText or children, because creating a
            // titleText for the EmptyState in this case is difficult
            context.report({ node, message });
            return;
          }

          if (titleTextAttribute && hasChildren) {
            // report without fixer if there is the header has a titleText and children, because creating an accessible
            // titleText for the EmptyState in this case is difficult
            context.report({ node, message });
            return;
          }

          const headingClassNameValue = getAttributeValueText(
            context,
            headingClassNameAttribute
          );
          const headingClassNameProp = headingClassNameValue
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
              header.children
            )}`;

          const iconPropValue = getExpression(headerIconAttribute?.value);

          const iconElementIdentifier =
            iconPropValue?.type === "JSXElement" &&
            iconPropValue.openingElement.name.type === "JSXIdentifier"
              ? iconPropValue.openingElement.name
              : undefined;

          const emptyStateIconComponent = iconPropIsEmptyStateIconComponent(
            imports,
            iconElementIdentifier
          )
            ? (iconPropValue as JSXElement)
            : undefined;

          if (headerIconAttribute) {
            iconProp = getIcon(
              context,
              node,
              emptyStateIconComponent,
              iconElementIdentifier
            );
          }

          removeElements.push(header);
          newEmptyStateProps.push(
            ...[
              headingClassNameProp,
              headingLevel,
              iconProp,
              titleClassName,
              titleText,
            ]
          );
        }

        context.report({
          node,
          message: composeMessage(hasTitleText, hasIcon, hasChildren),
          fix(fixer) {
            return [
              fixer.insertTextAfter(
                node.openingElement.name,
                ` ${newEmptyStateProps.join(" ")}`
              ),
              ...getRemoveElementFixes(context, fixer, removeElements),
            ];
          },
        });
      },
    };
  },
};
