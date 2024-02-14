import { join } from "path";
import { outputFile } from "fs-extra";
import { camelCase, pascalCase } from "case-anything";
import { Answers } from "./plop-interfaces";

async function baseTestSingle(
  { componentName, ruleName }: Answers,
  componentUsage: string
) {
  const camelCaseRuleName = camelCase(ruleName);
  const pascalCaseRuleName = pascalCase(ruleName);

  const ruleDir = require
    .resolve("@patternfly/eslint-plugin-pf-codemods")
    .replace(/dist\/(js|esm)\/index\.js/, `src/rules/v6/${camelCaseRuleName}`);

  const testInputPath = join(ruleDir, `${camelCaseRuleName}Input.tsx`);
  const testOutputPath = join(ruleDir, `${camelCaseRuleName}Output.tsx`);

  const testInputContent = `import { ${componentName} } from '@patternfly/react-core';

export const ${pascalCaseRuleName}Input = () => (
  ${componentUsage}
);
`;

  await outputFile(testInputPath, testInputContent);
  await outputFile(testOutputPath, testInputContent);
}
export async function genericTestSingle(answers: Answers) {
  const { componentName, propName } = answers;

  baseTestSingle(answers, `  <${componentName} ${propName} />`);
}

export async function addEventCBTestSingle(answers: Answers) {
  const { componentName, propName } = answers;

  baseTestSingle(
    answers,
    `  <${componentName} ${propName}={foo => handler(foo)} />`
  );
}

export async function swapCBTestSingle(answers: Answers) {
  const { componentName, propName } = answers;

  baseTestSingle(
    answers,
    `  <${componentName} ${propName}={(foo, event) => handler(foo, event)} />`
  );
}
