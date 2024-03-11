import { Rule } from "eslint";
import {
  ImportDeclaration,
  ModuleDeclaration,
  Statement,
  Directive,
  ExportNamedDeclaration,
  ImportSpecifier,
  ExportSpecifier,
} from "estree-jsx";
import { pfPackageMatches } from "./pfPackageMatches";

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

  const filteredSpecifiersByType = specifiers.filter((specifierArray) =>
    specifierArray.every((specifier) => specifier.type === specifierType)
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

  let imports = getSpecifiers<ImportDeclaration, ImportSpecifier>(
    astBody,
    "ImportDeclaration",
    packageName
  );
  let exports = getSpecifiers<ExportNamedDeclaration, ExportSpecifier>(
    astBody,
    "ExportNamedDeclaration",
    packageName
  );

  if (specifierNames) {
    imports = imports.filter((specifier) =>
      specifierNames?.includes(specifier.imported.name)
    );
    exports = exports.filter((specifier) =>
      specifierNames?.includes(specifier.exported.name)
    );
  }

  return { imports, exports };
}
