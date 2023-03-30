const path = require("path");
const fs = require("fs");

function baseTest(ruleName, fileContent) {
  const destination = path.join(
    require
      .resolve("@patternfly/eslint-plugin-pf-codemods")
      .replace("index.js", ""),
    "test/rules/v5",
    `${ruleName}.js`
  );

  fs.writeFileSync(destination, fileContent);
}

function genericTest({ componentName, propName, ruleName, message }) {
  // the formatting for content here looks weird, but that's to preserve indentation in the written file
  const content = `const ruleTester = require('../../ruletester');
const rule = require('../../../lib/rules/v5/${ruleName}');

ruleTester.run("${ruleName}", rule, {
  valid: [
    {
      code: \`<${componentName} ${propName} />\`
    }
  ],
  invalid: [
    {
      code:   \`import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName} />\`,
      output: \`import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName} />\`,
      errors: [{
        message: \`${message}\`,
        type: "JSXOpeningElement",
      }]
    },
  ]
});
  `;
  baseTest(ruleName, content);
}

function addEventCBTest({ componentName, propName, ruleName }) {
  const content = `const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester('${ruleName}', '${componentName}', '${propName}')
  
  `;
  baseTest(ruleName, content);
}

function swapCBTest({ componentName, propName, ruleName }) {
  const content = `const { swapCallbackParamTester } = require("../../testHelpers");

swapCallbackParamTester('${ruleName}', '${componentName}', '${propName}', 1)

`;
  baseTest(ruleName, content);
}

module.exports = {
  genericTest,
  addEventCBTest,
  swapCBTest,
};
