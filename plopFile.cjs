const {
  genericRule,
  addEventCBRule,
  swapCBRule,
} = require("./generators/write-rule");
const {
  genericTest,
  addEventCBTest,
  swapCBTest,
} = require("./generators/write-test");
const {
  genericReadme,
  addEventCBReadme,
  swapCBReadme,
} = require("./generators/update-readme");
const {
  genericTestSingle,
  addEventCBTestSingle,
  swapCBTestSingle,
} = require("./generators/update-test-single");

module.exports = function (plop) {
  plop.setActionType("generateRule", function (answers, config, plop) {
    console.log("Generating rule file", answers.ruleName);
    switch (config.generatorSelection) {
      case "addEventCB":
        addEventCBRule(answers);
        break;
      case "swapCB":
        swapCBRule(answers);
        break;
      default:
        genericRule(answers);
    }
  });

  plop.setActionType("generateTest", function (answers, config, plop) {
    console.log("Generating test file", answers.ruleName);
    switch (config.generatorSelection) {
      case "addEventCB":
        addEventCBTest(answers);
        break;
      case "swapCB":
        swapCBTest(answers);
        break;
      default:
        genericTest(answers);
    }
  });

  plop.setActionType("updateReadme", function (answers, config, plop) {
    console.log("Updating README for", answers.ruleName);
    switch (config.generatorSelection) {
      case "addEventCB":
        addEventCBReadme(answers);
        break;
      case "swapCB":
        swapCBReadme(answers);
        break;
      default:
        genericReadme(answers);
    }
  });

  plop.setActionType("updateTestSingle", function (answers, config, plop) {
    console.log("Updating test.tsx for", answers.ruleName);
    switch (config.generatorSelection) {
      case "addEventCB":
        addEventCBTestSingle(answers);
        break;
      case "swapCB":
        swapCBTestSingle(answers);
        break;
      default:
        genericTestSingle(answers);
    }
  });

  plop.setGenerator("generic", {
    description: "create a generic new rule",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message:
          "What is the name of the component being changed? (PascalCase)",
      },
      {
        type: "input",
        name: "propName",
        message: "What is the name of the prop being changed? (camelCase)",
      },
      {
        type: "input",
        name: "ruleName",
        message: "What should the name of this rule be? (kebab-case)",
      },
      {
        type: "input",
        name: "referencePR",
        message: "What is the PR reference number",
      },
      {
        type: "input",
        name: "message",
        message: "What message should the codemod send? (Sentence case)",
      },
    ],
    actions: [
      {
        type: "generateRule",
      },
      {
        type: "generateTest",
      },
      {
        type: "updateReadme",
      },
      {
        type: "updateTestSingle",
      },
    ],
  });

  plop.setGenerator("add event parameter", {
    description: "add an event parameter to the front of a callback",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message:
          "What is the name of the component being changed? (PascalCase)",
      },
      {
        type: "input",
        name: "propName",
        message: "What is the name of the prop being changed? (camelCase)",
      },
      {
        type: "input",
        name: "ruleName",
        message: "What should the name of this rule be? (kebab-case)",
      },
      {
        type: "input",
        name: "referencePR",
        message: "What is the PR reference number",
      },
    ],
    actions: [
      {
        type: "generateRule",
        generatorSelection: "addEventCB",
      },
      {
        type: "generateTest",
        generatorSelection: "addEventCB",
      },
      {
        type: "updateReadme",
        generatorSelection: "addEventCB",
      },
      {
        type: "updateTestSingle",
        generatorSelection: "addEventCB",
      },
    ],
  });

  plop.setGenerator("swap parameter", {
    description: "move the position of a parameter in a callback to the front",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message:
          "What is the name of the component being changed? (PascalCase)",
      },
      {
        type: "input",
        name: "propName",
        message: "What is the name of the prop being changed? (camelCase)",
      },
      {
        type: "input",
        name: "ruleName",
        message: "What should the name of this rule be? (kebab-case)",
      },
      {
        type: "input",
        name: "referencePR",
        message: "What is the PR reference number",
      },
    ],
    actions: [
      {
        type: "generateRule",
        generatorSelection: "swapCB",
      },
      {
        type: "generateTest",
        generatorSelection: "swapCB",
      },
      {
        type: "updateReadme",
        generatorSelection: "swapCB",
      },
      {
        type: "updateTestSingle",
        generatorSelection: "swapCB",
      },
    ],
  });
};
