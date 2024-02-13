import { join } from "path";
import { outputFile } from "fs-extra";
import { camelCase } from "case-anything";
import { Answers } from "./plop-interfaces";

async function baseReadme({ referencePR, ruleName, message }: Answers) {
  const camelCaseRuleName = camelCase(ruleName);
  const readMePath = join(
    require
      .resolve("@patternfly/eslint-plugin-pf-codemods")
      .replace(
        /dist\/(js|esm)\/index\.js/,
        `src/rules/v6/${camelCaseRuleName}`
      ),
    `${camelCaseRuleName}.md`
  );

  const readMeContent = `### ${ruleName} [(#${referencePR})](https://github.com/patternfly/patternfly-react/pull/${referencePR})

${message}

#### Examples

In:

\`\`\`jsx
%inputExample%
\`\`\`

Out:

\`\`\`jsx
%outputExample%
\`\`\`

`;

  await outputFile(readMePath, readMeContent);
}

export async function genericReadme(answers: Answers) {
  const message = "Default message";
  await baseReadme({ message, ...answers });
}

export async function addEventCBReadme(answers: Answers) {
  const { componentName, propName } = answers;

  const message = `We've updated the \`${propName}\` prop for ${componentName} so that the \`event\` parameter is the first parameter. Handlers may require an update.`;

  await baseReadme({ message, ...answers });
}

export async function swapCBReadme(answers: Answers) {
  const { componentName, propName } = answers;

  const message = `We've updated the \`${propName}\` prop for ${componentName} so that the \`event\` parameter is the first parameter. Handlers may require an update.`;

  await baseReadme({ message, ...answers });
}
