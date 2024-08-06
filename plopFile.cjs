const {
  genericRule,
  addEventCBRule,
  swapCBRule,
} = require("./generators/dist/js/write-rule");
const {
  genericTest,
  addEventCBTest,
  swapCBTest,
} = require("./generators/dist/js/write-test");
const {
  RepoNames,
  genericReadme,
  addEventCBReadme,
  swapCBReadme,
} = require("./generators/dist/js/write-readme");
const {
  genericTestSingle,
  addEventCBTestSingle,
  swapCBTestSingle,
} = require("./generators/dist/js/write-test-single");

const componentNamePrompt = {
  type: "input",
  name: "componentName",
  message: "What is the name of the component being changed? (PascalCase)",
};
const propNamePrompt = {
  type: "input",
  name: "propName",
  message: "What is the name of the prop being changed? (camelCase)",
};
const ruleNamePrompt = {
  type: "input",
  name: "ruleName",
  message: "What should the name of this rule be? (kebab-case)",
};
const referenceRepoPrompt = {
  type: "list",
  name: "referenceRepo",
  message: "What is the repo the PR was made in",
  choices: Object.values(RepoNames),
};
const referencePrPrompt = {
  type: "input",
  name: "referencePR",
  message: "What is the PR reference number",
};
const messagePrompt = {
  type: "input",
  name: "message",
  message: "What message should the codemod send? (Sentence case)",
};

module.exports = function (plop) {
  plop.setActionType("generateRule", async function (answers, config, plop) {
    console.log("Generating rule file", answers.ruleName);
    switch (config.generatorSelection) {
      case "addEventCB":
        await addEventCBRule(answers);
        break;
      case "swapCB":
        await swapCBRule(answers);
        break;
      default:
        await genericRule(answers);
    }
  });

  plop.setActionType("generateTest", async function (answers, config, plop) {
    console.log("Generating test file", answers.ruleName);
    switch (config.generatorSelection) {
      case "addEventCB":
        await addEventCBTest(answers);
        break;
      case "swapCB":
        await swapCBTest(answers);
        break;
      default:
        await genericTest(answers);
    }
  });

  plop.setActionType("generateReadMe", async function (answers, config, plop) {
    console.log("Generating README for", answers.ruleName);
    switch (config.generatorSelection) {
      case "addEventCB":
        await addEventCBReadme(answers);
        break;
      case "swapCB":
        await swapCBReadme(answers);
        break;
      default:
        await genericReadme(answers);
    }
  });

  plop.setActionType(
    "generateTestSingle",
    async function (answers, config, plop) {
      console.log("Generating tsx files for", answers.ruleName);
      switch (config.generatorSelection) {
        case "addEventCB":
          await addEventCBTestSingle(answers);
          break;
        case "swapCB":
          await swapCBTestSingle(answers);
          break;
        default:
          await genericTestSingle(answers);
      }
    }
  );

  plop.setGenerator("generic", {
    description: "create a generic new rule",
    prompts: [
      componentNamePrompt,
      propNamePrompt,
      ruleNamePrompt,
      referenceRepoPrompt,
      referencePrPrompt,
      messagePrompt,
    ],
    actions: [
      {
        type: "generateRule",
      },
      {
        type: "generateTest",
      },
      {
        type: "generateReadMe",
      },
      {
        type: "generateTestSingle",
      },
    ],
  });

  plop.setGenerator("add event parameter", {
    description: "add an event parameter to the front of a callback",
    prompts: [
      componentNamePrompt,
      propNamePrompt,
      ruleNamePrompt,
      referenceRepoPrompt,
      referencePrPrompt,
      ,
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
        type: "generateReadMe",
        generatorSelection: "addEventCB",
      },
      {
        type: "generateTestSingle",
        generatorSelection: "addEventCB",
      },
    ],
  });

  plop.setGenerator("swap parameter", {
    description: "move the position of a parameter in a callback to the front",
    prompts: [
      componentNamePrompt,
      propNamePrompt,
      ruleNamePrompt,
      referenceRepoPrompt,
      referencePrPrompt,
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
        type: "generateReadMe",
        generatorSelection: "swapCB",
      },
      {
        type: "generateTestSingle",
        generatorSelection: "swapCB",
      },
    ],
  });
};
