const path = require("path");
const fs = require("fs");

function baseTestSingle(componentName, componentUsage) {
  const testPath = path.join(
    process.cwd().replace("generators", ""),
    "test/test.tsx"
  );
  const testFile = fs.readFileSync(testPath, "utf8");
  const splitByImport = testFile.split("import {");
  const pfCoreImportsIndex = splitByImport.findIndex((split) =>
    split.includes(`from "@patternfly/react-core"`)
  );
  const pfCoreImports = splitByImport[pfCoreImportsIndex];
  const splitByClosingCurlyBrace = pfCoreImports.split("}");
  const importedComponents = splitByClosingCurlyBrace[0].split(",");

  if (
    importedComponents.find(
      (importedComponent) => importedComponent.split(" ")[2] === componentName
    )
  ) {
    console.log("component already imported");
  } else {
    importedComponents.push(`\n  ${componentName}`);
    importedComponents.sort().push(importedComponents.shift());
  }

  const formattedUpdatedImports = importedComponents
    .filter((component) => component.match(/[A-Z]/))
    .join(", ");

  const newCoreImport = [
    formattedUpdatedImports,
    "\n}",
    splitByClosingCurlyBrace[splitByClosingCurlyBrace.length - 1],
  ].join("");
  const beforeCoreImport = splitByImport
    .slice(1, pfCoreImportsIndex)
    .join("import {");
  const afterCoreImport = splitByImport.slice(pfCoreImportsIndex + 1);

  const contentAfterAddingImport = [
    "",
    beforeCoreImport,
    newCoreImport,
    afterCoreImport,
  ].join("import {");

  // Update test.tsx examples
  const splitByFragment = contentAfterAddingImport.split("\n<>");
  const fragmentSection = splitByFragment[1];
  const components = fragmentSection.split(/\/>;?\n/);
  components.push(componentUsage);
  components.sort().push(components.shift());
  const newFragmentSection = components.join("/>\n");
  const newContent = [splitByFragment[0], newFragmentSection].join("\n<>");

  fs.writeFileSync(testPath, newContent);
}
function genericTestSingle({ componentName, propName }) {
  baseTestSingle(componentName, `  <${componentName} ${propName} `);
}

function addEventCBTestSingle({ componentName, propName }) {
  baseTestSingle(
    componentName,
    `  <${componentName} ${propName}={foo => handler(foo)} `
  );
}

function swapCBTestSingle({ componentName, propName }) {
  baseTestSingle(
    componentName,
    `  <${componentName} ${propName}={(foo, event) => handler(foo, event)} `
  );
}

module.exports = { genericTestSingle, addEventCBTestSingle, swapCBTestSingle };
