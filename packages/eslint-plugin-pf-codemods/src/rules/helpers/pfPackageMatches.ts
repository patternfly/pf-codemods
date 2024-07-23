import { ImportDeclaration } from "estree-jsx";

export function pfPackageMatches(
  packageName: string,
  nodeSrc: ImportDeclaration["source"]["value"]
) {
  if (typeof nodeSrc !== "string") {
    return false;
  }

  const parts = packageName.split("/");
  const regex = new RegExp(
    "^" +
      parts[0] +
      "/" +
      parts[1] +
      "(/dist/(esm|js|dynamic))?" +
      (parts[2] ? "/" + parts[2] : "") +
      (parts[1] === "react-component-groups"
        ? `(/.*)?$`
        : `(/(components|helpers${
            parts[1] === "react-icons" ? "|icons" : ""
          })/.*)?$`)
  );
  return regex.test(nodeSrc);
}
