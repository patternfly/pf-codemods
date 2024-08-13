import { Rule } from "eslint";
import { ImportSpecifier } from "estree-jsx";
import { JSXOpeningElementWithParent } from "../../helpers";
import {
  getAllImportsFromPackage,
  getChildElementByName,
  getImportedName,
  getLocalComponentName,
  hasCodeModDataTag,
} from "../../helpers";
// https://github.com/patternfly/patternfly-react/pull/10809

function moveNodeIntoMastheadMain(
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  node: JSXOpeningElementWithParent,
  namedImports: ImportSpecifier[]
) {
  if (!node.parent || !node.parent.parent) {
    return [];
  }

  const localMastheadMain = getLocalComponentName(namedImports, "MastheadMain");
  const mastheadMain = getChildElementByName(
    node.parent.parent,
    localMastheadMain
  );

  if (!mastheadMain) {
    return [];
  }

  const fixes = [fixer.remove(node.parent)];

  const nodeString = context.getSourceCode().getText(node.parent);

  fixes.push(fixer.insertTextAfter(mastheadMain.openingElement, nodeString));

  return fixes;
}

function wrapNodeInMastheadBrand(
  fixer: Rule.RuleFixer,
  node: JSXOpeningElementWithParent,
  namedImports: ImportSpecifier[]
) {
  if (!node.parent) {
    return [];
  }

  const fixes = [];

  const closingNode = node.parent?.closingElement
    ? node.parent.closingElement
    : node;

  const importCount = namedImports.length - 1;
  const lastImport = namedImports[importCount];

  const localMastheadBrand = getLocalComponentName(
    namedImports,
    "MastheadBrand"
  );

  fixes.push(
    fixer.insertTextBefore(node, `<${localMastheadBrand} data-codemods>`)
  );
  fixes.push(fixer.insertTextAfter(closingNode, `</${localMastheadBrand}>`));

  if (!namedImports.some((imp) => imp.imported.name === "MastheadBrand")) {
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
      "MastheadMain",
    ];
    const componentImports = getAllImportsFromPackage(
      context,
      "@patternfly/react-core",
      targetComponents
    );
    const _namedImports = componentImports.filter(
      (imp) => imp.type === "ImportSpecifier"
    );
    // TS isn't properly resolving that namedImports is just ImportSpecifiers, hence this seemingly unneeded assertion
    const namedImports = _namedImports as ImportSpecifier[];

    const message =
      "The structure of Masthead has been updated, MastheadToggle and MastheadBrand should now be wrapped in MastheadMain.";

    return !namedImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElementWithParent) {
            const nodeImportedName = getImportedName(namedImports, node);

            if (node.name.type !== "JSXIdentifier" || !nodeImportedName) {
              return;
            }
            const parentOpeningElement = node.parent?.parent?.openingElement;

            if (!parentOpeningElement) {
              return;
            }

            const parentImportedName = getImportedName(
              namedImports,
              parentOpeningElement
            );

            if (
              nodeImportedName === "MastheadToggle" &&
              parentImportedName !== "MastheadMain"
            ) {
              context.report({
                node,
                message,
                fix: (fixer) =>
                  moveNodeIntoMastheadMain(context, fixer, node, namedImports),
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
                  wrapNodeInMastheadBrand(fixer, node, namedImports),
              });
            }
          },
        };
  },
};
