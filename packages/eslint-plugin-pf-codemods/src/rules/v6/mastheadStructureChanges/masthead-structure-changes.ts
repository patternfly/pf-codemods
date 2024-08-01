import { Rule } from "eslint";
import {
  ImportDefaultSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXElement,
  JSXOpeningElement,
} from "estree-jsx";
import { getAllImportsFromPackage, getChildElementByName } from "../../helpers";
import { stringifyJSXElement } from "../../helpers/stringifyJSXElement";
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

function moveNodeIntoMastheadMain(
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  node: JSXOpeningElementWithParent
) {
  if (!node.parent || !node.parent.parent) {
    return [];
  }

  const mastheadMain = getChildElementByName(
    node.parent.parent,
    "MastheadMain"
  );

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

  fixes.push(fixer.insertTextBefore(node, "<MastheadBrand data-codemods>"));
  fixes.push(fixer.insertTextAfter(closingNode, "</MastheadBrand>"));

  const importCount = componentImports.length - 1;
  const lastImport = componentImports[importCount];

  const namedImports = componentImports.filter(
    (imp) => imp.type === "ImportSpecifier"
  );
  const importNames = namedImports.map(
    (imp) => (imp as ImportSpecifier).imported.name
  );

  if (!importNames.includes("MastheadBrand")) {
    fixes.push(fixer.insertTextAfter(lastImport, ", MastheadBrand"));
  }

  return fixes;
}

module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const componentImports = getAllImportsFromPackage(
      context,
      "@patternfly/react-core",
      ["MastheadBrand", "MastheadToggle", "MastheadLogo"]
    );

    const message =
      "The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.";

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElementWithParent) {
            if (
              node.name.type !== "JSXIdentifier" ||
              !componentImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              return;
            }
            const parentOpeningElement = node.parent?.parent?.openingElement;

            if (!parentOpeningElement) {
              return;
            }

            const nodeName = node.name.name;
            const parentName =
              parentOpeningElement.name.type === "JSXIdentifier" &&
              parentOpeningElement.name.name;

            if (
              nodeName === "MastheadToggle" &&
              parentName !== "MastheadMain"
            ) {
              context.report({
                node,
                message,
                fix: (fixer) => moveNodeIntoMastheadMain(context, fixer, node),
              });
              return;
            }

            const isPreRenameMastheadBrand =
              nodeName === "MastheadBrand" &&
              parentName === "MastheadMain" &&
              !hasCodeModDataTag(node);

            const isPostRenameMastheadBrand =
              nodeName === "MastheadLogo" && parentName !== "MastheadBrand";

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
