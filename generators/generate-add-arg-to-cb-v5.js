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
    create: addCallbackParam(["${componentName}"], { ${propName}: "_event" }),
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
  `const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester('${newRuleName}', '${componentName}', '${propName}')

`
);

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
const handler1 = (id) => {};
<${componentName} ${propName}={handler1}>
function handler2(id) {};
<${componentName} ${propName}={handler2}>
\`\`\`

Out:

\`\`\`jsx
<${componentName} ${propName}={(_event, id) => handler(id)} />
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
