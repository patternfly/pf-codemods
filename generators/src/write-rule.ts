import { join } from "path";
import { outputFile } from "fs-extra";
import { camelCase } from "case-anything";
import { Answers } from "./plop-interfaces";

async function baseRule(ruleName: string, fileContent: string) {
  const camelCaseRuleName = camelCase(ruleName);
  const destination = join(
    require
      .resolve("@patternfly/eslint-plugin-pf-codemods")
      .replace(
        /dist\/(js|esm)\/index\.js/,
        `src/rules/v6/${camelCaseRuleName}`
      ),
    `${ruleName}.ts`
  );

  await outputFile(destination, fileContent);
}

export async function genericRule({
  componentName,
  propName,
  ruleName,
  referenceRepo,
  referencePR,
  message,
}: Answers) {
  // the formatting for content here looks weird, but that's to preserve indentation in the written file
  const content = `import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getAllImportsFromPackage, checkMatchingJSXOpeningElement, getAttribute } from "../../helpers";

// https://github.com/patternfly/${referenceRepo}/pull/${referencePR}
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const basePackage = "@patternfly/react-core";
    const componentImports = getAllImportsFromPackage(context, basePackage, ["${componentName}"]);

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (checkMatchingJSXOpeningElement(node, componentImports)) {
              const ${propName}Prop = getAttribute(node, "${propName}");
              if (${propName}Prop) {
                context.report({
                  node,
                  message: "${message}",
                  fix(fixer) {
                    return fixer.replaceText(${propName}Prop, "");
                  },
                });
              }
            }
          },
        };
  },
};
`;
  baseRule(ruleName, content);
}

export async function addEventCBRule({
  componentName,
  propName,
  ruleName,
  referenceRepo,
  referencePR,
}: Answers) {
  const content = `const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/${referenceRepo}/pull/${referencePR}
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["${componentName}"], { ${propName}: "_event" }),
};
`;
  baseRule(ruleName, content);
}

export async function swapCBRule({
  componentName,
  propName,
  ruleName,
  referenceRepo,
  referencePR,
}: Answers) {
  const content = `const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/${referenceRepo}/pull/${referencePR}
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["${componentName}"], { ${propName}: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\\w*|e$)/ } }),
};
`;
  baseRule(ruleName, content);
}
