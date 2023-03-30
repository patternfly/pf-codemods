const path = require("path");
const fs = require("fs");

const componentName = process.argv[2];
const propName = process.argv[3]
const ruleDescription = process.argv[4];
const referencePR = process.argv[5];
if (!componentName || !ruleDescription || !propName || !referencePR) {
  console.log(
    "usage: node generate-add-arg-to-cb-v5 [component name] [prop name] [rule description (kebab-case)] [reference PR number]"
  );
  process.exit(1);
}
const lowerCasedComponentName =
  componentName[0].toLowerCase() + componentName.substring(1);
const newRuleName = `${lowerCasedComponentName}-${ruleDescription}`;

console.log("Generating rule", newRuleName);
// Write rule file
fs.writeFileSync(
  path.join(
    __dirname,
    "packages/eslint-plugin-pf-codemods/lib/rules/v5",
    `${newRuleName}.js`
  ),
  `const { addCallbackParam } = require("../../helpers");

  // https://github.com/patternfly/patternfly-react/pull/${referencePR}
  module.exports = {
    meta: { fixable: "code" },
    create: addCallbackParam(["${componentName}"], { ${propName}: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\\w*|e$)/ } }),
  };
`
);
// Write test file
fs.writeFileSync(
  path.join(
    __dirname,
    "packages/eslint-plugin-pf-codemods/test/rules/v5",
    `${newRuleName}.js`
  ),
  `const { swapCallbackParamTester } = require("../../testHelpers");

swapCallbackParamTester('${newRuleName}', '${componentName}', '${propName}', 1)

`
);

console.log('Updating README')
// Update readme
const readMePath = path.join(__dirname, "packages/pf-codemods/README.md")
const readMe = fs.readFileSync(readMePath, "utf8")
const splitReadMe = readMe.split('## Rules')
const splitRules = splitReadMe[1].split('\n### ')

const readMeAddition = `${newRuleName} [(#${referencePR})](https://github.com/patternfly/patternfly-react/pull/${referencePR})

We've updated the \`${propName}\` prop for ${componentName} to include the \`event\` as its first parameter. Handlers may require an update.

#### Examples

In:

\`\`\`jsx
<${componentName} ${propName}={(id) => handler(id)} />
<${componentName} ${propName}={(id, event) => handler(id, event)} />
const handler1 = (id, event) => {};
<${componentName} ${propName}={handler1}>
function handler2(id, event) {};
<${componentName} ${propName}={handler2}>
\`\`\`

Out:

\`\`\`jsx
<${componentName} ${propName}={(_event, id) => handler(id)} />
<${componentName} ${propName}={(event, id) => handler(id, event)} />
const handler1 = (_event, id) => {};
<${componentName} ${propName}={handler1}>
function handler2(_event, id) {};
<${componentName} ${propName}={handler2}>
\`\`\`

`

splitRules.push(readMeAddition)
const newRules = splitRules.sort().join("\n### ")

const newReadMe = [splitReadMe[0], newRules].join('## Rules')
fs.writeFileSync(readMePath, newReadMe)

console.log('Updating test.tsx')
// Update test.tsx imports
const testPath = path.join(__dirname, "test/test.tsx")
const testFile = fs.readFileSync(testPath, "utf8")
const splitByImport = testFile.split('import {')
const pfCoreImportsIndex = splitByImport.findIndex(split => split.includes(`from "@patternfly/react-core"`))
const pfCoreImports = splitByImport[pfCoreImportsIndex]
const splitByClosingCurlyBrace = pfCoreImports.split('}')
const importedComponents = splitByClosingCurlyBrace[0].split(',')

if (importedComponents.find(importedComponent => importedComponent.split(' ')[2] === componentName)) {
  console.log('component already imported')
} else {
  importedComponents.push(`\n  ${componentName}`)
  importedComponents.sort().push(importedComponents.shift())
}

const formattedUpdatedImports = importedComponents.filter(component => component.match(/[A-Z]/)).join(', ')

const newCoreImport = [formattedUpdatedImports, '\n}', splitByClosingCurlyBrace[splitByClosingCurlyBrace.length - 1]].join('')
const beforeCoreImport = splitByImport.slice(1, pfCoreImportsIndex).join('import {')
const afterCoreImport = splitByImport.slice(pfCoreImportsIndex + 1)

const contentAfterAddingImport = ['', beforeCoreImport, newCoreImport, afterCoreImport].join('import {')

// Update test.tsx examples
const splitByFragment = contentAfterAddingImport.split('\n<>')
const fragmentSection = splitByFragment[1];
const components = fragmentSection.split(/\/>;?\n/)
components.push(`  <${componentName} ${propName}={(foo, event) => handler(foo, event)} `)
components.sort().push(components.shift())
const newFragmentSection = components.join('/>\n')
const newContent = [splitByFragment[0], newFragmentSection].join('\n<>')

fs.writeFileSync(testPath, newContent)
