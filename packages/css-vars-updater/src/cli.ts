#!/usr/bin/env node
import { join } from "path";
import { Command } from "commander";
const program = new Command();
import inquirer from "inquirer";

import { isDir } from "../../../helpers/utils";
import { cssVarsUpdate } from "./cssVarsUpdate";
import { Answers } from "./answers";

program
  .version(require("../package.json").version)
  .description("Update css variables from v5 to v6")
  .arguments("<path> [otherPaths...]")
  .option(
    "-i, --interactive",
    "Starts an interactive interface for better control over the updates"
  )
  .option("--fix", "Whether to run fixer")
  .action(runCssVarsUpdate);

async function runCssVarsUpdate(
  path: string,
  otherPaths: string,
  options: { interactive: boolean; fix: boolean }
) {
  const defaultAnswers: Answers = {
    fileExtensions: "",
    shouldExcludeFiles: false,
    fix: options.fix,
    replaceGlobalColorsWithPink: true,
    replaceGlobalVars: true,
    directionalStyles: "ltr",
  };

  const answers: Answers = options.interactive
    ? await inquirer.prompt([
        {
          type: "input",
          name: "fileExtensions",
          message: "Enter file extensions to update (comma-separated):",
          default: "scss,css,less,md",
        },
        {
          type: "confirm",
          name: "shouldExcludeFiles",
          message: "Do you want to exclude any files?",
          default: false,
        },
        {
          type: "input",
          name: "filesToExclude",
          message: "Enter files to exclude (comma-separated, relative paths):",
          when: (answers) => answers.shouldExcludeFiles === true,
        },
        {
          type: "confirm",
          name: "fix",
          message: "Do you want to run the fixer?",
          when: !options.fix,
        },
        {
          type: "confirm",
          name: "replaceGlobalColorsWithPink",
          message:
            "Do you want to replace color variables with a temporary hot pink color variable?",
        },
        {
          type: "confirm",
          name: "replaceGlobalVars",
          message:
            "Do you want to replace other global variables with a matching token?",
        },
        {
          type: "list",
          name: "directionalStyles",
          message:
            "Do you want to fix directional styles and how? E.g. PaddingLeft -> PaddingInlineStart",
          choices: [
            {
              name: "Fix in left-to-right manner (English)",
              value: "ltr",
            },
            {
              name: "Fix in right-to-left manner",
              value: "rtl",
            },
            {
              name: "Fix in top-to-bottom manner",
              value: "ttb",
            },
            {
              name: "Don’t fix",
              value: "none",
            },
          ],
        },
      ])
    : defaultAnswers;

  let allPaths = [path, ...otherPaths];

  // if all paths are resolved to be directories assume that they want to run on all contents of those directories
  const onlyDirs = await Promise.all(allPaths.map((path) => isDir(path))).then(
    (responses) => responses.every((isDirResult) => !!isDirResult)
  );

  if (onlyDirs) {
    allPaths = allPaths.map((path) => join(path, "**", "*"));
  }

  allPaths.forEach(async (path) => {
    await cssVarsUpdate(path, answers);
  });
}

program.parse(process.argv);
