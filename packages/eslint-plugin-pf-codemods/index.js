const createListOfRules = (version) => {
  const rules = {};
  require("glob")
    .sync(require.resolve('@patternfly/eslint-plugin-pf-codemods').replace('index.js', `lib/rules/v${version}/*.js`))
    .forEach(function (file) {
      const ruleName = /.*\/([^.]+)/.exec(file)[1];
      rules[ruleName] = require(`./lib/rules/v${version}/${ruleName}`);
    });
  return rules;
};

const v5rules = createListOfRules("5");
const v4rules = createListOfRules("4");

// if you want a rule to have a severity that defaults to warning rather than error, add the rule name to the below array
const warningRules = [
  "applicationLauncher-warn-input",
  "card-warn-component",
  "charts-tooltip-warning",
  "datePicker-warn-appendTo-default-value-changed",
  "horizontalSubnav-ariaLabel",
  "onToggle-warn-event",
  "nav-warn-flyouts-now-inline",
  "popover-appendTo-default",
  "react-dropzone-warn-upgrade",
  "table-warn-thExpandType",
  "tabs-warn-children-type-changed",
  "wizard-warn-button-order",
];

const createRules = (rules) => {
  return Object.keys(rules).reduce((acc, rule) => {
    const severity = warningRules.includes(rule) ? "warn" : "error";
    acc[`@patternfly/pf-codemods/${rule}`] = severity;
    return acc;
  }, {});
};

const mappedRules = { ...createRules(v5rules), ...createRules(v4rules) };

module.exports = {
  configs: {
    recommended: {
      plugins: ["@patternfly/pf-codemods"],
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      noInlineConfig: true,
      reportUnusedDisableDirectives: false,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: mappedRules,
    },
  },
  rules: { ...v5rules, ...v4rules },
  ruleVersionMapping: { v4: Object.keys(v4rules), v5: Object.keys(v5rules) },
};
