import { Rule } from "eslint";
import {
  ImportDefaultSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXElement,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName,
  JSXOpeningElement,
} from "estree-jsx";
import { getAllImportsFromPackage, getChildElementByName } from "../../helpers";
import { stringifyJSXElement } from "../../helpers/stringifyJSXElement";
import { ImportDefaultSpecifierWithParent } from "../../helpers";
// https://github.com/patternfly/patternfly-react/pull/10809

// new interfaces, just local for now to avoid conflicts with the masthead rename RP
interface JSXElementWithParent extends JSXElement {
  parent?: JSXElement;
}

interface JSXOpeningElementWithParent extends JSXOpeningElement {
  parent?: JSXElementWithParent;
}

// same story here, will remove this from this file once the other PR is in and I can merge it into this branch
function getAttributeName(attr: JSXAttribute) {
  switch (attr.name.type) {
    case "JSXIdentifier":
      return attr.name.name;
    case "JSXNamespacedName":
      return attr.name.name.name;
  }
}

// same story here, will remove this from this file once the other PR is in and I can merge it into this branch
function hasCodeModDataTag(openingElement: JSXOpeningElement) {
  const nonSpreadAttributes = openingElement.attributes.filter(
    (attr) => attr.type === "JSXAttribute"
  );
  const attributeNames = nonSpreadAttributes.map((attr) =>
    getAttributeName(attr as JSXAttribute)
  );
  return attributeNames.includes("data-codemods");
}

// Similar story here, will use the getName helper from my other PR once it goes in
function getName(
  nodeName: JSXIdentifier | JSXMemberExpression | JSXNamespacedName
) {
  switch (nodeName.type) {
    case "JSXIdentifier":
      return nodeName.name;
    case "JSXMemberExpression":
      return getName(nodeName.object);
    case "JSXNamespacedName":
      return nodeName.namespace.name;
  }
}

// and here
function getDeclarationString(
  defaultImportSpecifier: ImportDefaultSpecifierWithParent
) {
  return defaultImportSpecifier?.parent?.source.value?.toString();
}
// and here
function getComponentImportName(
  importSpecifier: ImportSpecifier | ImportDefaultSpecifierWithParent,
  potentialNames: string[]
) {
  if (importSpecifier.type === "ImportSpecifier") {
    return importSpecifier.imported.name;
  }

  return potentialNames.find((name) =>
    getDeclarationString(importSpecifier)?.includes(name)
  );
}

function moveNodeIntoMastheadMain(
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  node: JSXOpeningElementWithParent,
  componentImports: (ImportSpecifier | ImportDefaultSpecifier)[]
) {
  if (!node.parent || !node.parent.parent) {
    return [];
  }

  const namedImports = componentImports.filter(
    (imp) => imp.type === "ImportSpecifier"
  );

  const mastheadMainImport = namedImports.find(
    (name) => (name as ImportSpecifier).imported.name === "MastheadMain"
  );
  const isAlias =
    (mastheadMainImport as ImportSpecifier)?.imported.name !==
    mastheadMainImport?.local.name;

  const componentName =
    mastheadMainImport && isAlias
      ? mastheadMainImport.local.name
      : "MastheadMain";

  const mastheadMain = getChildElementByName(node.parent.parent, componentName);

  if (!mastheadMain) {
    return [];
  }

  const fixes = [fixer.remove(node.parent)];

  const nodeString = stringifyJSXElement(context, node.parent);

  fixes.push(fixer.insertTextAfter(mastheadMain.openingElement, nodeString));

  return fixes;
}

function wrapNodeInMastheadBrand(
  fixer: Rule.RuleFixer,
  node: JSXOpeningElementWithParent,
  componentImports: (ImportSpecifier | ImportDefaultSpecifier)[]
) {
  if (!node.parent) {
    return [];
  }

  const fixes = [];

  const closingNode = node.parent?.closingElement
    ? node.parent.closingElement
    : node;

  const importCount = componentImports.length - 1;
  const lastImport = componentImports[importCount];

  const namedImports = componentImports.filter(
    (imp) => imp.type === "ImportSpecifier"
  );

  const mastheadBrandImport = namedImports.find(
    (name) => (name as ImportSpecifier).imported.name === "MastheadBrand"
  );
  const isAlias =
    (mastheadBrandImport as ImportSpecifier)?.imported.name !==
    mastheadBrandImport?.local.name;

  const componentName =
    mastheadBrandImport && isAlias
      ? mastheadBrandImport.local.name
      : "MastheadBrand";

  fixes.push(fixer.insertTextBefore(node, `<${componentName} data-codemods>`));
  fixes.push(fixer.insertTextAfter(closingNode, `</${componentName}>`));

  if (!mastheadBrandImport) {
    fixes.push(fixer.insertTextAfter(lastImport, ", MastheadBrand"));
  }

  return fixes;
}

module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const targetComponents = [
      "MastheadBrand",
      "MastheadToggle",
      "MastheadLogo",
      "Masthead",
      "MastheadMain"
    ];
    const componentImports = getAllImportsFromPackage(
      context,
      "@patternfly/react-core",
      targetComponents
    );

    const message =
      "The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.";

    function isPFImport(
      node: JSXOpeningElementWithParent,
      potentialComponentNames: string[]
    ) {
      const nodeName = getName(node.name);
      const nodeImport = componentImports.find(
        (imp) => imp.local.name === nodeName
      );

      if (!(nodeImport?.type === "ImportSpecifier")) {
        return false;
      }

      const nodeImportedName = nodeImport.imported.name;

      return componentImports
        .map((imp) => getComponentImportName(imp, potentialComponentNames))
        .includes(nodeImportedName);
    }

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElementWithParent) {
            if (
              node.name.type !== "JSXIdentifier" ||
              !isPFImport(node, targetComponents)
            ) {
              return;
            }
            const parentOpeningElement = node.parent?.parent?.openingElement;

            if (!parentOpeningElement) {
              return;
            }

            const nodeName = node.name.name;

            const nodeImport = componentImports.find(
              (imp) => imp.local.name === nodeName
            );

            const nodeImportedName =
              nodeImport?.type === "ImportSpecifier" &&
              nodeImport.imported.name;

            const parentName =
              parentOpeningElement.name.type === "JSXIdentifier" &&
              parentOpeningElement.name.name;

            const parentImport = componentImports.find(
              (imp) => imp.local.name === parentName
            );
   
            const parentImportedName =
              parentImport?.type === "ImportSpecifier" &&
              parentImport.imported.name;

            if (
              nodeImportedName === "MastheadToggle" &&
              parentImportedName !== "MastheadMain"
            ) {
              context.report({
                node,
                message,
                fix: (fixer) =>
                  moveNodeIntoMastheadMain(
                    context,
                    fixer,
                    node,
                    componentImports
                  ),
              });
              return;
            }

            const isPreRenameMastheadBrand =
              nodeImportedName === "MastheadBrand" &&
              parentImportedName === "MastheadMain" &&
              !hasCodeModDataTag(node);

            const isPostRenameMastheadBrand =
              nodeImportedName === "MastheadLogo" &&
              parentImportedName !== "MastheadBrand";

            if (isPreRenameMastheadBrand || isPostRenameMastheadBrand) {
              context.report({
                node,
                message,
                fix: (fixer) =>
                  wrapNodeInMastheadBrand(fixer, node, componentImports),
              });
            }
          },
        };
  },
};
