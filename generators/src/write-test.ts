import { join } from "path";
import { outputFile } from "fs-extra";
import { camelCase } from "case-anything";
import { Answers } from "./plop-interfaces";

async function baseTest(ruleName: string, fileContent: string) {
  const camelCaseRuleName = camelCase(ruleName);
  const destination = join(
    require
      .resolve("@patternfly/eslint-plugin-pf-codemods")
      .replace(
        /dist\/(js|esm)\/index\.js/,
        `src/rules/v6/${camelCaseRuleName}`
      ),
    `${ruleName}.test.ts`
  );

  await outputFile(destination, fileContent);
}

export async function genericTest({
  componentName,
  propName,
  ruleName,
  message,
}: Answers) {
  // the formatting for content here looks weird, but that's to preserve indentation in the written file
  const content = `const ruleTester = require('../../ruletester');
import * as rule from './${ruleName}';

ruleTester.run("${ruleName}", rule, {
  valid: [
    {
      code: \`<${componentName} ${propName} />\`
    },
    {
      code: \`import { ${componentName} } from '@patternfly/react-core'; <${componentName} someOtherProp />\`
    }
  ],
  invalid: [
    {
      code:   \`import { ${componentName} } from '@patternfly/react-core'; <${componentName} ${propName} />\`,
      output: \`import { ${componentName} } from '@patternfly/react-core'; <${componentName}  />\`,
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

export async function addEventCBTest({
  componentName,
  propName,
  ruleName,
}: Answers) {
  const content = `const { addCallbackParamTester } = require("../../testHelpers");

addCallbackParamTester('${ruleName}', '${componentName}', '${propName}')
  
  `;
  baseTest(ruleName, content);
}

export async function swapCBTest({
  componentName,
  propName,
  ruleName,
}: Answers) {
  const content = `const { swapCallbackParamTester } = require("../../testHelpers");

swapCallbackParamTester('${ruleName}', '${componentName}', '${propName}', 1)

`;
  baseTest(ruleName, content);
}
