const path = require("path");
const fs = require("fs");
const { betterStringSort } = require("./helpers");

function baseReadme(
  { componentName, propName, ruleName, referencePR, message },
  inputExamples,
  outputExamples
) {
  const readMePath = path.join(
    require.resolve("@patternfly/pf-codemods").replace("index.js", ""),
    "README.md"
  );
  const readMe = fs.readFileSync(readMePath, "utf8");
  const splitReadMe = readMe.split("## Rules");
  const splitRules = splitReadMe[1].split("\n### ");

  const readMeAddition = `${ruleName} [(#${referencePR})](https://github.com/patternfly/patternfly-react/pull/${referencePR})

${message}

#### Examples

In:

\`\`\`jsx
${inputExamples}
\`\`\`

Out:

\`\`\`jsx
${outputExamples}
\`\`\`

`;

  splitRules.push(readMeAddition);
  const newRules = splitRules.sort(betterStringSort).join("\n### ");

  const newReadMe = [splitReadMe[0], newRules].join("## Rules");
  fs.writeFileSync(readMePath, newReadMe);
}

function genericReadme(answers) {
  const { componentName, propName } = answers;
  const inputs = `<${componentName} ${propName} />`;
  const outputs = `<${componentName} ${propName} />`;

  baseReadme(answers, inputs, outputs);
}

function addEventCBReadme(answers) {
  const { componentName, propName } = answers;

  // the formatting for content here looks weird, but that's to preserve indentation in the written file
  const inputs = `<${componentName} ${propName}={(id) => handler(id)} />
const handler1 = (id) => {};
<${componentName} ${propName}={handler1}>
function handler2(id) {};
<${componentName} ${propName}={handler2}>`;

  const outputs = `<${componentName} ${propName}={(_event, id) => handler(id)} />
const handler1 = (_event, id) => {};
<${componentName} ${propName}={handler1}>
function handler2(_event, id) {};
<${componentName} ${propName}={handler2}>`;

  const message = `We've updated the \`${propName}\` prop for ${componentName} so that the \`event\` parameter is the first parameter. Handlers may require an update.`;

  baseReadme({ message, ...answers }, inputs, outputs);
}

function swapCBReadme(answers) {
  const { componentName, propName } = answers;

  const inputs = `<${componentName} ${propName}={(id) => handler(id)} />
<${componentName} ${propName}={(id, event) => handler(id, event)} />
const handler1 = (id, event) => {};
<${componentName} ${propName}={handler1}>
function handler2(id, event) {};
<${componentName} ${propName}={handler2}>`;

  const outputs = `<${componentName} ${propName}={(_event, id) => handler(id)} />
<${componentName} ${propName}={(event, id) => handler(id, event)} />
const handler1 = (_event, id) => {};
<${componentName} ${propName}={handler1}>
function handler2(_event, id) {};
<${componentName} ${propName}={handler2}>`;

  const message = `We've updated the \`${propName}\` prop for ${componentName} so that the \`event\` parameter is the first parameter. Handlers may require an update.`;

  baseReadme({ message, ...answers }, inputs, outputs);
}

module.exports = { genericReadme, addEventCBReadme, swapCBReadme };
