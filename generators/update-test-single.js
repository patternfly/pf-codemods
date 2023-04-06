const path = require("path");
const fs = require("fs");
const { betterStringSort } = require('./helpers')

function baseTestSingle(componentName, componentUsage) {
  const testPath = path.join(
    process.cwd().replace("generators", ""),
    "test/test.tsx"
  );
  const testFile = fs.readFileSync(testPath, "utf8");

  // Update imports
  const splitByImport = testFile.split("import {");
  const pfCoreImportsIndex = splitByImport.findIndex((split) =>
    split.includes(`from "@patternfly/react-core"`)
  );
  const pfCoreImports = splitByImport[pfCoreImportsIndex];
  const splitByClosingCurlyBrace = pfCoreImports.split("}");
  const importedComponents = splitByClosingCurlyBrace[0].split(",");
  const trimmedImportedComponents = importedComponents.map((component) =>
    component.trim().replace("\n", "")
  );

  if (
    trimmedImportedComponents.find(
      (importedComponent) => importedComponent === componentName
    )
  ) {
    console.log("component already imported");
  } else {
    trimmedImportedComponents.push(componentName);
    trimmedImportedComponents.sort(betterStringSort);
  }

  const formattedUpdatedImports = trimmedImportedComponents
    .filter((component) => component.match(/\w/))
    .join(",\n  ");

  const newCoreImport = [
    "\n  ",
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

  // Update usage examples
  const splitByFragment = contentAfterAddingImport.split("\n<>");
  const fragmentSection = splitByFragment[1];
  const components = fragmentSection.split(/>;?\n/);

  // This identifies child and closing elements and concatenates those elements with their parent/opening element so
  // that they aren't alphabetized independently
  const concatenatedComponents = components.reduce((acc, component) => {
    const previousComponent = acc[acc.length - 1];
    const componentIndentLevel =
      component.split("<")[0].match(/\s/g)?.length / 2;
    const isChild = componentIndentLevel > 1;
    const isClosingElement = component.match(/<\/\w*/);

    if (previousComponent && (isChild || isClosingElement)) {
      acc[acc.length - 1] += ">\n" + component;
    } else if (!!component) {
      acc.push(component);
    }

    return acc;
  }, []);

  concatenatedComponents.push(componentUsage);
  concatenatedComponents.sort(betterStringSort);
  const newFragmentSection = concatenatedComponents.join(">\n");
  const newContent = [
    splitByFragment[0],
    "\n<>",
    newFragmentSection,
    ">\n",
  ].join("");

  fs.writeFileSync(testPath, newContent);
}
function genericTestSingle({ componentName, propName }) {
  baseTestSingle(componentName, `  <${componentName} ${propName} /`);
}

function addEventCBTestSingle({ componentName, propName }) {
  baseTestSingle(
    componentName,
    `  <${componentName} ${propName}={foo => handler(foo)} /`
  );
}

function swapCBTestSingle({ componentName, propName }) {
  baseTestSingle(
    componentName,
    `  <${componentName} ${propName}={(foo, event) => handler(foo, event)} /`
  );
}

module.exports = { genericTestSingle, addEventCBTestSingle, swapCBTestSingle };
