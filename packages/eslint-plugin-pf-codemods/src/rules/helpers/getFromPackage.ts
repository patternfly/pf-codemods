import { Rule } from "eslint";
import {
  ImportDeclaration,
  ModuleDeclaration,
  Statement,
  Directive,
  ExportNamedDeclaration,
  ImportDefaultSpecifier,
  ImportSpecifier,
  ExportSpecifier,
} from "estree-jsx";
import { pfPackageMatches } from "./pfPackageMatches";
import { ImportDefaultSpecifierWithParent } from "./interfaces";

type Declarations = ImportDeclaration | ExportNamedDeclaration;
type Specifiers = ImportSpecifier | ExportSpecifier;

function filterByPackageName(nodes: Declarations[], packageName: string) {
  return nodes.filter((node) => {
    const nodeValue = node?.source?.value;

    if (typeof nodeValue !== "string") {
      return false;
    }
    if (packageName.startsWith("@patternfly")) {
      return pfPackageMatches(packageName, nodeValue);
    }
    return nodeValue === packageName;
  });
}

function getSpecifiers<
  NodeType extends Declarations,
  SpecifierType extends Specifiers
>(
  astBody: (ModuleDeclaration | Statement | Directive)[],
  nodeType: "ImportDeclaration" | "ExportNamedDeclaration",
  packageName: string
): SpecifierType[] {
  const nodesOfSpecifiedType = astBody.filter(
    (node) => node?.type === nodeType
  ) as NodeType[];
  const pfNodes = filterByPackageName(nodesOfSpecifiedType, packageName);
  const specifiers = pfNodes.map((node) => node.specifiers);

  const specifierType =
    nodeType === "ImportDeclaration" ? "ImportSpecifier" : "ExportSpecifier";

  const filteredSpecifiersByType = specifiers.map((specifierArray) =>
    specifierArray.filter((specifier) => specifier.type === specifierType)
  ) as unknown as SpecifierType[];

  return filteredSpecifiersByType.reduce(
    (acc, val) => acc.concat(val),
    [] as SpecifierType[]
  );
}

export function getFromPackage(
  context: Rule.RuleContext,
  packageName: string,
  specifierNames?: string[]
) {
  const astBody = context.getSourceCode().ast.body;

  const imports = getSpecifiers<ImportDeclaration, ImportSpecifier>(
    astBody,
    "ImportDeclaration",
    packageName
  );
  const exports = getSpecifiers<ExportNamedDeclaration, ExportSpecifier>(
    astBody,
    "ExportNamedDeclaration",
    packageName
  );

  if (!specifierNames) {
    return { imports, exports };
  }

  const specifiedImports = imports.filter((specifier) =>
    specifierNames.includes(specifier.imported.name)
  );
  const specifiedExports = exports.filter((specifier) =>
    specifierNames.includes(specifier.exported.name)
  );

  return { imports: specifiedImports, exports: specifiedExports };
}

export function getDefaultImportsFromPackage(
  context: Rule.RuleContext,
  packageName: string,
  componentName: string = ""
): ImportDefaultSpecifier[] {
  const astBody = context.getSourceCode().ast.body;

  const importDeclarations = astBody.filter(
    (node) => node?.type === "ImportDeclaration"
  ) as ImportDeclaration[];

  const importDeclarationsFromPackage = filterByPackageName(
    importDeclarations,
    packageName
  ) as ImportDeclaration[];

  return importDeclarationsFromPackage
    .filter(
      (imp) =>
        (!componentName ||
          imp.source.value?.toString().includes(componentName)) &&
        imp.specifiers[0]?.type === "ImportDefaultSpecifier"
    )
    .map((imp) => imp.specifiers[0]) as ImportDefaultSpecifier[];
}

export function getAllImportsFromPackage(
  context: Rule.RuleContext,
  packageName: string,
  componentNames: string[]
) {
  const { imports } = getFromPackage(context, packageName);
  const defaultImports = componentNames
    .map((comp) => getDefaultImportsFromPackage(context, packageName, comp))
    .flat();
  const filteredImports = imports.filter((imp) =>
    componentNames.includes(imp.imported.name)
  );

  return [filteredImports, defaultImports as ImportDefaultSpecifierWithParent[]].flat();
}
