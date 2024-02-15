import { version } from "typescript";
import { betaRuleNames, warningRules } from "./ruleCustomization";
import { join } from "path";

export type Rules = { [ruleName: string]: string };

const createListOfRules = (version: string, includeBeta = false) => {
  const usesNewStructure = version === "6";
  const rules: Rules = {};
  const ruleDir = usesNewStructure ? "dist/js" : "lib";
  const rulesPath = require
    .resolve("@patternfly/eslint-plugin-pf-codemods")
    .replace(/dist\/(js|esm)\/index\.js/, `${ruleDir}/rules/v${version}`);
  const oldRuleFiles = require("glob").sync(join(rulesPath, "*.js"));
  const newRuleFiles = require("glob")
    .sync(join(rulesPath, "*", "*.js"))
    .filter((fileName: string) => !fileName.includes("test"));

  [...oldRuleFiles, ...newRuleFiles].forEach(function (file: string) {
    const ruleNameMatch = /.*\/([^.]+)/.exec(file);
    if (ruleNameMatch) {
      const ruleName = ruleNameMatch[1];
      const isBeta = betaRuleNames.includes(ruleName);

      if (includeBeta === isBeta) {
        rules[ruleName] = require(file);
      }
    }
  });
  
  return rules;
};

export const v6rules = createListOfRules("6");
export const v5rules = createListOfRules("5");
export const v4rules = createListOfRules("4");
export const betaV5Rules = createListOfRules("5", true);

const createRules = (rules: Rules) => {
  const newRules: Rules = {};

  return Object.keys(rules).reduce((acc, rule) => {
    const severity = warningRules.includes(rule) ? "warn" : "error";
    acc[`@patternfly/pf-codemods/${rule}`] = severity;
    return acc;
  }, newRules);
};

export const mappedRules = {
  ...createRules(v6rules),
  ...createRules(v5rules),
  ...createRules(v4rules),
};

export const rules = { ...v6rules, ...v5rules, ...v4rules, ...betaV5Rules };

export const ruleVersionMapping = {
  v4: Object.keys(v4rules),
  v5: Object.keys(v5rules),
  v6: Object.keys(v6rules),
};
