import { Rule } from "eslint";
import { getAllImportsFromPackage } from "./getFromPackage";
import { renamePropsOnNode } from "./renamePropsOnNode";
import { Renames } from "./renameSinglePropOnNode";
import { JSXOpeningElement } from "estree-jsx";

export function renameProps(
  renames: Renames,
  packageName = "@patternfly/react-core"
) {
  return function (context: Rule.RuleContext) {
    const imports = getAllImportsFromPackage(
      context,
      packageName,
      Object.keys(renames)
    );

    if (imports.length === 0) {
      return {};
    }

    Object.keys(renames).forEach((component) => {
      Object.entries(renames[component]).forEach(([oldName, value]) => {
        if (typeof value === "string") {
          renames[component][oldName] = { newName: value };
        }
      });
    });

    return {
      JSXOpeningElement(node: JSXOpeningElement) {
        renamePropsOnNode(context, imports, node, renames);
      },
    };
  };
}
