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
  referencePR,
  message,
}: Answers) {
  // the formatting for content here looks weird, but that's to preserve indentation in the written file
  const content = `import { Rule } from "eslint";
import { JSXOpeningElement } from "estree-jsx";
import { getFromPackage } from "../../helpers";

// https://github.com/patternfly/patternfly-react/pull/${referencePR}
module.exports = {
  meta: { fixable: "code" },
  create: function (context: Rule.RuleContext) {
    const { imports } = getFromPackage(context, "@patternfly/react-core");

    const componentImports = imports.filter(
      (specifier) => specifier.imported.name === "${componentName}"
    );

    return !componentImports.length
      ? {}
      : {
          JSXOpeningElement(node: JSXOpeningElement) {
            if (
              node.name.type === "JSXIdentifier" &&
              componentImports
                .map((imp) => imp.local.name)
                .includes(node.name.name)
            ) {
              const attribute = node.attributes.find(
                (attr) =>
                  attr.type === "JSXAttribute" && attr.name.name === "${propName}"
              );
              if (attribute) {
                context.report({
                  node,
                  message: "${message}",
                  fix(fixer) {
                    return fixer.replaceText(attribute, "");
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
  referencePR,
}: Answers) {
  const content = `const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/${referencePR}
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
  referencePR,
}: Answers) {
  const content = `const { addCallbackParam } = require("../../helpers");

// https://github.com/patternfly/patternfly-react/pull/${referencePR}
module.exports = {
  meta: { fixable: "code" },
  create: addCallbackParam(["${componentName}"], { ${propName}: { defaultParamName: "_event", previousParamIndex: 1, otherMatchers: /^_?(ev\\w*|e$)/ } }),
};
`;
  baseRule(ruleName, content);
}
